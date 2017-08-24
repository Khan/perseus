import Rule from "../rule.js";

module.exports = Rule.makeRule({
    name: "math-nested",
    severity: Rule.Severity.ERROR,
    selector: "math, blockMath",
    pattern: /\\text{[^$}]*\$[^$}]*\$[^}]*}/,
    message: `Nested math:
Don't nest math expressions inside \\text{} blocks`,
});
