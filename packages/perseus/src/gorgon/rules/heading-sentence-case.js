// @flow
import Rule from "../rule.js";

export default (Rule.makeRule({
    name: "heading-sentence-case",
    severity: Rule.Severity.GUIDELINE,
    selector: "heading",
    pattern: /^\W*[a-z]/, // first letter is lowercase
    message: `First letter is lowercase:
the first letter of a heading should be capitalized.`,
}): Rule);
