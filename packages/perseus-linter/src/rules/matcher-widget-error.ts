import Rule from "../rule";

export default Rule.makeWidgetRule({
    name: "matcher-widget-error",
    widgetType: "matcher",
    severity: Rule.Severity.ERROR,
    lint(widget) {
        if (widget.options.left.length !== widget.options.right.length) {
            return "The two halves of the matcher have different numbers of cards.";
        }
    },
});
