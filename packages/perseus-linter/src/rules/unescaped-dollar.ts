import Rule from "../rule";

// eslint-disable-next-line no-restricted-syntax
export default Rule.makeRule({
    name: "unescaped-dollar",
    severity: Rule.Severity.ERROR,
    selector: "unescapedDollar",
    message: `Unescaped dollar sign:
Dollar signs must appear in pairs or be escaped as \\$`,
}) as Rule;
