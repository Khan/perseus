import Rule from "../rule.js";

module.exports = Rule.makeRule({
    name: "blockquoted-widget",
    selector: "blockQuote widget",
    message: `Blockquoted widget:
widgets should not be indented.`,
});
