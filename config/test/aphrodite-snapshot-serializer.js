/**
 * Prints the CSS behind Aphrodite's generated class names in DOM snapshots.
 *
 * Without this, every styled element in a snapshot reads:
 *
 *     `class="button_vr44p2-o_O-shared_1hhaz1q"`
 *
 * The hash changes whenever the
 * style changes, so a diff tells a reviewer that *something* changed but never
 * *what*. With it, the same element reads:
 *
 *     `style="display: inline-flex; align-items: center; height: 40px; ..."`
 *
 * Wonder Blocks solves the same problem with a `SNAPSHOT_INLINE_APHRODITE`
 * global that makes `processStyleList` hand React a `style` prop instead of a
 * class name. See:
 * https://github.com/Khan/wonder-blocks/blob/ded1be1/packages/wonder-blocks-core/src/util/util.ts#L41
 *
 * We deliberately don't use that flag here, for two reasons:
 *
 *  1. It changes what components *render*, not just what snapshots *print*.
 *     `test-setup.ts` calls `StyleSheetTestUtils.suppressStyleInjection()`, so
 *     Aphrodite rules never reach the CSSOM and declarations like
 *     `pointer-events: none` have always been inert under test. Inlining them
 *     makes jsdom start honoring them, which breaks ~260 interaction tests
 *     that click on things Aphrodite considers unclickable.
 *  2. It only covers components that route styles through Wonder Blocks'
 *     `processStyleList`. Perseus calls Aphrodite's `css()` directly in ~88
 *     files, and those class names would stay tokenized.
 *
 * So we expand at serialization time instead: record what each generated class
 * name means as it is created, then rewrite class attributes on a *clone* of
 * the tree while it is being printed. The live DOM is never touched, so no
 * test can observe the difference.
 */
const aphrodite = require("aphrodite");

/**
 * Maps a generated class name ("button_vr44p2-o_O-shared_1hhaz1q") to the
 * merged style definition it came from.
 */
const definitionsByClassName = new Map();

/**
 * Merges an Aphrodite style definition into an accumulator, combining nested
 * blocks (":hover", "@media ...") rather than letting a later definition drop
 * an earlier one wholesale. This matches how Aphrodite itself layers rules.
 */
function mergeDefinition(target, definition) {
    for (const [key, value] of Object.entries(definition)) {
        const isBlock = value != null && typeof value === "object";
        if (isBlock && !Array.isArray(value)) {
            target[key] = mergeDefinition({...target[key]}, value);
        } else {
            target[key] = value;
        }
    }
    return target;
}

const originalCss = aphrodite.css;

// Aphrodite's entry point ends in `module.exports = exports.default`, so its
// export is a plain mutable object with no `__esModule` marker. Both Wonder
// Blocks' bundles and our swc-compiled source reach through that object at
// call time (`aphrodite.css(...)`) rather than capturing the function when
// they import it, so replacing it here intercepts every call in the process.
aphrodite.css = function css(...styles) {
    const className = originalCss(...styles);
    if (className) {
        const merged = {};
        for (const style of styles.flat(Infinity)) {
            // `css()` tolerates falsy entries so callers can write
            // `isHeader && styles.header`.
            if (style && style._definition) {
                mergeDefinition(merged, style._definition);
            }
        }
        definitionsByClassName.set(className, merged);
    }
    return className;
};

/**
 * Properties whose numeric values carry no unit. Mirrors React's list so that
 * expanded styles read the way they would if the definition had been passed to
 * React as a `style` prop.
 */
const UNITLESS_PROPERTIES = new Set([
    "animationIterationCount",
    "aspectRatio",
    "borderImageOutset",
    "borderImageSlice",
    "borderImageWidth",
    "boxFlex",
    "boxFlexGroup",
    "boxOrdinalGroup",
    "columnCount",
    "columns",
    "flex",
    "flexGrow",
    "flexPositive",
    "flexShrink",
    "flexNegative",
    "flexOrder",
    "fillOpacity",
    "floodOpacity",
    "fontWeight",
    "gridArea",
    "gridColumn",
    "gridColumnEnd",
    "gridColumnSpan",
    "gridColumnStart",
    "gridRow",
    "gridRowEnd",
    "gridRowSpan",
    "gridRowStart",
    "lineClamp",
    "lineHeight",
    "opacity",
    "order",
    "orphans",
    "scale",
    "stopOpacity",
    "strokeDasharray",
    "strokeDashoffset",
    "strokeMiterlimit",
    "strokeOpacity",
    "strokeWidth",
    "tabSize",
    "widows",
    "zIndex",
    "zoom",
]);

/** Strips a vendor prefix so "WebkitLineClamp" can be looked up as "lineClamp". */
function withoutVendorPrefix(key) {
    const unprefixed = key.replace(/^(Webkit|Moz|ms)/, "");
    return unprefixed === key
        ? key
        : unprefixed.charAt(0).toLowerCase() + unprefixed.slice(1);
}

/** "WebkitFontSmoothing" -> "-webkit-font-smoothing", "zIndex" -> "z-index". */
function toCssProperty(key) {
    if (key.startsWith("--")) {
        return key; // Already a CSS custom property.
    }
    return key
        .replace(/^(Webkit|Moz|ms)/, (prefix) => `-${prefix.toLowerCase()}`)
        .replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}

