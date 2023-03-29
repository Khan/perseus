import Rule from "../rule";

export default Rule.makeRule({
    name: "math-starts-with-space",
    severity: Rule.Severity.GUIDELINE,
    selector: "math, blockMath",
    pattern: /^\s*(~|\\qquad|\\quad|\\,|\\;|\\:|\\ |\\!|\\enspace|\\phantom)/,
    message: `Math starts with space:
math should not be indented. Do not begin math expressions with
LaTeX space commands like ~, \\;, \\quad, or \\phantom`,
}) as Rule;
