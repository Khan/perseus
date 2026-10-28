import {parse} from "@khanacademy/pure-markdown";
import invariant from "tiny-invariant";

import TreeTransformer from "../tree-transformer";

import type {LinterWarning} from "../rule";
import type Rule from "../rule";

export function testRule(
    rule: Rule,
    markdown: string,
    context,
): LinterWarning[] | null {
    const tree = parse(markdown);
    const tt = new TreeTransformer(tree);
    const warnings: LinterWarning[] = [];

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
        warnings.push(...check);
    });

    // TODO(benchristel): can we return an empty array here instead of null?
    //  Why not just `return warnings`?
    return warnings.length === 0 ? null : warnings;
}

export function expectWarning(
    rule,
    string: string,
    context?,
    options?: {
        messages?: string[];
        severity?: number;
    },
) {
    const result = testRule(rule, string, context);
    expect(result).not.toBeNull();
    invariant(result != null); // Narrow the type.

    if (options?.messages) {
        const actual = new Set(result.map((warning) => warning.message));
        const expected = new Set(options.messages);
        expect(actual).toEqual(expected);
    }

    if (options?.severity) {
        expect(result?.[0]?.severity).toBe(options.severity);
    }
}

export function expectPass(rule, string: string, context?) {
    expect(testRule(rule, string, context)).toBeNull();
}
