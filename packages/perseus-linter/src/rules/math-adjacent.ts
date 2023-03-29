import Rule from "../rule";

export default Rule.makeRule({
    name: "math-adjacent",
    severity: Rule.Severity.WARNING,
    selector: "blockMath+blockMath",
    message: `Adjacent math blocks:
combine the blocks between \\begin{align} and \\end{align}`,
}) as Rule;
