import Rule from "../rule";

export default Rule.makeRule({
    name: "math-align-extra-break",
    severity: Rule.Severity.WARNING,
    selector: "blockMath",
    pattern: /(\\{2,})\s*\\end{align}/,
    lint: Rule.makeLintFunction({
        severity: Rule.Severity.WARNING,
        message: `Extra space at end of block:
Don't end an align block with backslashes`,
    }),
});
