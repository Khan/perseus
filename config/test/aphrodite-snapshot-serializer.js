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
 *     in tests, Aphrodite rules never reach the CSSOM and declarations like
 *     `pointer-events: none` are inert. Inlining the styles makes jsdom start
 *     honoring them, which breaks ~260 interaction tests that click on things
 *     Aphrodite considers unclickable.
 *  2. It only covers components that route styles through Wonder Blocks'
 *     `processStyleList`. Perseus calls Aphrodite's `css()` directly in ~88
 *     files, and those class names would stay tokenized.
 *
 * So we expand at serialization time instead: record what each generated class
 * name means as it is created, then rewrite class attributes on a *clone* of
 * the tree while it is being printed. The live DOM is never touched.
 */
const aphrodite = require("aphrodite");
// Aphrodite's own helpers for turning a definition into CSS.
const {kebabifyStyleName, stringifyValue} = require("aphrodite/lib/util");

/**
 * Maps a generated class name ("button_vr44p2-o_O-shared_1hhaz1q") to the
 * merged style definition it came from.
 */
const definitionsByClassName = new Map();

const isPlainObject = (value) =>
    value != null && typeof value === "object" && !Array.isArray(value);

/**
 * Merges two Aphrodite style definitions `a` and `b`. When both `a` and `b`
 * define a property, the value from `b` wins. Nested blocks (":hover",
 * "@media ...") are merged rather than replaced wholesale. This matches how
 * Aphrodite itself layers rules.
 */
function mergeDefinitions(a, b) {
    const merged = {...a};
    for (const [key, value] of Object.entries(b)) {
        merged[key] = isPlainObject(value)
            ? mergeDefinitions(a[key] ?? {}, value)
            : value;
    }
    return merged;
}

const originalCss = aphrodite.css;

// Aphrodite's entry point ends in `module.exports = exports.default`, so its
// export is a plain mutable object with no `__esModule` marker. Both Wonder
// Blocks' bundles and our swc-compiled source reach through that object at
// call time (`aphrodite.css(...)`) rather than capturing the function when
// they import it, so replacing it here intercepts every call in the process.
aphrodite.css = function css(...styles) {
    const className = originalCss(...styles);
    // Aphrodite derives the class name from a hash of the definitions, so a
    // class name we've already seen always means the same styles.
    if (!className || definitionsByClassName.has(className)) {
        return className;
    }
    const merged = styles
        .flat(Infinity)
        // `css()` tolerates falsy entries so callers can write
        // `isHeader && styles.header`.
        .filter((style) => style && style._definition)
        .map((style) => style._definition)
        .reduce(mergeDefinitions, {});
    definitionsByClassName.set(className, merged);
    return className;
};

/** "WebkitFontSmoothing" -> "-webkit-font-smoothing", "zIndex" -> "z-index". */
function toCssProperty(key) {
    if (key.startsWith("--")) {
        return key; // Already a CSS custom property.
    }
    return kebabifyStyleName(key);
}

/**
 * Turns a path of nested block keys into the suffix of the attribute it will
 * be printed under: ":hover" -> "hover", "@media (max-width: 100px)" ->
 * "media-max-width-100px".
 */
function toAttributeSuffix(blockKeys) {
    return blockKeys
        .join("-")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

/**
 * Aphrodite treats keys beginning with ":" (pseudo-classes) or "@" (at-rules
 * such as media queries) as nested blocks of styles, not properties.
 */
const isNestedBlockKey = (key) => key.startsWith(":") || key.startsWith("@");

/**
 * Values React would omit from a `style` prop. Conditional styles such as
 * `outline: isFocused ? "none" : undefined` leave these behind, and printing
 * them as `outline: undefined;` is just noise.
 */
const isEmptyValue = (value) =>
    value == null || typeof value === "boolean" || value === "";

/**
 * Jest prints string attributes wrapped in `"` without escaping them, so a
 * value such as `font-family: "Times New Roman"` would end the attribute
 * early and print a broken snapshot.
 */
const escapeAttributeValue = (value) => value.replace(/"/g, "'");

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
 *   because the keys inside are animation stops, not nested block keys.
 */
function collectDeclarations(definition, blockKeys, context) {
    for (const [key, value] of Object.entries(definition)) {
        if (isNestedBlockKey(key) && isPlainObject(value)) {
            const path = [...blockKeys, key];
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
                    `${toCssProperty(key)}: ${stringifyValue(key, single)};`,
                );
            }
        }
    }
}

/** Rewrites one element's Aphrodite classes into style attributes, in place. */
function expandStylesInElement(node) {
    const className = node.getAttribute("class");
    if (!className) {
        return;
    }

    const context = {declarations: [], nested: new Map(), keyframes: new Map()};
    const nonAphroditeClasses = [];
    let expandedAny = false;

    for (const token of className.split(/\s+/).filter(Boolean)) {
        const definition = definitionsByClassName.get(token);
        if (!definition) {
            nonAphroditeClasses.push(token);
            continue;
        }
        expandedAny = true;
        collectDeclarations(definition, [], context);
    }

    if (!expandedAny) {
        return;
    }

    if (nonAphroditeClasses.length > 0) {
        node.setAttribute("class", nonAphroditeClasses.join(" "));
    } else {
        node.removeAttribute("class");
    }

    if (context.declarations.length > 0) {
        // Genuine inline styles go last, so they read as the winning value the
        // way they would cascade in a browser.
        const existing = node.getAttribute("style");
        node.setAttribute(
            "style",
            escapeAttributeValue(
                [context.declarations.join(" "), existing]
                    .filter(Boolean)
                    .join(" "),
            ),
        );
    }

    for (const [suffix, declarations] of context.nested) {
        if (declarations.length > 0) {
            node.setAttribute(
                `data-style-${suffix}`,
                escapeAttributeValue(declarations.join(" ")),
            );
        }
    }

    for (const [property, keyframes] of context.keyframes) {
        node.setAttribute(
            `data-keyframes-${property}`,
            escapeAttributeValue(keyframes),
        );
    }
}

/**
 * Elements this serializer has already rewritten.
 *
 * Jest does recurse for us: printing an element calls `test()` on each of its
 * children. But we can't rewrite an element in place (that would touch the
 * live DOM), so `serialize()` has to print a clone, and a clone brings its
 * own children along. If we expanded only the top element each time, every
 * child would be cloned again on its way through `serialize()`, re-copying
 * each subtree once per ancestor. Instead, the first call clones and expands
 * the whole subtree in one pass and records every node here, so `test()`
 * lets the clone (and its descendants) through to Jest's default printer.
 * Without this, the clone itself would match `test()` and recurse forever.
 */
const alreadyExpanded = new WeakSet();

function expandStylesInTree(element) {
    const clone = element.cloneNode(true);
    for (const node of [clone, ...clone.querySelectorAll("*")]) {
        alreadyExpanded.add(node);
        expandStylesInElement(node);
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
        printer(expandStylesInTree(value), config, indentation, depth, refs),
});
