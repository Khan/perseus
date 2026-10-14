import {parse, traverseContent} from "@khanacademy/pure-markdown";

import Rule from "../rule";

// There's nothing to sort with fewer than two cards.
const minCards = 2;

// A card holding an image must hold nothing else: an image next to text,
// math, or another image is not allowed.
function hasMixedContent(card: string): boolean {
    const contentNodes: any[] = [];

    traverseContent(parse(card.trim(), {}), (node: any) => {
        // Markdown always wraps a card in a paragraph, so that wrapper
        // doesn't count as content.
        if (node.type !== "paragraph") {
            contentNodes.push(node);
        }
    });

    return (
        contentNodes.length > 1 &&
        contentNodes.some((node) => node.type === "image")
    );
}

// eslint-disable-next-line no-restricted-syntax
export default Rule.makeRule({
    name: "sorter-widget-error",
    severity: Rule.Severity.ERROR,
    selector: "widget",
    lint: function (state, content, nodes, match, context) {
        // This rule only looks at sorter widgets
        if (state.currentNode().widgetType !== "sorter") {
            return;
        }

        const nodeId = state.currentNode().id;
        if (!nodeId) {
            return;
        }

        // If it can't find a definition for the widget it does nothing
        const widget = context?.widgets?.[nodeId];
        if (!widget) {
            return;
        }

        const warnings: string[] = [];
        const correct: string[] = widget.options.correct ?? [];

        if (correct.length < minCards) {
            warnings.push(`Sorter requires at least ${minCards} cards.`);
        }

        if (correct.some((card) => card.trim() === "")) {
            warnings.push("Sorter cards cannot be blank.");
        }

        if (correct.some(hasMixedContent)) {
            warnings.push("Sorter cards cannot mix images with other content.");
        }

        return warnings.join("\n\n");
    },
}) as Rule;
