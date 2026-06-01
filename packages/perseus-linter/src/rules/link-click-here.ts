import Rule from "../rule";

// eslint-disable-next-line no-restricted-syntax
export default Rule.makeRule({
    name: "link-click-here",
    severity: Rule.Severity.WARNING,
    selector: "link",
    pattern: /click here/i,
    message: `Inappropriate link text:
Do not use the words "click here" in links.`,
}) as Rule;
