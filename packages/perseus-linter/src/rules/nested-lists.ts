import Rule from "../rule";

export default Rule.makeRule({
    name: "nested-lists",
    selector: "list list",
    lint: Rule.makeLintFunction({
        severity: Rule.Severity.WARNING,
        message: `Nested lists:
nested lists are hard to read on mobile devices;
do not use additional indentation.`,
    }),
});
