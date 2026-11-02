import * as PureMarkdown from "@khanacademy/pure-markdown";

import {lintWarning} from "../lint";
import Rule from "../rule";
import TreeTransformer from "../tree-transformer";

import type {MakeRuleOptions, LinterIssue} from "../rule";

describe("PerseusLinter lint Rules class", () => {
    const markdown = `
## This Heading is in Title Case

This paragraph contains an unescaped $ sign.

#### This heading skipped a level
`;

    const titleCaseMessage = `Title case in heading:
Only capitalize the first word of headings.`;
    const unescapedDollarMessage = `Unescaped '$':
If writing math, pair with another $.
Otherwise escape it by writing \\$.`;

    const ruleDescriptions: MakeRuleOptions[] = [
        {
            name: "heading-title-case",
            severity: Rule.Severity.WARNING,
            selector: "heading",
            pattern: /\s[A-Z][a-z]/,
            lint: Rule.makeLintFunction({
                message: titleCaseMessage,
                severity: Rule.Severity.WARNING,
            }),
        },
        {
            name: "unescaped-dollar",
            severity: Rule.Severity.WARNING,
            selector: "unescapedDollar",
            lint: Rule.makeLintFunction({
                message: unescapedDollarMessage,
                severity: Rule.Severity.WARNING,
            }),
        },
        {
            name: "heading-level-skip",
            severity: Rule.Severity.WARNING,
            selector: "heading ~ heading",
            lint: function (state, content, nodes) {
                const currentHeading: any = nodes[1];
                const previousHeading: any = nodes[0];

                expect(nodes).toHaveLength(2);
                expect(nodes[1]).toEqual(state.currentNode());

                // A heading can have a level less than, the same as
                // or one more than the previous heading. But going up
                // by 2 or more levels is not right
                if (currentHeading.level > previousHeading.level + 1) {
                    return lintWarning(`Skipped heading level:
this heading is level ${currentHeading.level} but
the previous heading was level ${previousHeading.level}`);
                }
                return;
            },
        },
    ];

    function parseTree() {
        return PureMarkdown.parse(markdown);
    }

    it("check() method", () => {
        const rules = ruleDescriptions.map((r) => Rule.makeRule(r));
        const tree = parseTree();
        const tt = new TreeTransformer(tree);
        const issues: LinterIssue[] = [];

        tt.traverse((node, state, content) => {
            rules.forEach((r) => {
                const lint = r.check(node, state, content, undefined);
                issues.push(...lint);
            });
        });

        expect(issues).toHaveLength(3);

        expect(issues[0].rule).toEqual(ruleDescriptions[0].name);
        expect(issues[0].message).toEqual(titleCaseMessage);

        expect(issues[1].rule).toEqual(ruleDescriptions[1].name);
        expect(issues[1].message).toEqual(unescapedDollarMessage);

        expect(issues[2].rule).toEqual(ruleDescriptions[2].name);
    });
});
