import Rule from "../rule";

export default Rule.makeRule({
    name: "math-nested",
    selector: "math, blockMath",
    pattern: /\\text{[^$}]*\$[^$}]*\$[^}]*}/,
    lint: Rule.makeLintFunction({
        severity: Rule.Severity.ERROR,
        message: `Nested math:
Don't nest math expressions inside \\text{} blocks`,
    }),
});
