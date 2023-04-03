import Rule from "../rule";

export default Rule.makeRule({
    name: "math-font-size",
    severity: Rule.Severity.GUIDELINE,
    selector: "math, blockMath",
    pattern:
        /\\(tiny|Tiny|small|large|Large|LARGE|huge|Huge|scriptsize|normalsize)\s*{/,
    message: `Math font size:
Don't change the default font size with \\Large{} or similar commands`,
}) as Rule;
