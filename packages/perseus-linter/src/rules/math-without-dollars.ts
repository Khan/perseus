import Rule from "../rule";

// Because no selector is specified, this rule only applies to text nodes.
// Math and code hold their content directly and do not have text nodes
// beneath them (unlike the HTML DOM) so this rule automatically does not
// apply inside $$ or ``.
export default Rule.makeRule({
    name: "math-without-dollars",
    pattern: /\\\w+{[^}]*}|{|}/,
    lint: Rule.makeLintFunction({
        severity: Rule.Severity.GUIDELINE,
        message: `This looks like LaTeX:
did you mean to put it inside dollar signs?`,
    }),
});
