/* eslint-disable react/sort-comp */
import SimpleMarkdown from "@khanacademy/simple-markdown";
import * as React from "react";
import _ from "underscore";

import {usePerseusI18n} from "../../components/i18n-context";

import type {
    Capture,
    Parser,
    SingleASTNode,
    State,
} from "@khanacademy/simple-markdown";

export type ParseState = State & {
    currentRef: number[];
    useRefs: boolean;
    lastRef: number;
    firstSentenceRef: string | null | undefined;
    firstQuestionRef: string | null | undefined;
    lastFootnote: {
        id: number;
        text: string;
    };
};

type OutputFun = any;

type FootnoteType = {
    id: number;
    text: string;
};

type RefStartNode = {
    ref: number | null | undefined;
    refContent: React.ReactNode;
};

type RefEndNode = {
    ref: number | null | undefined;
};

type LabelNode = {
    content: string;
    space: boolean;
};

type HighlightNode = {
    content: string;
};

type Props = {
    refContent: React.ReactNode;
};

function getInitialParseState(): ParseState {
    return {
        currentRef: [],
        useRefs: true,
        lastRef: 0,
        firstSentenceRef: null,
        firstQuestionRef: null,
        lastFootnote: {id: 0, text: ""},
    };
}

class RefStart extends React.Component<Props> {
    render(): React.ReactNode {
        return <span style={REF_STYLE}>_</span>;
    }

    // @ts-expect-error - TS2322 - Type '() => React.ReactNode' is not assignable to type '() => ReactElement<any, string | JSXElementConstructor<any>>'.
    getRefContent: () => React.ReactElement = () => {
        return this.props.refContent;
    };
}

class RefEnd extends React.Component<Record<any, any>> {
    render(): React.ReactNode {
        return <span style={REF_STYLE}>_</span>;
    }
}

const AltText = ({id, number}: {id: string; number: string}) => {
    const {strings} = usePerseusI18n();
    return (
        <span key="alt-text" className="perseus-sr-only">
            {strings[id]({
                number,
            })}
        </span>
    );
};

