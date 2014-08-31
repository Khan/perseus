/** @jsx React.DOM */
var _ = require("underscore");

var SimpleMarkdown = require("../../simple-markdown.jsx");

var START_REF_PREFIX = "start-ref-";
var END_REF_PREFIX = "end-ref-";
var REF_STYLE = {
    display: "inline-block",
    width: 0,
    visibility: "hidden"
};

var rules = _.extend({}, SimpleMarkdown.defaultRules, {
    passageFootnote: {
        regex: /^\^/,
        parse: (capture, parse, state) => {
            // if no footnotes have been seen, we're id 1. otherwise,
            // we're the next subsequent id
            var id = state.lastFootnote.id + 1;
            var footnote = {
                id: id,
                // our text is what to output. if there is only one footnote,
                // it's a *; otherwise it's a superscript number
                text: id === 1 ? "*" : ("" + id)
            };

            // If the previous footnote was a *, we need to adjust it to be
            // a number, since now we know there is more than one footnote
            if (state.lastFootnote.text === "*") {
                state.lastFootnote.text = "" + state.lastFootnote.id;
            }

            // and update our last footnote, + return.
            state.lastFootnote = footnote;
            return footnote;
        },
        output: (node, output) => {
            return <sup>{node.text}</sup>;
        }
    },
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
            return <span
                    ref={START_REF_PREFIX + node.ref}
                    style={REF_STYLE}>
                _
            </span>;
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
                return <span
                        ref={END_REF_PREFIX + node.ref}
                        style={REF_STYLE}>
                    _
                </span>;
            } else {
                // if we didn't have a matching start reference, don't output
                // a ref
                return <span style={REF_STYLE}>
                    _
                </span>;
            }
        }
    }
});

var priorities = [
    "paragraph",
    "escape",
    "passageFootnote",
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
    return builtParser(paragraphedSource, {
        currentRef: [],
        lastRef: 0,
        lastFootnote: {id: 0, text: ""}
    });
};

module.exports = {
    parse: parse,
    output: SimpleMarkdown.outputFor(SimpleMarkdown.ruleOutput(rules)),
    START_REF_PREFIX: START_REF_PREFIX,
    END_REF_PREFIX: END_REF_PREFIX
};
