import PerseusMarkdown from "../perseus-markdown.jsx";

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
    parse: PerseusMarkdown.parse,
    TreeTransformer: require("./tree-transformer.js"),
    Selector: require("./selector.js"),
    Rule: require("./rule.js"),
    rules: require("./rules/all-rules.js"),
};