const rules = {
    newline: SimpleMarkdown.defaultRules.newline,
    paragraph: SimpleMarkdown.defaultRules.paragraph,
    escape: SimpleMarkdown.defaultRules.escape,
    passageFootnote: {
        order: SimpleMarkdown.defaultRules.escape.order + 0.1,
        match: SimpleMarkdown.inlineRegex(/^\^/),
        parse: (
            capture: Capture,
            parse: Parser,
            state: ParseState,
        ): FootnoteType => {
            // if no footnotes have been seen, we're id 1. otherwise,
            // we're the next subsequent id
            const id = state.lastFootnote.id + 1;
            const footnote = {
                id: id,
                // our text is what to output. if there is only one footnote,
                // it's a *; otherwise it's a superscript number
                text: id === 1 ? "*" : "" + id,
            } as const;

            // If the previous footnote was a *, we need to adjust it to be
            // a number, since now we know there is more than one footnote
            if (state.lastFootnote.text === "*") {
                state.lastFootnote.text = "" + state.lastFootnote.id;
            }

            // and update our last footnote, + return.
            state.lastFootnote = footnote;
            return footnote;
        },
        react: (node: FootnoteType, output: OutputFun, state: ParseState) => {
            return <sup key={state.key}>{node.text}</sup>;
        },
    },
    refStart: {
        order: SimpleMarkdown.defaultRules.escape.order + 0.2,
        match: function (source) {
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

                // A "magic" capture that matches the opening {{
                // but captures the full ref text internally :D
                // unfortunately the "magic" makes TypeScript upset,
                // so there's this questionable workaround
                capture[1] = source.slice(2, closeIndex);
                return capture;
            }
            return null;
        },
        parse: (
            capture: Capture,
            parse: Parser,
            state: ParseState,
        ): RefStartNode => {
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
                    getInitialParseState(),
                ),
            );

            return {
                ref: ref,
                refContent: refContent,
            };
        },
        react: (node: RefStartNode, output: OutputFun, state: ParseState) => {
            const ref = node.ref;
            if (ref == null) {
                return null;
            }

            // We don't pass state here because this is parsed
            // and output out-of-band. We don't want to affect
            // our state by the double-output here :).
            const refContent = output(node.refContent, {});

            // note(matthewc) the refs created here become the refs
            // pulled from `this.refs` in passage.jsx
            return (
                <RefStart
                    ref={START_REF_PREFIX + ref}
                    key={START_REF_PREFIX + ref}
                    refContent={refContent}
                />
            );
        },
    },
    refEnd: {
        order: SimpleMarkdown.defaultRules.escape.order + 0.3,
        match: SimpleMarkdown.inlineRegex(/^\}\}/),
        parse: (
            capture: Capture,
            parse: Parser,
            state: ParseState,
        ): RefEndNode => {
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
        react: (node: RefEndNode, output: OutputFun, state: ParseState) => {
            if (node.ref != null) {
                // note(matthewc) the refs created here become the refs
                // pulled from `this.refs` in passage.jsx
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
        parse: (
            capture: Capture,
            parse: Parser,
            state: ParseState,
        ): LabelNode => {
            if (!state.firstQuestionRef) {
                state.firstQuestionRef = capture[1];
            }
            return {
                content: capture[1],
                space: capture[2].length > 0,
            };
        },
        react: (node: LabelNode, output: OutputFun, state: ParseState) => {
            return [
                <span
                    key="visual-square"
                    className="perseus-passage-square-label"
                    style={LABEL_OUTER_STYLE}
                    aria-hidden="true"
                >
                    <span style={SQUARE_LABEL_STYLE}>{node.content}</span>
                </span>,
                <AltText
                    key="alt-text"
                    id="questionMarker"
                    number={node.content}
                />,
                node.space ? "\u00A0" : null,
            ];
        },
    },
    circleLabel: {
        order: SimpleMarkdown.defaultRules.escape.order + 0.5,
        match: SimpleMarkdown.inlineRegex(/^\(\((\w+)\)\)( *)/),
        parse: (
            capture: Capture,
            parse: Parser,
            state: ParseState,
        ): LabelNode => {
            return {
                content: capture[1],
                space: capture[2].length > 0,
            };
        },
        react: (
            node: LabelNode,
            output: OutputFun,
            state: ParseState,
        ): React.ReactElement => {
            // @ts-expect-error - TS2739 - Type '(string | Element | null)[]' is missing the following properties from type 'ReactElement<any, string | JSXElementConstructor<any>>': type, props, key
            return [
                <span
                    key="visual-circle"
                    className="perseus-passage-circle-label"
                    style={LABEL_OUTER_STYLE}
                    aria-hidden={true}
                >
                    <span style={CIRCLE_LABEL_STYLE}>{node.content}</span>
                </span>,
                <AltText
                    key="alt-text"
                    id="circleMarker"
                    number={node.content}
                />,
                node.space ? "\u00A0" : null,
            ];
        },
    },
    squareBracketRef: {
        order: SimpleMarkdown.defaultRules.escape.order + 0.6,
        match: SimpleMarkdown.inlineRegex(/^\[(\d+)\]( *)/),
        parse: (
            capture: Capture,
            parse: Parser,
            state: ParseState,
        ): LabelNode => {
            if (!state.firstSentenceRef) {
                state.firstSentenceRef = capture[1];
            }
            return {
                content: capture[1],
                space: capture[2].length > 0,
            };
        },
        react: (node: LabelNode, output: OutputFun, state: ParseState) => {
            return [
                <span
                    key="visual-brackets"
                    className="perseus-passage-bracket-label"
                    aria-hidden="true"
                >
                    [{node.content}]
                </span>,
                <AltText
                    key="alt-text"
                    id="sentenceMarker"
                    number={node.content}
                />,
                node.space ? "\u00A0" : null,
            ];
        },
    },
    highlight: {
        order: SimpleMarkdown.defaultRules.escape.order + 0.7,
        match: SimpleMarkdown.inlineRegex(
            /^{highlighting.start}(.+?){highlighting.end}/,
        ),
        parse: (
            capture: Capture,
            parse: Parser,
            state: ParseState,
        ): HighlightNode => {
            return {
                content: capture[1],
            };
        },
        react: (node: HighlightNode, output: OutputFun, state: ParseState) => {
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
        parse: (
            capture: Capture,
            parse: Parser,
            state: ParseState,
        ): HighlightNode => {
            return {
                content: capture[1],
            };
        },
        react: (node: HighlightNode, output: OutputFun, state: ParseState) => {
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
        react(node: any, output: any, state: any) {
            return <span key={state.key}>{node.content}</span>;
        },
    },
} as const;

const START_REF_PREFIX = "start-ref-";
const END_REF_PREFIX = "end-ref-";
const REF_STYLE = {
    display: "inline-block",
    width: 0,
    visibility: "hidden",
} as const;

const LABEL_OUTER_STYLE = {
    // for some reason we need these to keep the nbsp from wrapping when the
    // inner circle/square is display: inline-block
    display: "inline",
    whiteSpace: "nowrap",
} as const;

const SQUARE_LABEL_STYLE = {
    display: "inline-block",
    color: "rgb(255, 255, 255)",
    backgroundColor: "rgb(90, 90, 90)",
    paddingLeft: 10,
    paddingRight: 10,
    userSelect: "none",
    WebkitUserSelect: "none",
} as const;

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
} as const;

const builtParser = SimpleMarkdown.parserFor(rules);
const parse: (
    arg1: string,
    arg2?: ParseState | null | undefined,
) => Array<SingleASTNode> = (source, state) => {
    // @ts-expect-error - TS2322 - Type 'ParseState | {}' is not assignable to type 'ParseState | null | undefined'.
    state = state || {};
    const paragraphedSource = source + "\n\n";
    return builtParser(
        paragraphedSource,
        _.extend(state, getInitialParseState()),
    );
};

// @ts-expect-error - TS2322 - Type 'ReactOutput' is not assignable to type '(arg1: SingleASTNode[]) => ReactElement<any, string | JSXElementConstructor<any>>'.
const output: (arg1: Array<SingleASTNode>) => React.ReactElement =
    SimpleMarkdown.reactFor(SimpleMarkdown.ruleOutput(rules, "react"));

export default {
    parse,
    output,
    START_REF_PREFIX,
    END_REF_PREFIX,
    getInitialParseState,
};
