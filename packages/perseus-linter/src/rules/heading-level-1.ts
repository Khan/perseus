import Rule from "../rule";

export default Rule.makeRule({
    name: "heading-level-1",
    severity: Rule.Severity.WARNING,
    selector: "heading",
    lint: function (state, content, nodes, match) {
        if (nodes[0].level === 1) {
            return `Don't use level-1 headings:
Begin headings with two or more # characters.`;
        }
    },
}) as Rule;
