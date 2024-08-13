import Rule from "../rule";

export default Rule.makeRule({
    name: "static-widget-in-question-stem",
    severity: Rule.Severity.WARNING,
    selector: "widget",
    lint: (state, content, nodes, match, context) => {
        if (context.contentType !== "exercise") {
            return;
        }

        if (context.stack.includes("hint")) {
            return;
        }

        const widget = context?.widgets?.[state.currentNode().id];
        if (!widget) {
            return;
        }

        if (widget.static) {
            return `Widget in question stem is static (non-interactive).`
        }
    }
})
