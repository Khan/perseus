import Rule from "../rule";

export default Rule.makeRule({
    name: "math-empty",
    severity: Rule.Severity.WARNING,
    selector: "math, blockMath",
    pattern: /^$/,
    message: "Empty math: don't use $$ in your markdown.",
}) as Rule;
