import Rule from "../rule.js";

module.exports = Rule.makeRule({
    name: "math-align-extra-break",
    selector: "blockMath",
    pattern: /(\\{2,})\s*\\end{align}/,
    message: `Extra space at end of block:
Don't end an align block with backslashes`,
});
