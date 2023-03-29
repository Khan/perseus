import Rule from "../rule";

export default Rule.makeRule({
    name: "math-text-empty",
    severity: Rule.Severity.WARNING,
    selector: "math, blockMath",
    pattern: /\\text{\s*}/,
    message: "Empty \\text{} block in math expression",
}) as Rule;
