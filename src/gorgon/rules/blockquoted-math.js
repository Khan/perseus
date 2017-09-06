import Rule from "../rule.js";

module.exports = Rule.makeRule({
    name: "blockquoted-math",
    severity: Rule.Severity.WARNING,
    selector: "blockQuote math, blockQuote blockMath",
    message: `Blockquoted math:
math should not be indented.`,
});
