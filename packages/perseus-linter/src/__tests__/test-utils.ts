import {parse} from "@khanacademy/pure-markdown";

import TreeTransformer from "../tree-transformer";

type Rule = any;

export function testRule(
    rule: Rule,
    markdown: string,
    context,
): {message: string}[] | null {
    const tree = parse(markdown);
    const tt = new TreeTransformer(tree);
    const warnings = [];

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
            // @ts-expect-error - TS2345 - Argument of type 'any' is not assignable to parameter of type 'never'.
            warnings.push(check);
        }
    });

    return warnings.length === 0 ? null : warnings;
}

export function expectWarning(rule, strings: string | Array<string>, context?) {
    if (typeof strings === "string") {
        strings = [strings];
    }

    it(`Rule ${rule.name} warns`, () => {
        for (const string of strings) {
            expect(testRule(rule, string, context) !== null).toBeTruthy();
        }
    });
}

export function expectPass(rule, strings: string | Array<string>, context?) {
    if (typeof strings === "string") {
        strings = [strings];
    }

    it(`Rule ${rule.name} passes`, () => {
        for (const string of strings) {
            expect(testRule(rule, string, context) === null).toBeTruthy();
        }
    });
}
