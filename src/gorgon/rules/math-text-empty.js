import Rule from "../rule.js";

module.exports = Rule.makeRule({
    name: "math-text-empty",
    selector: "math, blockMath",
    pattern: /\\text{\s*}/,
    message: "Empty \\text{} block in math expression",
});
