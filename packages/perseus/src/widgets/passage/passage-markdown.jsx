/* eslint-disable react/sort-comp */
// @flow
import * as i18n from "@khanacademy/wonder-blocks-i18n";
import PropTypes from "prop-types";
import * as React from "react";
import SimpleMarkdown from "simple-markdown";
import _ from "underscore";

const START_REF_PREFIX = "start-ref-";
const END_REF_PREFIX = "end-ref-";
const REF_STYLE = {
    display: "inline-block",
    width: 0,
    visibility: "hidden",
};

const LABEL_OUTER_STYLE = {
    // for some reason we need these to keep the nbsp from wrapping when the
    // inner circle/square is display: inline-block
    display: "inline",
    whiteSpace: "nowrap",
};

const SQUARE_LABEL_STYLE = {
    display: "inline-block",
    color: "rgb(255, 255, 255)",
    backgroundColor: "rgb(90, 90, 90)",
    paddingLeft: 10,
    paddingRight: 10,
    userSelect: "none",
    WebkitUserSelect: "none",
};

const CIRCLE_LABEL_STYLE = {
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

class RefStart extends React.Component<$FlowFixMe> {
    static propTypes = {
        refContent: PropTypes.node.isRequired,
    };

    render(): React.Node {
        return <span style={REF_STYLE}>{i18n.doNotTranslate("_")}</span>;
    }

    getRefContent = () => {
        return this.props.refContent;
    };
}

class RefEnd extends React.Component<$FlowFixMe> {
    render(): React.Node {
        return <span style={REF_STYLE}>{i18n.doNotTranslate("_")}</span>;
    }
}

const rules: $FlowFixMe = {
    newline: SimpleMarkdown.defaultRules.newline,
    paragraph: SimpleMarkdown.defaultRules.paragraph,
    escape: SimpleMarkdown.defaultRules.escape,
    passageFootnote: {
        order: SimpleMarkdown.defaultRules.escape.order + 0.1,
        match: SimpleMarkdown.inlineRegex(/^\^/),
        parse: (capture, parse, state) => {
            // if no footnotes have been seen, we're id 1. otherwise,
            // we're the next subsequent id
            const id = state.lastFootnote.id + 1;
            const footnote = {
                id: id,
                // our text is what to output. if there is only one footnote,
                // it's a *; otherwise it's a superscript number
                text: id === 1 ? "*" : "" + id,
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
        },
    },
    refStart: {
        order: SimpleMarkdown.defaultRules.escape.order + 0.2,
        match: function (source, state) {
            const capture = /^\{\{/.exec(source);
            if (capture) {
                // We need to do extra processing here to capture the
                // full text of the reference, which we include so that
                // we can use that information as a screenreader
                let closeIndex = 2; // start looking after the opening "{{"
                let refNestingLevel = 0;

                // Find the closing "}}" for our opening "{{"
                while (closeIndex < source.length) {
                    const token = source.slice(closeIndex, closeIndex + 2);
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

                const refText = source.slice(2, closeIndex);

                // A "magic" capture that matches the opening {{
                // but captures the full ref text internally :D
                return [capture[0], refText];
            }
            return null;
        },
        parse: (capture, parse, state) => {
            if (!state.useRefs) {
                return {
                    ref: null,
                    refContent: null,
                };
            }

            const ref = state.lastRef + 1;
            state.lastRef = ref;
            state.currentRef.push(ref);

            const refContent = parse(
                // Curly quotes
                "(\u201C" + capture[1] + "\u201D)\n\n",
                _.defaults(
                    {
                        // We don't want to parse refs while looking through
                        // this refs contents. We definitely don't want
                        // to make those refs into react refs on the
                        // passage, for instance!
                        useRefs: false,
                    },
                    INITIAL_PARSE_STATE,
                ),
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
            const refContent = output(node.refContent, {});
            return (
                <RefStart
                    ref={START_REF_PREFIX + node.ref}
                    key={START_REF_PREFIX + node.ref}
                    refContent={refContent}
                />
            );
        },
    },
    refEnd: {
        order: SimpleMarkdown.defaultRules.escape.order + 0.3,
        match: SimpleMarkdown.inlineRegex(/^\}\}/),
        parse: (capture, parse, state) => {
            if (!state.useRefs) {
                return {
                    ref: null,
                };
            }

            const ref = state.currentRef.pop() || null;
            return {
                ref: ref,
            };
        },
        react: (node, output, state) => {
            if (node.ref != null) {
                return (
                    <RefEnd
                        ref={END_REF_PREFIX + node.ref}
                        key={END_REF_PREFIX + node.ref}
                    />
                );
            }
            // if we didn't have a matching start reference, or
            // we aren't parsing refs for this pass (we do this
            // inside of refContent), don't output a ref
            return null;
        },
    },
    squareLabel: {
        order: SimpleMarkdown.defaultRules.escape.order + 0.4,
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
                    aria-hidden="true"
                >
                    <span style={SQUARE_LABEL_STYLE}>{node.content}</span>
                </span>,
                <span key="alt-text" className="perseus-sr-only">
                    {i18n.$_("[Marker for question %(number)s]", {
                        number: node.content,
                    })}
                </span>,
                node.space ? "\u00A0" : null,
            ];
        },
    },
    circleLabel: {
        order: SimpleMarkdown.defaultRules.escape.order + 0.5,
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
                    aria-hidden={true}
                >
                    <span style={CIRCLE_LABEL_STYLE}>{node.content}</span>
                </span>,
                <span key="alt-text" className="perseus-sr-only">
                    {i18n.$_("[Circle marker %(number)s]", {
                        number: node.content,
                    })}
                </span>,
                node.space ? "\u00A0" : null,
            ];
        },
    },
    squareBracketRef: {
        order: SimpleMarkdown.defaultRules.escape.order + 0.6,
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
                    aria-hidden="true"
                >
                    [{node.content}]
                </span>,
                <span key="alt-text" className="perseus-sr-only">
                    {i18n.$_("[Sentence %(number)s]", {number: node.content})}
                </span>,
                node.space ? "\u00A0" : null,
            ];
        },
    },
    highlight: {
        order: SimpleMarkdown.defaultRules.escape.order + 0.7,
        match: SimpleMarkdown.inlineRegex(
            /^{highlighting.start}(.+?){highlighting.end}/,
        ),
        parse: (capture, parse, state) => {
            return {
                content: capture[1],
            };
        },
        react: (node, output, state) => {
            return [
                <span key={0} className="perseus-highlight">
                    {node.content}
                </span>,
            ];
        },
    },
    reviewHighlight: {
        order: SimpleMarkdown.defaultRules.escape.order + 0.7,
        match: SimpleMarkdown.inlineRegex(
            /^{review-highlighting.start}(.+?){review-highlighting.end}/,
        ),
        parse: (capture, parse, state) => {
            return {
                content: capture[1],
            };
        },
        react: (node, output, state) => {
            return [
                <span key={0} className="perseus-review-highlight">
                    {node.content}
                </span>,
            ];
        },
    },
    strong: SimpleMarkdown.defaultRules.strong,
    u: SimpleMarkdown.defaultRules.u,
    em: SimpleMarkdown.defaultRules.em,
    del: SimpleMarkdown.defaultRules.del,
    text: {
        ...SimpleMarkdown.defaultRules.text,
        react(node, output, state) {
            return <span key={state.key}>{node.content}</span>;
        },
    },
};

const INITIAL_PARSE_STATE = {
    currentRef: [],
    useRefs: true,
    lastRef: 0,
    lastFootnote: {id: 0, text: ""},
};
const builtParser = SimpleMarkdown.parserFor(rules);
const parse: (string, $FlowFixMe) => $FlowFixMe = (source, state) => {
    state = state || {};
    const paragraphedSource = source + "\n\n";
    return builtParser(paragraphedSource, _.extend(state, INITIAL_PARSE_STATE));
};

export default {
    parse: parse,
    output: (SimpleMarkdown.reactFor(
        SimpleMarkdown.ruleOutput(rules, "react"),
    ): $FlowFixMe),
    START_REF_PREFIX: START_REF_PREFIX,
    END_REF_PREFIX: END_REF_PREFIX,
    _rulesForTesting: rules,
};
