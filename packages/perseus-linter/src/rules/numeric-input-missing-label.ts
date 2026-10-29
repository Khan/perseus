import Rule from "../rule";

export default Rule.makeWidgetRule({
    name: "numeric-input-missing-label",
    widgetType: "numeric-input",
    severity: Rule.Severity.WARNING,
    lint(widget) {
        if (!widget.options.labelText) {
            return `Inputs should have an aria label:
While screen readers will fallback to a default label of 'Your answer', a more descriptive label would improve accessibility.`;
        }
    },
});
