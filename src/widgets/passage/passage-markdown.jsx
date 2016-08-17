/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable comma-dangle, no-var, react/jsx-closing-bracket-location, react/jsx-indent-props, react/sort-comp */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

/* globals $_ */
var React = require("react");
var SimpleMarkdown = require("simple-markdown");
var _ = require("underscore");

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

var RefStart = React.createClass({
    propTypes: {
        refContent: React.PropTypes.node.isRequired,
    },

    render: function() {
        return <span style={REF_STYLE}>_</span>;
    },

    getRefContent: function() {
        return this.props.refContent;
    },
});

var RefEnd = React.createClass({
    render: function() {
        return <span style={REF_STYLE}>_</span>;
    },
});

var rules = {
    newline: SimpleMarkdown.defaultRules.newline,
    paragraph: SimpleMarkdown.defaultRules.paragraph,
    escape: SimpleMarkdown.defaultRules.escape,
    passageFootnote: {
        order: SimpleMarkdown.defaultRules.escape.order + .1,
        match: SimpleMarkdown.inlineRegex(/^\^/),
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
        match: function(source, state) {
            var capture = /^\{\{/.exec(source);
            if (capture) {
                // We need to do extra processing here to capture the
                // full text of the reference, which we include so that
                // we can use that information as a screenreader
                var closeIndex = 2; // start looking after the opening "{{"
                var refNestingLevel = 0;

                // Find the closing "}}" for our opening "{{"
                while (closeIndex < source.length) {
                    var token = source.slice(closeIndex, closeIndex + 2);
                    if (token === "{{") {
                        refNestingLevel++;
                        // increment an extra character so we get the
                        // full 2-char token
                        closeIndex++;
                    } else if (token === "}}") {
                        if (refNestingLevel > 0) {
                            refNestingLevel--;
                            // increment an extra character so we get the
                            // full 2-char token
                            closeIndex++;
                        } else {
                            break;
                        }
                    }
                    closeIndex++;
                }

                var refText = source.slice(2, closeIndex);

                // A "magic" capture that matches the opening {{
                // but captures the full ref text internally :D
                return [
                    capture[0],
                    refText
                ];
            } else {
                return null;
            }
        },
        parse: (capture, parse, state) => {
            if (!state.useRefs) {
                return {
                    ref: null,
                    refContent: null,
                };
            }

            var ref = state.lastRef + 1;
            state.lastRef = ref;
            state.currentRef.push(ref);

            var refContent = parse(
                // Curly quotes
                "(\u201C" + capture[1] + "\u201D)\n\n",
                _.defaults({
                    // We don't want to parse refs while looking through
                    // this refs contents. We definitely don't want
                    // to make those refs into react refs on the
                    // passage, for instance!
                    useRefs: false,
                }, INITIAL_PARSE_STATE)
            );

            return {
                ref: ref,
                refContent: refContent,
            };
        },
        react: (node, output, state) => {
            if (node.ref == null) {
                return null;
            }

            // We don't pass state here because this is parsed
            // and output out-of-band. We don't want to affect
            // our state by the double-output here :).
            var refContent = output(node.refContent, {});
            return <RefStart
                ref={START_REF_PREFIX + node.ref}
                key={START_REF_PREFIX + node.ref}
                refContent={refContent} />;
        }
    },
    refEnd: {
        order: SimpleMarkdown.defaultRules.escape.order + .3,
        match: SimpleMarkdown.inlineRegex(/^\}\}/),
        parse: (capture, parse, state) => {
            if (!state.useRefs) {
                return {
                    ref: null,
                };
            }

            var ref = state.currentRef.pop() || null;
            return {
                ref: ref
            };
        },
        react: (node, output, state) => {
            if (node.ref != null) {
                return <RefEnd
                        ref={END_REF_PREFIX + node.ref}
                        key={END_REF_PREFIX + node.ref} />;
            } else {
                // if we didn't have a matching start reference, or
                // we aren't parsing refs for this pass (we do this
                // inside of refContent), don't output a ref
                return null;
            }
        }
    },
    squareLabel: {
        order: SimpleMarkdown.defaultRules.escape.order + .4,
        match: SimpleMarkdown.inlineRegex(/^\[\[(\w+)\]\]( *)/),
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
                    {$_({number: node.content},
                        "[Marker for question %(number)s]")}
                </span>,
                (node.space ? "\u00A0" : null)
            ];
        }
    },
    circleLabel: {
        order: SimpleMarkdown.defaultRules.escape.order + .5,
        match: SimpleMarkdown.inlineRegex(/^\(\((\w+)\)\)( *)/),
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
                    {$_({number: node.content},
                        "[Circle marker %(number)s]")}
                </span>,
                (node.space ? "\u00A0" : null)
            ];
        }
    },
    squareBracketRef: {
        order: SimpleMarkdown.defaultRules.escape.order + .6,
        match: SimpleMarkdown.inlineRegex(/^\[(\d+)\]( *)/),
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
                    {$_({number: node.content},
                        "[Sentence %(number)s]")}
                </span>,
                (node.space ? "\u00A0" : null)
            ];
        }
    },
    highlight: {
        order: SimpleMarkdown.defaultRules.escape.order + .7,
        match: SimpleMarkdown.inlineRegex(
                /^{highlighting.start}(.+?){highlighting.end}/),
        parse: (capture, parse, state) => {
            return {
                content: capture[1],
            };
        },
        react: (node, output, state) => {
            return [
                <span className="perseus-highlight">
                    {node.content}
                </span>,
            ];
        }
    },
    reviewHighlight: {
        order: SimpleMarkdown.defaultRules.escape.order + .7,
        match: SimpleMarkdown.inlineRegex(
                /^{review-highlighting.start}(.+?){review-highlighting.end}/),
        parse: (capture, parse, state) => {
            return {
                content: capture[1],
            };
        },
        react: (node, output, state) => {
            return [
                <span className="perseus-review-highlight">
                    {node.content}
                </span>,
            ];
        }
    },
    strong: SimpleMarkdown.defaultRules.strong,
    u: SimpleMarkdown.defaultRules.u,
    em: SimpleMarkdown.defaultRules.em,
    del: SimpleMarkdown.defaultRules.del,
    text: SimpleMarkdown.defaultRules.text,
};

var INITIAL_PARSE_STATE = {
    currentRef: [],
    useRefs: true,
    lastRef: 0,
    lastFootnote: {id: 0, text: ""}
};
var builtParser = SimpleMarkdown.parserFor(rules);
var parse = (source, state) => {
    state = state || {};
    var paragraphedSource = source + "\n\n";
    return builtParser(
        paragraphedSource,
        _.extend(state, INITIAL_PARSE_STATE)
    );
};

module.exports = {
    parse: parse,
    output: SimpleMarkdown.reactFor(SimpleMarkdown.ruleOutput(rules, "react")),
    START_REF_PREFIX: START_REF_PREFIX,
    END_REF_PREFIX: END_REF_PREFIX,
    _rulesForTesting: rules,
};
