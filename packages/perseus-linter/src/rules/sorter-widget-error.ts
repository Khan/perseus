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

export default Rule.makeWidgetRule({
    name: "sorter-widget-error",
    widgetType: "sorter",
    severity: Rule.Severity.ERROR,
    lint(widget) {
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

        return warnings;
    },
});
