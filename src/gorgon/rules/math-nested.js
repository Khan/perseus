import Rule from "../rule.js";

module.exports = Rule.makeRule({
    name: "math-nested",
    selector: "math, blockMath",
    pattern: /\\text{[^$}]*\$[^$}]*\$[^}]*}/,
    message: `Nested math:
Don't nest math expressions inside \\text{} blocks`,
});
