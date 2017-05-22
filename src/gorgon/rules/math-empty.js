import Rule from "../rule.js";

module.exports = Rule.makeRule({
    name: "math-empty",
    selector: "math, blockMath",
    pattern: /^$/,
    message: "Empty math: don't use $$ in your markdown.",
});
