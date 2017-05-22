import assert from "assert";
import PerseusMarkdown from "../../perseus-markdown.jsx";
import TreeTransformer from "../tree-transformer.js";
import Rule from "../rule.js";

describe("Gorgon lint Rules class", () => {
    const markdown = `
## This Heading is in Title Case

This paragraph contains forbidden words. Poop!

This paragraph contains an unescaped $ sign.

#### This heading skipped a level
`;

    const ruleDescriptions = [
        {
            name: "heading-title-case",
            selector: "heading",
            pattern: "\\s[A-Z][a-z]",
            message: `Title case in heading:
Only capitalize the first word of headings.`,
        },
        {
            name: "profanity",
            pattern: "/poop|crap/i",
            message: `Profanity:
this is a family website!`,
        },
        {
            name: "unescaped-dollar",
            selector: "unescapedDollar",
            message: `Unescaped '$':
If writing math, pair with another $.
Otherwise escape it by writing \\$.`,
        },
        {
            name: "heading-level-skip",
            selector: "heading ~ heading",
            lint: function(state, content, nodes) {
                const currentHeading = nodes[1];
                const previousHeading = nodes[0];

                assert.equal(nodes.length, 2);
                assert.equal(nodes[1], state.currentNode());

                // A heading can have a level less than, the same as
                // or one more than the previous heading. But going up
                // by 2 or more levels is not right
                if (currentHeading.level > previousHeading.level + 1) {
                    return `Skipped heading level:
this heading is level ${currentHeading.level} but
the previous heading was level ${previousHeading.level}`;
                } else {
                    return false;
                }
            },
        },
    ];

    let rules = [];

    function parseTree() {
        return PerseusMarkdown.parse(markdown);
    }

    it("makeRules() factory method", () => {
        rules = ruleDescriptions.map(Rule.makeRule);
        assert.equal(rules.length, ruleDescriptions.length);
        rules.forEach(r => assert.ok(r instanceof Rule));
    });

    it("check() method", () => {
        const tree = parseTree();
        const tt = new TreeTransformer(tree);
        const warnings = [];

        tt.traverse((node, state, content) => {
            rules.forEach(r => {
                const lint = r.check(node, state, content);
                if (lint) {
                    warnings.push(lint);
                }
            });
        });

        assert.equal(warnings.length, 4);
        assert.equal(warnings[0].rule, ruleDescriptions[0].name);
        assert.equal(warnings[0].message, ruleDescriptions[0].message);

        assert.equal(warnings[1].rule, ruleDescriptions[1].name);
        assert.equal(warnings[1].message, ruleDescriptions[1].message);
        assert.equal(warnings[1].start, 2);
        assert.equal(warnings[1].end, 6);

        assert.equal(warnings[2].rule, ruleDescriptions[2].name);
        assert.equal(warnings[2].message, ruleDescriptions[2].message);

        assert.equal(warnings[3].rule, ruleDescriptions[3].name);
    });
});
