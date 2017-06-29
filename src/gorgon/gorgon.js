import PerseusMarkdown from "../perseus-markdown.jsx";
import TreeTransformer from "./tree-transformer.js";
const allLintRules = require("./rules/all-rules.js");

//
// Run the Gorgon linter over the specified markdown parse tree, and
// return a (possibly empty) array of lint warning objects.  If the
// highlight argument is true, this function also modifies the parse
// tree to add "lint" nodes that can be visually rendered,
// highlighting the problems for the user. The optional rules argument
// is an array of Rule objects specifying which lint rules should be
// applied to this parse tree. When omitted, a default set of rules is used.
//
// TODO: to make this even more general, allow the first argument to be
// a string and run the parser over it in that case? (but ignore highlight
// in that case). This would allow the one function to be used for both
// online linting and batch linting.
//
function runLinter(tree, highlight, rules) {
    rules = rules || allLintRules;
    const warnings = [];
    const tt = new TreeTransformer(tree);

    // The markdown parser often outputs adjacent text nodes. We
    // coalesce them before linting for efficiency and accuracy.
    tt.traverse((node, state, content) => {
        if (TreeTransformer.isTextNode(node)) {
            const next = state.nextSibling();
            if (TreeTransformer.isTextNode(next)) {
                node.content += next.content;
                state.removeNextSibling();
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
    let tableWarnings = [];
    let insideTable = false;

    // Traverse through the nodes of the parse tree. At each node, loop
    // through the array of lint rules and check whether there is a
    // lint violation at that node.
    tt.traverse((node, state, content) => {
        const nodeWarnings = [];
        allLintRules.forEach(rule => {
            const warning = rule.check(node, state, content);
            if (warning) {
                if (warning.start || warning.end) {
                    warning.target = content.substring(
                        warning.start,
                        warning.end
                    );
                }
                // These are not useful anymore because they are
                // relative to this individual node.
                //
                // TODO: When the markdown parser saves the node
                // locations in the source string then we can add
                // these numbers to that one and get and absolute
                // character range that will be useful
                delete warning.start;
                delete warning.end;

                // Add the warning to the list of all lint we've found
                warnings.push(warning);

                // And also to the list of warnings for this node
                nodeWarnings.push(warning);
            }
        });

        // If the node we are currently at is a table, and there was lint
        // inside the table, then we want to add that lint here
        if (node.type === "table") {
            if (tableWarnings.length) {
                nodeWarnings.push(...tableWarnings);
            }

            // We're not in a table anymore, and don't have to remember
            // the warnings for the table
            insideTable = false;
            tableWarnings = [];
        } else if (!insideTable) {
            // Otherwise, if we are not already inside a table, check
            // to see if we've entered one. Because this is a post-order
            // traversal we'll see the table contents before the table itself.
            // Note that once we're inside the table, we don't have to
            // do this check each time... We can just wait until we ascend
            // up to the table, then we'll know we're out of it.
            insideTable = state.ancestors().some(n => n.type === "table");
        }

        // If we are inside a table and there were any warnings on
        // this node, then we need to save the warnings for display
        // on the table itself
        if (insideTable && nodeWarnings.length) {
            tableWarnings.push(...nodeWarnings);
        }

        // If there were any warnings on this node, and if we're highlighting
        // lint, then reparent the node so we can highlight it. Note that
        // a single node can have multiple warnings. If this happends we
        // concatenate the warnings and newline separate them. (The lint.jsx
        // component that displays the warnings may want to convert the
        // newlines into <br> tags.) We also provide a lint rule name
        // so that lint.jsx can link to a document that provides more details
        // on that particular lint rule. If there is more than one warning
        // we only link to the first rule, however.
        //
        // Note that even if we're inside a table, we still reparent the
        // linty node so that it can be highlighted. We just make a note
        // of whether this lint is inside a table or not.
        if (highlight && nodeWarnings.length) {
            state.replace({
                type: "lint",
                content: node,
                message: nodeWarnings.map(w => w.message).join("\n\n"),
                ruleName: nodeWarnings[0].rule,
                insideTable: insideTable,
            });
        }
    });

    return warnings;
}

//
// TODO(davidflanagan):
// Revisit these exports once we've got gorgon integrated into Perseus.
// Do we really need to export all of these things, or can we export a
// smaller set of functionality to enable both bulk linting by tools/gorgon.js
// and online linting?
//
// TODO(davidflanagan): switch from require to import
//
module.exports = {
    runLinter: runLinter,
    parse: PerseusMarkdown.parse,
    TreeTransformer: TreeTransformer,
    Selector: require("./selector.js"),
    Rule: require("./rule.js"),
    rules: allLintRules,
};
