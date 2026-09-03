import Rule from "../rule";

/**
 * One image in Perseus markdown: `![alt](url)`.
 *
 * Note: we can't use PerseusMarkdown here — perseus is a restricted dependency
 * of perseus-linter (circular dependency) — so this rule matches the syntax
 * directly, as the other widget rules in this folder do.
 */
const IMAGE_MARKDOWN = /!\[[^\]]*\]\([^)]*\)/g;

/** The shape this rule reads out of a Fill in the Blank widget's options. */
type FillInTheBlankTileish = {
    id?: unknown;
    content?: unknown;
    label?: unknown;
};

/**
 * Describes a choice the way an author will recognise it: by its content, or
 * failing that its screen reader text, or failing that its position.
 */
function describeChoice(tile: FillInTheBlankTileish, index: number): string {
    const content = typeof tile.content === "string" ? tile.content.trim() : "";
    const label = typeof tile.label === "string" ? tile.label.trim() : "";
    const shown = content || label;
    return shown === "" ? `choice ${index + 1}` : `choice "${shown}"`;
}

/**
 * Flags a Fill in the Blank choice that holds both text and an image.
 *
 * A choice is one or the other — text (a plain string or TeX) or a single
 * image — never both. The editor cannot produce a mixed choice: its image
 * editor replaces the text field rather than sitting beside it. But options
 * can also arrive as raw JSON, pasted or hand-edited or carried over from an
 * older version, and nothing on that path is checked. This rule covers it, so
 * both ways of authoring are caught.
 *
 * Two images in one choice is the same mistake and is reported the same way.
 */
// eslint-disable-next-line no-restricted-syntax
export default Rule.makeRule({
    name: "fill-in-the-blank-widget-error",
    severity: Rule.Severity.ERROR,
    selector: "widget",
    lint: function (state, content, nodes, match, context) {
        if (state.currentNode().widgetType !== "fill-in-the-blank") {
            return;
        }

        const nodeId = state.currentNode().id;
        if (!nodeId) {
            return;
        }

        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        const widget = context && context.widgets && context.widgets[nodeId];
        if (!widget) {
            return;
        }

        // The widget's options are not in the schema yet, and this rule's job
        // is to police options that may not be well-formed in the first place
        // — so read them defensively rather than trusting a type.
        // eslint-disable-next-line no-restricted-syntax
        const tiles = (widget.options as {tiles?: unknown})?.tiles;
        if (!Array.isArray(tiles)) {
            return;
        }

        const problems: string[] = [];
        tiles.forEach((tile: FillInTheBlankTileish, index: number) => {
            if (tile == null || typeof tile.content !== "string") {
                return;
            }
            const images = tile.content.match(IMAGE_MARKDOWN) ?? [];
            if (images.length === 0) {
                return;
            }

            const withoutImages = tile.content.replace(IMAGE_MARKDOWN, "");
            if (withoutImages.trim() !== "") {
                problems.push(
                    `${describeChoice(tile, index)} has both text and an image`,
                );
            } else if (images.length > 1) {
                problems.push(
                    `${describeChoice(tile, index)} has more than one image`,
                );
            }
        });

        if (problems.length > 0) {
            return (
                `A Fill in the Blank choice must be either text or a single ` +
                `image, not both: ${problems.join("; ")}.`
            );
        }
    },
}) as Rule;
