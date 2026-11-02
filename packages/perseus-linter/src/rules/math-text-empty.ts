import Rule from "../rule";

export default Rule.makeRule({
    name: "math-text-empty",
    selector: "math, blockMath",
    pattern: /\\text{\s*}/,
    lint: Rule.makeLintFunction({
        severity: Rule.Severity.WARNING,
        message: "Empty \\text{} block in math expression",
    }),
});
