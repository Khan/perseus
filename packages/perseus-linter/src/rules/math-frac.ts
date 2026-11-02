import Rule from "../rule";

export default Rule.makeRule({
    name: "math-frac",
    selector: "math, blockMath",
    pattern: /\\frac[ {]/,
    lint: Rule.makeLintFunction({
        severity: Rule.Severity.GUIDELINE,
        message: "Use \\dfrac instead of \\frac in your math expressions.",
    }),
});
