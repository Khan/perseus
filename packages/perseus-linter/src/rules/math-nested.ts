import Rule from "../rule";

export default Rule.makeRule({
    name: "math-nested",
    severity: Rule.Severity.ERROR,
    selector: "math, blockMath",
    pattern: /\\text{[^$}]*\$[^$}]*\$[^}]*}/,
    lint: Rule.makeLintFunction({
        message: `Nested math:
Don't nest math expressions inside \\text{} blocks`,
    }),
});
