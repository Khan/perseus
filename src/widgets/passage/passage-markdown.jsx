/** @jsx React.DOM */
var _ = require("underscore");

var SimpleMarkdown = require("../../simple-markdown.jsx");

var START_REF_PREFIX = "start-ref-";
var END_REF_PREFIX = "end-ref-";

var rules = _.extend({}, SimpleMarkdown.defaultRules, {
    refStart: {
        regex: /^\{\{/,
        parse: (capture, parse, state) => {
            var ref = state.lastRef + 1;
            state.lastRef = ref;
            state.currentRef.push(ref);
            return {
                ref: ref
            };
        },
        output: (node, output) => {
            return <span ref={START_REF_PREFIX + node.ref} />;
        }
    },
    refEnd: {
        regex: /^\}\}/,
        parse: (capture, parse, state) => {
            var ref = state.currentRef.pop() || null;
            return {
                ref: ref
            };
        },
        output: (node, output) => {
            if (node.ref != null) {
                return <span ref={END_REF_PREFIX + node.ref} />;
            } else {
                // if we didn't have a matching start reference, don't output
                // a ref
                return <span />;
            }
        }
    }
});

var priorities = [
    "paragraph",
    "escape",
    "refStart",
    "refEnd",
    "strong",
    "u",
    "em",
    "del",
    "newline",
    "text"
];

var builtParser = SimpleMarkdown.parserFor(rules, priorities);
var parse = (source) => {
    var paragraphedSource = source + "\n\n";
    return builtParser(paragraphedSource, {currentRef: [], lastRef: 0});
};

module.exports = {
    parse: parse,
    output: SimpleMarkdown.outputFor(SimpleMarkdown.ruleOutput(rules)),
    START_REF_PREFIX: START_REF_PREFIX,
    END_REF_PREFIX: END_REF_PREFIX
};
