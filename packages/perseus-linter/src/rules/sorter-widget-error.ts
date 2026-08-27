import Rule from "../rule";

// There's nothing to sort with fewer than two cards.
const minCards = 2;

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

        // The editor adds a card as an empty string, and clearing a card's text
        // leaves one behind, so a blank card reaches the learner as an empty
        // draggable.
        if (correct.some((card) => card.trim() === "")) {
            warnings.push("Sorter cards cannot be blank.");
        }

        return warnings.join("\n\n");
    },
}) as Rule;
