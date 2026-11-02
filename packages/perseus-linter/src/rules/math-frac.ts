import Rule from "../rule";

export default Rule.makeRule({
    name: "math-frac",
    severity: Rule.Severity.GUIDELINE,
    selector: "math, blockMath",
    pattern: /\\frac[ {]/,
    lint: Rule.makeLintFunction({
        severity: Rule.Severity.GUIDELINE,
        message: "Use \\dfrac instead of \\frac in your math expressions.",
    }),
});
