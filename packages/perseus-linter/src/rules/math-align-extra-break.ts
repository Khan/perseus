import Rule from "../rule";

export default Rule.makeRule({
    name: "math-align-extra-break",
    severity: Rule.Severity.WARNING,
    selector: "blockMath",
    pattern: /(\\{2,})\s*\\end{align}/,
    message: `Extra space at end of block:
Don't end an align block with backslashes`,
}) as Rule;
