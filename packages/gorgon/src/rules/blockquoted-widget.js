// @flow
import Rule from "../rule.js";

export default (Rule.makeRule({
    name: "blockquoted-widget",
    severity: Rule.Severity.WARNING,
    selector: "blockQuote widget",
    message: `Blockquoted widget:
widgets should not be indented.`,
}): Rule);
