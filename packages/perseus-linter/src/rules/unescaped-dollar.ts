import Rule from "../rule";

export default Rule.makeRule({
    name: "unescaped-dollar",
    severity: Rule.Severity.ERROR,
    selector: "unescapedDollar",
    message: `Unescaped dollar sign:
Dollar signs must appear in pairs or be escaped as \\$`,
}) as Rule;
