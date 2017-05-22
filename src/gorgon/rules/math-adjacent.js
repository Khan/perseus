import Rule from "../rule.js";

module.exports = Rule.makeRule({
    name: "math-adjacent",
    selector: "blockMath+blockMath",
    message: `Adjacent math blocks:
combine the blocks between \\begin{align} and \\end{align}`,
});
