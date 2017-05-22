import Rule from "../rule.js";

module.exports = Rule.makeRule({
    name: "math-align-linebreaks",
    selector: "blockMath",
    pattern: /\\begin{align}.*[^\\](\\{2,3}[^\\]|\\{5,}).*\\end{align}/,
    message: "Use four backslashes between lines of an align block",
});
