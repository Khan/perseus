import Rule from "../rule";

export default Rule.makeWidgetRule({
    name: "radio-widget-error",
    widgetType: "radio",
    severity: Rule.Severity.ERROR,
    lint(widget) {
        const choices = widget.options.choices;

        // Error if no choice is marked as correct
        if (!choices.some((choice) => choice.correct)) {
            return "No choice is marked as correct.";
        }

        // Error if NOTA (none of the above) and another choice are both marked as correct
        const correctChoices = choices.filter((choice) => choice.correct);
        const hasNotaCorrect = correctChoices.some(
            (choice) => choice.isNoneOfTheAbove,
        );

        if (hasNotaCorrect && correctChoices.length > 1) {
            return "Cannot mark both None of the Above and another choice as correct.";
        }

        return;
    },
});
