import Rule from "../rule.js";

module.exports = Rule.makeRule({
    name: "heading-level-1",
    selector: "heading",
    lint: function(state, content, nodes, match) {
        if (nodes[0].level === 1) {
            return `Don't use level-1 headings:
Begin headings with two or more # characers.`;
        }
    },
});
