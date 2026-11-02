import Rule from "../rule";

export default Rule.makeRule({
    name: "math-empty",
    severity: Rule.Severity.WARNING,
    selector: "math, blockMath",
    pattern: /^$/,
    lint: Rule.makeLintFunction({
        message: "Empty math: don't use $$ in your markdown.",
    }),
});
