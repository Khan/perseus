import Rule from "../rule";

export default Rule.makeRule({
    name: "unescaped-dollar",
    selector: "unescapedDollar",
    lint: Rule.makeLintFunction({
        severity: Rule.Severity.ERROR,
        message: `Unescaped dollar sign:
Dollar signs must appear in pairs or be escaped as \\$`,
    }),
});
