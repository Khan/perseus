import {allRules} from "./rules/all-rules";
import TreeTransformer from "./tree-transformer";

import type Rule from "./rule";
import type {LinterIssue} from "./rule";
import type {TreeNode} from "./tree-transformer";

/**
 * Run the Perseus linter over the specified markdown parse tree, with the
 * specified context object, and return a (possibly empty) array of lint
 * warning objects.  If the highlight argument is true, this function also
 * modifies the parse tree to add "lint" nodes that can be visually rendered,
 * highlighting the problems for the user. The optional rules argument is an
 * array of Rule objects specifying which lint rules should be applied to this
 * parse tree. When omitted, a default set of rules is used.
 *
 * The context object may have additional properties that some lint rules
 * require:
 *
 *   context.content is the source content string that was parsed to create
 *   the parse tree.
 *
 *   context.widgets is the widgets object associated
 *   with the content string
 */
export function runLinter(
    tree: any,
    context: any,
    highlight: boolean,
    rules: ReadonlyArray<Rule> = allRules,
): ReadonlyArray<LinterIssue> {
    const issues: Array<LinterIssue> = [];
    const tt = new TreeTransformer(tree);

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

    // HTML tables are complicated, and the CSS we use in
    // ../components/lint.jsx to display lint does not work to
    // correctly position the lint indicators in the margin when the
    // lint is inside a table. So as a workaround we keep track of all
    // the lint that appears within a table and move it up to the
    // table element itself.
    //
    // It is not ideal to have to do this here,
    // but it is cleaner here than fixing up the lint during rendering
    // in perseus-markdown.jsx. If our lint display was simpler and
    // did not require indicators in the margin, this wouldn't be a
    // problem. Or, if we modified the lint display stuff so that
    // indicator positioning and tooltip display were both handled
    // with JavaScript (instead of pure CSS), then we could avoid this
    // issue too. But using JavaScript has its own downsides: there is
    // risk that the linter JavaScript would interfere with
    // widget-related Javascript.
    let tableIssues: LinterIssue[] = [];
    let insideTable = false;

    // Traverse through the nodes of the parse tree. At each node, loop
    // through the array of lint rules and check whether there is a
    // lint violation at that node.
    tt.traverse((node, state, content) => {
        const nodeIssues: LinterIssue[] = [];

        // If our rule is only designed to be tested against a particular
        // content type and we're not in that content type, we don't need to
        // consider that rule.
        const applicableRules = rules.filter((r) => r.applies(context));

        // Generate a stack so we can identify our position in the tree in
        // lint rules
        const stack = [...context.stack];
        stack.push(node.type);

        const nodeContext = {
            ...context,
            stack: stack.join("."),
        } as const;

        applicableRules.forEach((rule) => {
            const ruleIssues = rule.check(node, state, content, nodeContext);
            for (const issue of ruleIssues) {
                // The start and end locations are relative to this
                // particular node, and so are not generally very useful.
                // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                if (issue.start || issue.end) {
                    issue.target = content.substring(issue.start, issue.end);
                }

                // Add the issue to the list of all lint we've found
                issues.push(issue);

                // If we're going to be highlighting lint, then we also
                // need to keep track of issues specific to this node.
                if (highlight) {
                    nodeIssues.push(issue);
                }
            }
        });

        // If we're not highlighting lint in the tree, then we're done
        // traversing this node.
        if (!highlight) {
            return;
        }

        // If the node we are currently at is a table, and there was lint
        // inside the table, then we want to add that lint here
        if (node.type === "table") {
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            if (tableIssues.length) {
                nodeIssues.push(...tableIssues);
            }

            // We're not in a table anymore, and don't have to remember
            // the issues for the table
            insideTable = false;
            tableIssues = [];
        } else if (!insideTable) {
            // Otherwise, if we are not already inside a table, check
            // to see if we've entered one. Because this is a post-order
            // traversal we'll see the table contents before the table itself.
            // Note that once we're inside the table, we don't have to
            // do this check each time... We can just wait until we ascend
            // up to the table, then we'll know we're out of it.
            insideTable = state.ancestors().some((n) => n.type === "table");
        }

        // If we are inside a table and there were any issues on
        // this node, then we need to save the issues for display
        // on the table itself
        if (insideTable && nodeIssues.length > 0) {
            tableIssues.push(...nodeIssues);
        }

        // If there were any issues on this node, and if we're highlighting
        // lint, then reparent the node so we can highlight it. Note that
        // a single node can have multiple issues. If this happends we
        // concatenate the issues and newline separate them. (The lint.jsx
        // component that displays the issues may want to convert the
        // newlines into <br> tags.) We also provide a lint rule name
        // so that lint.jsx can link to a document that provides more details
        // on that particular lint rule. If there is more than one issue
        // we only link to the first rule, however.
        //
        // Note that even if we're inside a table, we still reparent the
        // linty node so that it can be highlighted. We just make a note
        // of whether this lint is inside a table or not.
        if (nodeIssues.length > 0) {
            nodeIssues.sort((a, b) => {
                return a.severity - b.severity;
            });

            if (node.type !== "text" || nodeIssues.length > 1) {
                // If the linty node is not a text node, or if there is more
                // than one issue on a text node, then reparent the entire
                // node under a new lint node and put the issues there.
                state.replace({
                    type: "lint",
                    content: node,
                    message: nodeIssues.map((w) => w.message).join("\n\n"),
                    ruleName: nodeIssues[0].rule,
                    blockHighlight: nodeContext.blockHighlight,
                    insideTable: insideTable,
                    severity: nodeIssues[0].severity,
                });
            } else {
                //
                // Otherwise, it is a single issue on a text node, and we
                // only want to highlight the actual linty part of that string
                // of text. So we want to replace the text node with (in the
                // general case) three nodes:
                //
                // 1) A new text node that holds the non-linty prefix
                //
                // 2) A lint node that is the parent of a new text node
                // that holds the linty part
                //
                // 3) A new text node that holds the non-linty suffix
                //
                // If the lint begins and/or ends at the boundaries of the
                // original text node, then nodes 1 and/or 3 won't exist, of
                // course.
                //
                // Note that we could generalize this to work with multple
                // issues on a text node as long as the issues are
                // non-overlapping. Hopefully, though, multiple issues in a
                // single text node will be rare in practice. Also, we don't
                // have a good way to display multiple lint indicators on a
                // single line, so keeping them combined in that case might
                // be the best thing, anyway.
                //
                const content = node.content; // Text nodes have content
                const issue = nodeIssues[0]; // There is only one issue.
                // These are the lint boundaries within the content
                const start = issue.start;
                const end = issue.end;
                const prefix = content.substring(0, start);
                const lint = content.substring(start, end);
                const suffix = content.substring(end);
                const replacements: TreeNode[] = []; // What we'll replace the node with

                // The prefix text node, if there is one
                if (prefix) {
                    replacements.push({
                        type: "text",
                        content: prefix,
                    });
                }

                // The lint node wrapped around the linty text
                replacements.push({
                    type: "lint",
                    content: {
                        type: "text",
                        content: lint,
                    },
                    message: issue.message,
                    ruleName: issue.rule,
                    insideTable: insideTable,
                    severity: issue.severity,
                });

                // The suffix node, if there is one
                if (suffix) {
                    replacements.push({
                        type: "text",
                        content: suffix,
                    });
                }

                // Now replace the lint text node with the one to three
                // nodes in the replacement array
                state.replace(...replacements);
            }
        }
    });

    return issues;
}
