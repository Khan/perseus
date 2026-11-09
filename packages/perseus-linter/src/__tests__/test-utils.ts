import {parse} from "@khanacademy/pure-markdown";

import TreeTransformer from "../tree-transformer";

import type {LinterIssue} from "../rule";
import type Rule from "../rule";

function testRule(rule: Rule, markdown: string, context): LinterIssue[] {
    const tree = parse(markdown);
    const tt = new TreeTransformer(tree);
    const issues: LinterIssue[] = [];

    // The markdown parser often outputs adjacent text nodes. We
    // coalesce them before linting for efficiency and accuracy.
    tt.traverse((node, state, content) => {
        if (TreeTransformer.isTextNode(node)) {
            let next = state.nextSibling();
            while (TreeTransformer.isTextNode(next)) {
                // @ts-expect-error - TS2339 - Property 'content' does not exist on type 'TreeNode'. | TS2533 - Object is possibly 'null' or 'undefined'. | TS2339 - Property 'content' does not exist on type 'TreeNode'.
                node.content += next.content;
                state.removeNextSibling();
                next = state.nextSibling();
            }
        }
    });

    if (context) {
        context.content = markdown;
    } else {
        context = {
            content: markdown,
            widgets: {},
        };
    }
    tt.traverse((node, state, content) => {
        const check = rule.check(node, state, content, context);
        issues.push(...check);
    });

    return issues;
}

export function expectIssue(
    rule,
    string: string,
    context?,
    options?: {
        messages?: string[];
        severity?: number;
    },
) {
    const result = testRule(rule, string, context);

    if (options?.messages) {
        const actual = new Set(result.map((issue) => issue.message));
        const expected = new Set(options.messages);
        expect(actual).toEqual(expected);
    }

    if (options?.severity) {
        expect(result[0]?.severity).toBe(options.severity);
    }
}

export function expectPass(rule, string: string, context?) {
    expect(testRule(rule, string, context)).toEqual([]);
}
