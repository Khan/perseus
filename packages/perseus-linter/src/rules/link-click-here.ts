import Rule from "../rule";

export default Rule.makeRule({
    name: "link-click-here",
    selector: "link",
    pattern: /click here/i,
    lint: Rule.makeLintFunction({
        severity: Rule.Severity.WARNING,
        message: `Inappropriate link text:
Do not use the words "click here" in links.`,
    }),
});