function toCssValue(key, value) {
    if (
        typeof value === "number" &&
        !UNITLESS_PROPERTIES.has(withoutVendorPrefix(key))
    ) {
        return `${value}px`;
    }
    return String(value);
}

/**
 * Turns a nested selector into the suffix of the attribute it will be printed
 * under: ":hover" -> "hover", "@media (max-width: 100px)" ->
 * "media-max-width-100px".
 */
function toAttributeSuffix(selectors) {
    return selectors
        .join("-")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

const isPlainObject = (value) =>
    value != null && typeof value === "object" && !Array.isArray(value);

/** Aphrodite treats keys beginning with ":" or "@" as selectors, not properties. */
const isSelector = (key) => key.startsWith(":") || key.startsWith("@");

/**
 * Values React would omit from a `style` prop. Conditional styles such as
 * `outline: isFocused ? "none" : undefined` leave these behind, and printing
 * them as `outline: undefined;` is just noise.
 */
const isEmptyValue = (value) =>
    value == null || typeof value === "boolean" || value === "";

/** Renders `{"0%": {...}, "100%": {...}}` as `0% { ... } 100% { ... }`. */
function renderKeyframes(keyframes) {
    return Object.entries(keyframes)
        .map(([stop, block]) => {
            const declarations = [];
            collectDeclarations(block, [], {declarations});
            return `${stop} { ${declarations.join(" ")} }`;
        })
        .join(" ");
}

/**
 * Walks a definition, sorting what it finds into `context`:
 *
 * - `declarations` — plain properties, destined for the `style` attribute.
 * - `nested` — ":hover", "@media ..." and friends. These can't live in a
 *   `style` attribute, so each gets its own `data-style-*` attribute rather
 *   than being silently dropped.
 * - `keyframes` — object-valued *properties* such as `animationName`, which
 *   Aphrodite hoists into an `@keyframes` rule. Kept apart from `nested`
 *   because the keys inside are animation stops, not selectors.
 */
function collectDeclarations(definition, selectors, context) {
    for (const [key, value] of Object.entries(definition)) {
        if (isSelector(key) && isPlainObject(value)) {
            const path = [...selectors, key];
            const suffix = toAttributeSuffix(path);
            let bucket = context.nested?.get(suffix);
            if (!bucket) {
                bucket = [];
                context.nested?.set(suffix, bucket);
            }
            collectDeclarations(value, path, {
                ...context,
                declarations: bucket,
            });
            continue;
        }

        // Aphrodite allows an array of fallback values for one property.
        for (const single of Array.isArray(value) ? value : [value]) {
            if (isEmptyValue(single)) {
                continue;
            }
            if (isPlainObject(single)) {
                context.keyframes?.set(
                    toCssProperty(key),
                    renderKeyframes(single),
                );
            } else {
                context.declarations.push(
                    `${toCssProperty(key)}: ${toCssValue(key, single)};`,
                );
            }
        }
    }
}

/** Rewrites one element's Aphrodite classes into style attributes, in place. */
function expandElement(node) {
    const className = node.getAttribute("class");
    if (!className) {
        return;
    }

    const context = {declarations: [], nested: new Map(), keyframes: new Map()};
    const remainingClasses = [];
    let expandedAny = false;

    for (const token of className.split(/\s+/).filter(Boolean)) {
        const definition = definitionsByClassName.get(token);
        if (!definition) {
            remainingClasses.push(token);
            continue;
        }
        expandedAny = true;
        collectDeclarations(definition, [], context);
    }

    if (!expandedAny) {
        return;
    }

    if (remainingClasses.length > 0) {
        node.setAttribute("class", remainingClasses.join(" "));
    } else {
        node.removeAttribute("class");
    }

    if (context.declarations.length > 0) {
        // Genuine inline styles go last, so they read as the winning value the
        // way they would cascade in a browser.
        const existing = node.getAttribute("style");
        node.setAttribute(
            "style",
            [context.declarations.join(" "), existing]
                .filter(Boolean)
                .join(" "),
        );
    }

    for (const [suffix, declarations] of context.nested) {
        if (declarations.length > 0) {
            node.setAttribute(`data-style-${suffix}`, declarations.join(" "));
        }
    }

    for (const [property, keyframes] of context.keyframes) {
        node.setAttribute(`data-keyframes-${property}`, keyframes);
    }
}

/**
 * Elements this serializer has already rewritten. Printing an expanded clone
 * sends its children back through `test()`, so without this the serializer
 * would recurse forever.
 */
const alreadyExpanded = new WeakSet();

function expandTree(element) {
    const clone = element.cloneNode(true);
    for (const node of [clone, ...clone.querySelectorAll("*")]) {
        alreadyExpanded.add(node);
        expandElement(node);
    }
    return clone;
}

expect.addSnapshotSerializer({
    test: (value) =>
        value != null &&
        typeof value === "object" &&
        value.nodeType === 1 &&
        !alreadyExpanded.has(value),
    serialize: (value, config, indentation, depth, refs, printer) =>
        printer(expandTree(value), config, indentation, depth, refs),
});
