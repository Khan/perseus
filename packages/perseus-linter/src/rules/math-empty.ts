import Rule from "../rule";

export default Rule.makeRule({
    name: "math-empty",
    selector: "math, blockMath",
    pattern: /^$/,
    lint: Rule.makeLintFunction({
        severity: Rule.Severity.WARNING,
        message: "Empty math: don't use $$ in your markdown.",
    }),
});
