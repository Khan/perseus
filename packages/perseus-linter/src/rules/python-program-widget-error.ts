import Rule from "../rule";

export default Rule.makeWidgetRule({
    name: "python-program-widget-error",
    widgetType: "python-program",
    severity: Rule.Severity.ERROR,
    lint(widget) {
        const errors: Array<string> = [];
        const height = widget.options.height;
        const programID = widget.options.programID;

        if (programID === "") {
            errors.push("The program ID is required.");
        }

        if (!Number.isInteger(height) || height < 1) {
            errors.push("The height must be a positive integer.");
        }

        return errors;
    },
});
