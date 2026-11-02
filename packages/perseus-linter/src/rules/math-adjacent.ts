import Rule from "../rule";

export default Rule.makeRule({
    name: "math-adjacent",
    severity: Rule.Severity.WARNING,
    selector: "blockMath+blockMath",
    lint: Rule.makeLintFunction({
        message: `Adjacent math blocks:
combine the blocks between \\begin{align} and \\end{align}`,
    }),
});
