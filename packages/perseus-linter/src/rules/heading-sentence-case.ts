import Rule from "../rule";

// eslint-disable-next-line no-restricted-syntax
export default Rule.makeRule({
    name: "heading-sentence-case",
    severity: Rule.Severity.GUIDELINE,
    selector: "heading",
    pattern: /^\W*[a-z]/, // first letter is lowercase
    message: `First letter is lowercase:
the first letter of a heading should be capitalized.`,
}) as Rule;
