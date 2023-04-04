import Rule from "../rule";

export default Rule.makeRule({
    name: "blockquoted-widget",
    severity: Rule.Severity.WARNING,
    selector: "blockQuote widget",
    message: `Blockquoted widget:
widgets should not be indented.`,
}) as Rule;
