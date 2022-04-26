// @flow
import Rule from "../rule.js";

export default (Rule.makeRule({
    name: "unescaped-dollar",
    severity: Rule.Severity.ERROR,
    selector: "unescapedDollar",
    message: `Unescaped dollar sign:
Dollar signs must appear in pairs or be escaped as \\$`,
}): Rule);
