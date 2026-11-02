import Rule from "../rule";

export default Rule.makeRule({
    name: "math-text-empty",
    severity: Rule.Severity.WARNING,
    selector: "math, blockMath",
    pattern: /\\text{\s*}/,
    lint: Rule.makeLintFunction({
        message: "Empty \\text{} block in math expression",
    }),
});
