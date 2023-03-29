import Rule from "../rule";

// Because no selector is specified, this rule only applies to text nodes.
// Math and code hold their content directly and do not have text nodes
// beneath them (unlike the HTML DOM) so this rule automatically does not
// apply inside $$ or ``.
export default Rule.makeRule({
    name: "unbalanced-code-delimiters",
    severity: Rule.Severity.ERROR,
    pattern: /[`~]+/,
    message: `Unbalanced code delimiters:
code blocks should begin and end with the same type and number of delimiters`,
}) as Rule;
