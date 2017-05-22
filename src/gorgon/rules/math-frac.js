import Rule from "../rule.js";

module.exports = Rule.makeRule({
    name: "math-frac",
    selector: "math, blockMath",
    pattern: /\\frac[ {]/,
    message: "Use \\dfrac instead of \\frac in your math expressions.",
});
