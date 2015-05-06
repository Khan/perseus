var SimpleMarkdown = require("simple-markdown");

var START_REF_PREFIX = "start-ref-";
var END_REF_PREFIX = "end-ref-";
var REF_STYLE = {
    display: "inline-block",
    width: 0,
    visibility: "hidden"
};

var LABEL_OUTER_STYLE = {
    // for some reason we need these to keep the nbsp from wrapping when the
    // inner circle/square is display: inline-block
    display: "inline",
    whiteSpace: "nowrap",
};

var SQUARE_LABEL_STYLE = {
    display: "inline-block",
    color: "rgb(255, 255, 255)",
    backgroundColor: "rgb(90, 90, 90)",
    paddingLeft: 10,
    paddingRight: 10,
    userSelect: "none",
    WebkitUserSelect: "none",
};

var CIRCLE_LABEL_STYLE = {
    display: "inline-block",
    color: "rgb(255, 255, 255)",
    backgroundColor: "rgb(90, 90, 90)",
    userSelect: "none",
    WebkitUserSelect: "none",
    width: 22,
    height: 22,
    borderRadius: "50%",
    textAlign: "center",
};

var rules = {
    newline: SimpleMarkdown.defaultRules.newline,
    paragraph: SimpleMarkdown.defaultRules.paragraph,
    escape: SimpleMarkdown.defaultRules.escape,
    passageFootnote: {
        order: SimpleMarkdown.defaultRules.escape.order + .1,
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
        react: (node, output, state) => {
            return <sup key={state.key}>{node.text}</sup>;
        }
    },
    refStart: {
        order: SimpleMarkdown.defaultRules.escape.order + .2,
        regex: /^\{\{/,
        parse: (capture, parse, state) => {
            var ref = state.lastRef + 1;
            state.lastRef = ref;
            state.currentRef.push(ref);
            return {
                ref: ref
            };
        },
        react: (node, output, state) => {
            return <span
                    ref={START_REF_PREFIX + node.ref}
                    key={START_REF_PREFIX + node.ref}
                    style={REF_STYLE}>
                _
            </span>;
        }
    },
    refEnd: {
        order: SimpleMarkdown.defaultRules.escape.order + .3,
        regex: /^\}\}/,
        parse: (capture, parse, state) => {
            var ref = state.currentRef.pop() || null;
            return {
                ref: ref
            };
        },
        react: (node, output, state) => {
            if (node.ref != null) {
                return <span
                        ref={END_REF_PREFIX + node.ref}
                        key={END_REF_PREFIX + node.ref}
                        style={REF_STYLE}>
                    _
                </span>;
            } else {
                // if we didn't have a matching start reference, don't output
                // a ref
                return <span key={state.key} style={REF_STYLE}>
                    _
                </span>;
            }
        }
    },
    squareLabel: {
        order: SimpleMarkdown.defaultRules.escape.order + .4,
        regex: /^\[\[(\w+)\]\]( *)/,
        parse: (capture, parse, state) => {
            if (!state.firstQuestionRef) {
                state.firstQuestionRef = capture[1];
            }
            return {
                content: capture[1],
                space: capture[2].length > 0,
            };
        },
        react: (node, output, state) => {
            return [
                <span
                        key="visual-square"
                        className="perseus-passage-square-label"
                        style={LABEL_OUTER_STYLE}
                        aria-hidden="true">
                    <span style={SQUARE_LABEL_STYLE}>
                        {node.content}
                    </span>
                </span>,
                <span key="alt-text" className="perseus-sr-only">
                    <$_ number={node.content}>
                        [Marker for question %(number)s]
                    </$_>
                </span>,
                (node.space ? "\u00A0" : null)
            ];
        }
    },
    circleLabel: {
        order: SimpleMarkdown.defaultRules.escape.order + .5,
        regex: /^\(\((\w+)\)\)( *)/,
        parse: (capture, parse, state) => {
            return {
                content: capture[1],
                space: capture[2].length > 0,
            };
        },
        react: (node, output, state) => {
            return [
                <span
                        key="visual-circle"
                        className="perseus-passage-circle-label"
                        style={LABEL_OUTER_STYLE}
                        aria-hidden={true}>
                    <span style={CIRCLE_LABEL_STYLE}>
                        {node.content}
                    </span>
                </span>,
                <span key="alt-text" className="perseus-sr-only">
                    <$_ number={node.content}>
                        [Circle marker %(number)s]
                    </$_>
                </span>,
                (node.space ? "\u00A0" : null)
            ];
        }
    },
    squareBracketRef: {
        order: SimpleMarkdown.defaultRules.escape.order + .6,
        regex: /^\[(\d+)\]( *)/,
        parse: (capture, parse, state) => {
            if (!state.firstSentenceRef) {
                state.firstSentenceRef = capture[1];
            }
            return {
                content: capture[1],
                space: capture[2].length > 0,
            };
        },
        react: (node, output, state) => {
            return [
                <span
                        key="visual-brackets"
                        className="perseus-passage-bracket-label"
                        aria-hidden="true">
                    [{node.content}]
                </span>,
                <span key="alt-text" className="perseus-sr-only">
                    <$_ number={node.content}>
                        [Sentence %(number)s]
                    </$_>
                </span>,
                (node.space ? "\u00A0" : null)
            ];
        }
    },
    strong: SimpleMarkdown.defaultRules.strong,
    u: SimpleMarkdown.defaultRules.u,
    em: SimpleMarkdown.defaultRules.em,
    del: SimpleMarkdown.defaultRules.del,
    text: SimpleMarkdown.defaultRules.text,
};

var builtParser = SimpleMarkdown.parserFor(rules);
var parse = (source, state) => {
    state = state || {};
    var paragraphedSource = source + "\n\n";
    return builtParser(paragraphedSource, _.extend(state, {
        currentRef: [],
        lastRef: 0,
        lastFootnote: {id: 0, text: ""}
    }));
};

module.exports = {
    parse: parse,
    output: SimpleMarkdown.reactFor(SimpleMarkdown.ruleOutput(rules, "react")),
    START_REF_PREFIX: START_REF_PREFIX,
    END_REF_PREFIX: END_REF_PREFIX,
    _rulesForTesting: rules,
};
