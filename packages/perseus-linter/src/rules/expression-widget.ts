import Rule from "../rule";

function buttonNotInButtonSet(name: string): string {
    return "Answer requires a button not found in the button sets: " + name;
}

export default Rule.makeRule({
    name: "expression-widget",
    severity: Rule.Severity.WARNING,
    selector: "widget",
    lint: function (state, content, nodes, match, context) {
        // This rule only looks at image widgets
        if (state.currentNode().widgetType !== "expression") {
            return;
        }

        // If it can't find a definition for the widget it does nothing
        const widget = context?.widgets?.[state.currentNode().id];
        if (!widget) {
            return;
        }

        const answers = widget.options.answerForms;
        const buttons = widget.options.buttonSets;
        for (const answer of answers) {
            if (
                answer.value.includes("\\sqrt") &&
                !buttons.includes("prealgebra")
            ) {
                return buttonNotInButtonSet("\\sqrt");
            }
        }
    },
}) as Rule;
