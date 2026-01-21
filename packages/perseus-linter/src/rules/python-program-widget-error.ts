import Rule from "../rule";

export default Rule.makeRule({
    name: "python-program-widget-error",
    severity: Rule.Severity.ERROR,
    selector: "widget",
    lint: function (state, content, nodes, match, context) {
        // This rule only looks at python-program widgets
        if (state.currentNode().widgetType !== "python-program") {
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

        const errors: Array<string> = [];
        const height = widget.options.height;
        const programID = widget.options.programID;

        if (programID === "") {
            errors.push("The program ID is required.");
        }

        if (!Number.isInteger(height) || height < 1) {
            errors.push("The height must be a positive integer.");
        }

        const allErrorsString = errors.join("\n\n");
        return allErrorsString;
    },
}) as Rule;
