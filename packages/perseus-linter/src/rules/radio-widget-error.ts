import Rule from "../rule";

export default Rule.makeRule({
    name: "radio-widget-error",
    severity: Rule.Severity.ERROR,
    selector: "widget",
    lint: function (state, content, nodes, match, context) {
        // This rule only looks at radio widgets
        if (state.currentNode().widgetType !== "radio") {
            return;
        }

        const nodeId = state.currentNode().id;
        if (!nodeId) {
            return;
        }

        // If it can't find a definition for the widget it does nothing
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        const widget = context?.widgets?.[nodeId];
        if (!widget) {
            return;
        }

        const errors: Array<string> = [];
        const choices = widget.options.choices;

        // Error if no choice is marked as correct
        if (!choices.some((choice) => choice.correct)) {
            errors.push("No choice is marked as correct.");
        }

        // Error if NOTA and another choice are both marked as correct
        const correctChoices = choices.filter((choice) => choice.correct);
        const hasNotaCorrect = correctChoices.some(
            (choice) => choice.isNoneOfTheAbove,
        );

        if (hasNotaCorrect && correctChoices.length > 1) {
            errors.push(
                "Cannot mark both None of the Above and another choice as correct.",
            );
        }

        return errors.join("\n\n");
    },
}) as Rule;
