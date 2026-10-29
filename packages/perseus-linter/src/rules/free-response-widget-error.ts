import Rule from "../rule";

// Taken from packages/perseus/src/util.ts
// I can't import it directly because of circular dependencies.
//
// Removed the `^` at the beginning of the origial rWidgetRule from
// Utils because it was only identifying widgets at the beginning of the
// string, but we want to match widgets anywhere in the string.
//
// Note: We can't use PerseusMarkdown here because perseus is a
// restricted dependency of perseus-linter (circular dependency).
const rWidgetRule = /\[\[\u2603 (([a-z-]+) ([0-9]+))\]\]/;

export default Rule.makeWidgetRule({
    name: "free-response-widget-error",
    widgetType: "free-response",
    severity: Rule.Severity.ERROR,
    lint(widget) {
        const question = widget.options.question;
        if (!question) {
            return "The question is empty";
        }

        if (question.match(rWidgetRule) != null) {
            return "The question contains a widget";
        }
    },
});
