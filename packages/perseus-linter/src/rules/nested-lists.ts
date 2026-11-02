import Rule from "../rule";

export default Rule.makeRule({
    name: "nested-lists",
    severity: Rule.Severity.WARNING,
    selector: "list list",
    lint: Rule.makeLintFunction({
        message: `Nested lists:
nested lists are hard to read on mobile devices;
do not use additional indentation.`,
    }),
});
