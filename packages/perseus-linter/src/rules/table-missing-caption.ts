import Rule from "../rule";

// Exported so tests can assert on which problem was reported without being
// coupled to the exact wording, which is still going through copy review.
export const MISSING_CAPTION_MESSAGE = `Table is missing a caption:
Screen reader users rely on a caption to understand what a table contains
before navigating its cells. Add one by putting a line of the form
|| Your caption here || directly above the table.`;

export const EMPTY_CAPTION_MESSAGE = `Table caption is empty:
This table has a caption line, but there is no text between the || markers,
so screen reader users hear an empty caption. Describe what the table
contains, for example || Average rainfall by month ||.`;

/**
 * Recursively collect the text of a parsed inline markdown node (or array of
 * them). A titled table's title is the output of `parseInline`, so its text
 * may be nested inside emphasis, strong, math, etc. rather than being a flat
 * string.
 */
function getTextContent(node: any): string {
    if (typeof node === "string") {
        return node;
    }
    if (Array.isArray(node)) {
        return node.map(getTextContent).join("");
    }
    if (node && typeof node === "object") {
        return getTextContent(node.content);
    }
    return "";
}

// Returns the text of a `titledTable` node's title, with no leading or
// trailing whitespace. An empty string means the caption has no text in it.
function getTitleText(titledTable: any): string {
    return getTextContent(titledTable?.title).trim();
}

// eslint-disable-next-line no-restricted-syntax
export default Rule.makeRule({
    name: "table-missing-caption",
    severity: Rule.Severity.GUIDELINE,
    // The selector grammar has no `:not()`, so we match every table and
    // inspect its parent in `lint()`. A captioned table is parsed as a
    // `titledTable` node whose `table` property holds the table itself, so
    // the table's parent tells us whether a caption was authored.
    selector: "table",
    lint: function (state) {
        const parent = state.parent();

        if (parent?.type !== "titledTable") {
            return MISSING_CAPTION_MESSAGE;
        }

        // The table has a caption line, but an author can write one with no
        // text in it (for example "||   ||"), which renders an empty
        // <caption> element. That is no more useful than having no caption.
        if (getTitleText(parent) === "") {
            return EMPTY_CAPTION_MESSAGE;
        }
    },
}) as Rule;
