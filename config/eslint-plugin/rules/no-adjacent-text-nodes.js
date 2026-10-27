// @ts-check
/**
 * Disallow JSX children that render as adjacent DOM text nodes.
 *
 * React renders each string or number child as its own DOM text node, so
 * `<p>Hello {name}</p>` produces two sibling text nodes. Google Chrome's
 * translate feature wraps every text node it translates within a `<font>`
 * element. React still holds references to the original text nodes, so the
 * next time it needs to remove or insert next to one of them it throws
 * "Failed to execute 'removeChild' on 'Node': The node to be removed is not
 * a child of this node."
 *
 * A single text child is safe: React writes it with `textContent`, which
 * doesn't depend on the identity of the text node.
 *
 * See: https://github.com/facebook/react/issues/11538
 */
const ts = require("typescript");

/**
 * @typedef {import("eslint").Rule.RuleModule} RuleModule
 * @typedef {import("eslint").Rule.RuleContext} RuleContext
 * @typedef {import("eslint").Rule.Node} Node
 */

// Types that React renders as nothing. They never create a text node, so a
// union of text and these types still renders text (or nothing at all).
const EMPTY_TYPE_FLAGS =
    ts.TypeFlags.Null |
    ts.TypeFlags.Undefined |
    ts.TypeFlags.Void |
    ts.TypeFlags.BooleanLike |
    ts.TypeFlags.Never;

const TEXT_TYPE_FLAGS =
    ts.TypeFlags.StringLike | ts.TypeFlags.NumberLike | ts.TypeFlags.BigIntLike;

/**
 * Returns true if `type` can render as a text node and can never render as
 * an element.
 *
 * Each member of the type must be text (string, number, bigint) or render
 * as nothing (null, undefined, boolean, `""`), and at least one member must
 * be text. For example, `string | undefined` qualifies, but `undefined`
 * alone does not.
 *
 * Unions that also contain non-text types (for example `ReactNode`, which
 * includes `ReactElement`) are not treated as text. Flagging them would
 * report nearly every `{children}` and we can't know statically which
 * branch is rendered.
 *
 * @param {ts.Type} type
 * @returns {boolean}
 */
function isTextType(type) {
    const parts = type.isUnion() ? type.types : [type];
    let hasText = false;
    for (const part of parts) {
        if (part.flags & TEXT_TYPE_FLAGS) {
            // React renders `""` as nothing.
            if (part.isStringLiteral() && part.value === "") {
                continue;
            }
            hasText = true;
        } else if (!(part.flags & EMPTY_TYPE_FLAGS)) {
            return false;
        }
    }
    return hasText;
}

/**
 * Returns true if `expression` can render as a text node.
 *
 * Conditional and logical expressions are inspected branch by branch so that
 * `{isOpen ? "Close" : <Icon />}` counts as text: whenever the string branch
 * is rendered, it is a text node next to its siblings.
 *
 * @param {any} expression an ESTree expression from a JSXExpressionContainer
 * @param {RuleContext} context
 * @returns {boolean}
 */
function canRenderText(expression, context) {
    switch (expression.type) {
        case "Literal":
            return (
                (typeof expression.value === "string" &&
                    expression.value !== "") ||
                typeof expression.value === "number" ||
                typeof expression.value === "bigint"
            );
        case "TemplateLiteral":
            return true;
        case "JSXElement":
        case "JSXFragment":
            return false;
        case "ConditionalExpression":
            return (
                canRenderText(expression.consequent, context) ||
                canRenderText(expression.alternate, context)
            );
        case "LogicalExpression":
            // For `a && b`, `a` only renders when it is falsy. Falsy text
            // (`0`, `""`) is rare enough that we only check the right side.
            if (expression.operator === "&&") {
                return canRenderText(expression.right, context);
            }
            return (
                canRenderText(expression.left, context) ||
                canRenderText(expression.right, context)
            );
        default:
            return hasTextType(expression, context);
    }
}

/**
 * Uses the TypeScript checker to decide whether `expression` is text. When
 * type information isn't available (for example in a .js file outside of the
 * TypeScript project), we can't tell, so we assume it isn't.
 *
 * @param {any} expression
 * @param {RuleContext} context
 * @returns {boolean}
 */
function hasTextType(expression, context) {
    const services = context.sourceCode.parserServices;
    if (!services?.program || !services.esTreeNodeToTSNodeMap) {
        return false;
    }
    const checker = services.program.getTypeChecker();
    const tsNode = services.esTreeNodeToTSNodeMap.get(expression);
    return isTextType(checker.getTypeAtLocation(tsNode));
}

/**
 * Classifies a JSX child as rendering text, rendering something else, or
 * rendering nothing at all (and so not separating its neighbours).
 *
 * @param {any} child
 * @param {RuleContext} context
 * @returns {"text" | "other" | "nothing"}
 */
function classifyChild(child, context) {
    switch (child.type) {
        case "JSXText":
            // JSX removes whitespace-only text that contains a line break.
            // Whitespace on a single line, as in `{a} {b}`, is kept.
            if (/^\s*$/.test(child.value) && child.value.includes("\n")) {
                return "nothing";
            }
            return "text";
        case "JSXExpressionContainer":
            // `{/* comment */}`
            if (child.expression.type === "JSXEmptyExpression") {
                return "nothing";
            }
            return canRenderText(child.expression, context) ? "text" : "other";
        default:
            return "other";
    }
}

/** @type {RuleModule} */
module.exports = {
    meta: {
        type: "problem",
        docs: {
            description:
                "Disallow JSX children that render as adjacent text nodes, " +
                "which crash React when Chrome's translate feature is used",
        },
        messages: {
            adjacentTextNodes:
                "This renders a text node next to another text node. " +
                "Chrome's translate feature wraps each text node in a " +
                "<font> element, which makes React throw 'removeChild' " +
                "errors when it updates them. Combine the text into a " +
                "single string (for example, with a template literal) or " +
                "wrap each piece in its own element.",
        },
        schema: [],
    },

    create(context) {
        /** @param {any} node */
        function checkChildren(node) {
            let previousIsText = false;
            for (const child of node.children) {
                const kind = classifyChild(child, context);
                if (kind === "nothing") {
                    continue;
                }
                if (kind === "text" && previousIsText) {
                    context.report({
                        node: child,
                        messageId: "adjacentTextNodes",
                    });
                }
                previousIsText = kind === "text";
            }
        }

        return {
            JSXElement: checkChildren,
            JSXFragment: checkChildren,
        };
    },
};
