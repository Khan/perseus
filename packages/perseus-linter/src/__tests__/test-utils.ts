import {parse} from "@khanacademy/pure-markdown";

import TreeTransformer from "../tree-transformer";

import type Rule from "../rule";

type CheckReturnType = ReturnType<InstanceType<typeof Rule>["check"]>;

export function testRule(
    rule: Rule,
    markdown: string,
    context,
): CheckReturnType[] | null {
    const tree = parse(markdown);
    const tt = new TreeTransformer(tree);
    const warnings: CheckReturnType[] = [];

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
        if (check) {
            warnings.push(check);
        }
    });

    return warnings.length === 0 ? null : warnings;
}

export function expectWarning(
    rule,
    strings: string | Array<string>,
    context?,
    options?: {
        message?: string;
        severity?: number;
    },
) {
    if (typeof strings === "string") {
        strings = [strings];
    }

    it.each(strings)(`Rule ${rule.name} warns with: %s`, (string) => {
        const result = testRule(rule, string, context);
        expect(result).not.toBeNull();

        if (options?.message) {
            expect(result?.[0]?.message).toBe(options.message);
        }

        if (options?.severity) {
            expect(result?.[0]?.severity).toBe(options.severity);
        }
    });
}

export function expectPass(rule, strings: string | Array<string>, context?) {
    if (typeof strings === "string") {
        strings = [strings];
    }

    it.each(strings)(`Rule ${rule.name} passes with: %s`, (string) => {
        expect(testRule(rule, string, context)).toBeNull();
    });
}
