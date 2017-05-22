import Rule from "../rule.js";

module.exports = Rule.makeRule({
    name: "unescaped-dollar",
    selector: "unescapedDollar",
    message: `Unescaped dollar sign:
Dollar signs must appear in pairs or be escaped as \\$`,
});
