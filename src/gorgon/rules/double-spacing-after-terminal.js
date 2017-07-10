import Rule from "../rule.js";

module.exports = Rule.makeRule({
    name: "double-spacing-after-terminal",
    selector: "paragraph",
    pattern: /[.!\?] {2}/i,
    message: `Use a single space after a sentence-ending period, or
any other kind of terminal punctuation.`,
});
