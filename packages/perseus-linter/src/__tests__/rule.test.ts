import * as PureMarkdown from "@khanacademy/pure-markdown";

import {DEFAULT_HELP_LINK} from "../help-links";
import {linterWarning} from "../lint";
import Rule from "../rule";
import TreeTransformer from "../tree-transformer";

import type {
    MakeRuleOptions,
    LinterIssue,
    LintRuleContextObject,
} from "../rule";

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

    const fakeHelpLink = {
        text: "Learn more",
        url: "https://example.com/docs",
    };

    const ruleDescriptions: MakeRuleOptions[] = [
        {
            name: "heading-title-case",
            selector: "heading",
            pattern: /\s[A-Z][a-z]/,
            helpLink: fakeHelpLink,
            lint: Rule.makeLintFunction({
                message: titleCaseMessage,
                severity: Rule.Severity.WARNING,
            }),
        },
        {
            name: "unescaped-dollar",
            selector: "unescapedDollar",
            lint: Rule.makeLintFunction({
                message: unescapedDollarMessage,
                severity: Rule.Severity.WARNING,
            }),
        },
        {
            name: "heading-level-skip",
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
                    return linterWarning(`Skipped heading level:
this heading is level ${currentHeading.level} but
the previous heading was level ${previousHeading.level}`);
                }
                return;
            },
        },
    ];

    // TODO: Add a linter API that runs caller-provided rules on Perseus
    // content (lintPerseusRenderer almost fits, but it uses the globally
    // registered rules), and use it from both lintPerseusRenderer and these
    // tests so the lint rule tests don't need to know about TreeTransformer
    // or Markdown parsing.
    function extractIssues(
        descriptions: ReadonlyArray<MakeRuleOptions>,
        content: string,
    ): LinterIssue[] {
        const rules = descriptions.map((r) => Rule.makeRule(r));
        const basicContext: LintRuleContextObject = {
            content,
            contentType: "exercise",
            stack: [],
            widgets: {},
        };
        const tt = new TreeTransformer(PureMarkdown.parse(content));
        const issues: LinterIssue[] = [];
        tt.traverse((node, state, nodeContent) => {
            rules.forEach((rule) => {
                issues.push(
                    ...rule.check(node, state, nodeContent, basicContext),
                );
            });
        });
        return issues;
    }

    it("check() method", () => {
        const issues = extractIssues(ruleDescriptions, markdown);

        expect(issues).toHaveLength(3);

        expect(issues[0].rule).toEqual(ruleDescriptions[0].name);
        expect(issues[0].message).toEqual(titleCaseMessage);

        expect(issues[1].rule).toEqual(ruleDescriptions[1].name);
        expect(issues[1].message).toEqual(unescapedDollarMessage);

        expect(issues[2].rule).toEqual(ruleDescriptions[2].name);
    });

    describe("helpLink", () => {
        it("is added to every issue a rule reports", () => {
            // Arrange, Act
            const issues = extractIssues(ruleDescriptions, markdown);

            // Assert
            expect(issues.map((issue) => issue.helpLink)).toEqual([
                fakeHelpLink,
                DEFAULT_HELP_LINK,
                DEFAULT_HELP_LINK,
            ]);
        });

        it("uses the default help link when the rule has none", () => {
            // Arrange
            const rulesWithoutHelpLink = ruleDescriptions.filter(
                (r) => !r.helpLink,
            );

            // Act
            const issues = extractIssues(rulesWithoutHelpLink, markdown);

            // Assert
            expect(issues.map((issue) => issue.helpLink)).toEqual([
                DEFAULT_HELP_LINK,
                DEFAULT_HELP_LINK,
            ]);
        });
    });
});
