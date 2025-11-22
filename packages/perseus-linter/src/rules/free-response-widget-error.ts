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

export default Rule.makeRule({
    name: "free-response-widget-error",
    severity: Rule.Severity.ERROR,
    selector: "widget",
    lint: function (state, content, nodes, match, context) {
        // This rule only looks at radio widgets
        if (state.currentNode().widgetType !== "free-response") {
            return;
        }

        const nodeId = state.currentNode().id;
        if (!nodeId) {
            return;
        }

        // If it can't find a definition for the widget it does nothing
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        const widget = context && context.widgets && context.widgets[nodeId];
        if (!widget) {
            return;
        }

        const question = widget.options.question;
        if (!question) {
            return "The question is empty";
        }

        if (question.match(rWidgetRule) != null) {
            return "The question contains a widget";
        }
    },
}) as Rule;
