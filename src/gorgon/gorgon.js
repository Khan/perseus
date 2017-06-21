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

        // If there were any warnings on this node, and if we're highlighting
        // lint, then reparent the node so we can highlight it. Note that
        // a single node can have multiple warnings. If this happends we
        // concatenate the warnings and newline separate them. (The lint.jsx
        // component that displays the warnings may want to convert the
        // newlines into <br> tags.) We also provide a lint rule name
        // so that lint.jsx can link to a document that provides more details
        // on that particular lint rule. If there is more than one warning
        // we only link to the first rule, however.
        if (highlight && nodeWarnings.length) {
            state.replace({
                type: "lint",
                content: node,
                message: nodeWarnings.map(w => w.message).join("\n\n"),
                ruleName: nodeWarnings[0].rule,
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
