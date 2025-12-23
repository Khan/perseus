const {exec} = require("child_process");
const fs = require("fs");
const path = require("path");
const {promisify} = require("util");

const execAsync = promisify(exec);

const objectifyCSS = (cssPathname, objectName) => {
    const cssRules = fs.readFileSync(cssPathname, "utf-8");
    const objectified = JSON.stringify(parseCssToObjects(cssRules));

    const fileDirectory = path.dirname(cssPathname);
    const fileNameParts = path.basename(cssPathname).split(".");
    const aphroditeFileName = `${fileNameParts[0]}.styles.js`;
    const aphroditeFilePath = path.join(fileDirectory, aphroditeFileName);
    fs.writeFileSync(
        aphroditeFilePath,
        `export const ${objectName} = ${objectified};`,
    );
    (async () => {
        try {
            await execAsync(`prettier --write ${aphroditeFilePath}`);
            await execAsync(`git add ${aphroditeFilePath}`);
        } catch (error) {
            console.log(error);
        }
    })();

    return aphroditeFileName;
};

// Lightweight, ad hoc CSS parser for cssStringified -> JS objects
// Output shape:
// {
//   ".class": { "font-size": "1.4rem", ... },
//   ".class_hover": { ... },
//   ".class_mq_maxWidth_1240px": { ... },
// }
function parseCssToObjects(cssString) {
    const result = {};

    // Remove comments to simplify parsing
    const withoutComments = cssString.replace(/\/\*[\s\S]*?\*\//g, "");

    // Normalize whitespace
    const css = withoutComments.replace(/\s+/g, " ").trim();

    // Entry point: parse top‑level content
    parseBlockContent(css, null, result);

    return result;
}

/**
 * Parse a block of CSS content that may contain @media blocks and rule blocks.
 *
 * @param {string} css           A CSS string with balanced braces.
 * @param {string|null} mq       The current media query string, or null.
 * @param {object} acc           Accumulator for parsed rules.
 */
function parseBlockContent(css, mq, acc) {
    let i = 0;
    const len = css.length;

    while (i < len) {
        // Skip whitespace and stray semicolons
        while (i < len && /\s|;/.test(css[i])) {
            i++;
        }
        if (i >= len) {
            break;
        }

        if (css.startsWith("@media", i)) {
            // Parse @media <query> { ... }
            const mediaStart = i;
            const braceIndex = css.indexOf("{", mediaStart);
            if (braceIndex === -1) {
                // Malformed @media; bail out
                break;
            }
            const query = css
                .slice(mediaStart + "@media".length, braceIndex)
                .trim();
            const {block, nextIndex} = extractBalancedBlock(css, braceIndex);
            // Recurse into media block, carrying media query context
            parseBlockContent(block, query, acc);
            i = nextIndex;
        } else {
            // Regular selector block: <selector> { ... }
            const braceIndex = css.indexOf("{", i);
            if (braceIndex === -1) {
                // No more blocks
                break;
            }
            const selectorRaw = css.slice(i, braceIndex).trim();
            const {block, nextIndex} = extractBalancedBlock(css, braceIndex);
            parseRuleBlock(selectorRaw, block, mq, acc);
            i = nextIndex;
        }
    }
}

/**
 * Extracts `{ ... }` content starting at the `{` token.
 *
 * @param {string} css
 * @param {number} braceIndex   Index of `{`
 * @returns {{block: string, nextIndex: number}}
 */
function extractBalancedBlock(css, braceIndex) {
    let depth = 0;
    let i = braceIndex;
    const len = css.length;

    for (; i < len; i++) {
        const ch = css[i];
        if (ch === "{") {
            depth++;
        } else if (ch === "}") {
            depth--;
            if (depth === 0) {
                // Block is css[braceIndex + 1 .. i - 1]
                const block = css.slice(braceIndex + 1, i).trim();
                return {
                    block,
                    nextIndex: i + 1,
                };
            }
        }
    }

    // Unbalanced braces; treat rest as block
    return {
        block: css.slice(braceIndex + 1).trim(),
        nextIndex: len,
    };
}

/**
 * Parse a selector block `.foo, .bar:hover { ... }`
 *
 * @param {string} selectorRaw
 * @param {string} block
 * @param {string|null} mq
 * @param {object} acc
 */
function parseRuleBlock(selectorRaw, block, mq, acc) {
    // Support multiple selectors separated by commas
    const selectors = selectorRaw
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

    if (selectors.length === 0) {
        return;
    }

    const declarations = parseDeclarations(block);

    selectors.forEach((sel) => {
        const normalizedSelector = normalizeSelector(sel, mq);

        if (!acc[normalizedSelector]) {
            acc[normalizedSelector] = {};
        }
        Object.assign(acc[normalizedSelector], declarations);
    });
}

function toCamelCase(propertyName) {
    return propertyName.replace(/-([a-z])/g, (match, letter) =>
        letter.toUpperCase(),
    );
}

/**
 * Parse declarations like `color: red; font-size: 1.4rem;`
 * into `{ "color": "red", "fontSize": "1.4rem" }`
 *
 * @param {string} block
 * @returns {Record<string,string>}
 */
function parseDeclarations(block) {
    const declarations = {};
    // Split by semicolons; this is simplistic but acceptable
    const parts = block.split(";");
    for (const part of parts) {
        const trimmed = part.trim();
        if (!trimmed) {
            continue;
        }
        const colonIndex = trimmed.indexOf(":");
        if (colonIndex === -1) {
            continue;
        }

        const rawProperty = trimmed.slice(0, colonIndex).trim();
        const value = trimmed.slice(colonIndex + 1).trim();
        if (!rawProperty || !value) {
            continue;
        }

        const propertyName = toCamelCase(rawProperty);
        declarations[propertyName] = value;
    }
    return declarations;
}

/**
 * Normalize selector and media query:
 * - Pseudo‑selectors: `.class:hover` -> `.class_hover`
 * - Media query: `@media (max-width: 1240px)` -> `_mq_maxWidth_1240px`
 *
 * Result examples:
 * - `.class`                 (no mq, no pseudo)
 * - `.class_hover`           (pseudo)
 * - `.class_mq_maxWidth_1240px` (mq)
 */
function normalizeSelector(selector, mq) {
    let normalized = toCamelCase(selector.trim());

    normalized = normalized.replace(/:/g, "_");
    normalized = normalized.split(".").at(-1); // Keep only the last class if multiple

    if (mq) {
        const mqSuffix = normalizeMediaQuery(mq);
        normalized = `${normalized}${mqSuffix}`;
    }

    return normalized;
}

/**
 * Normalize media query into `_mq_<normalizedQuery>`
 * Example:
 *   "(max-width: 1240px)"          -> "_mq_maxWidth_1240px"
 *   "screen and (max-width:1240px)" -> "_mq_screen_and_maxWidth_1240px"
 */
function normalizeMediaQuery(mq) {
    // Remove leading '@media' if present
    let query = mq.replace(/^@media/i, "").trim();

    // Remove surrounding parentheses if the whole query is wrapped
    if (query.startsWith("(") && query.endsWith(")")) {
        query = query.slice(1, -1).trim();
    }

    // Replace common tokens with desired format
    query = query
        // max-width -> maxWidth
        .replace(/max-width/gi, "maxWidth")
        .replace(/min-width/gi, "minWidth")
        // Replace non‑alphanumeric with underscores
        .replace(/[^a-zA-Z0-9]+/g, "_")
        // Collapse multiple underscores
        .replace(/_+/g, "_")
        // Trim leading/trailing underscores
        .replace(/^_+|_+$/g, "");

    return query ? `_mq_${query}` : "_mq";
}

exports.objectifyCSS = objectifyCSS;
