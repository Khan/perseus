/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import {linterContextDefault} from "@khanacademy/perseus-linter";
import {StyleSheet, css} from "aphrodite";
import $ from "jquery";
import * as React from "react";
import * as ReactDOM from "react-dom";
import _ from "underscore";

import HighlightableContent from "../../components/highlighting/highlightable-content";
import {PerseusI18nContext} from "../../components/i18n-context";
import {getDependencies} from "../../dependencies";
import Renderer from "../../renderer";
import {getPromptJSON as _getPromptJSON} from "../../widget-ai-utils/passage/passage-ai-utils";

import PassageMarkdown from "./passage-markdown";
import {isPassageWidget} from "./utils";

import type {ParseState} from "./passage-markdown";
import type {SerializedHighlightSet} from "../../components/highlighting/types";
import type {WidgetExports, WidgetProps, Widget} from "../../types";
import type {PassagePromptJSON} from "../../widget-ai-utils/passage/passage-ai-utils";
import type {
    PerseusPassageWidgetOptions,
    PerseusWidget,
} from "@khanacademy/perseus-core";
import type {SingleASTNode} from "@khanacademy/simple-markdown";

// A fake paragraph to measure the line height of the passage,
// so we can adapt to browser zoom
export class LineHeightMeasurer extends React.Component<Record<any, any>> {
    _line: HTMLDivElement | null | undefined;

    measureLineHeight(): number {
        if (!this._line) {
            return 0;
        }

        return this._line.clientHeight;
    }

    render(): React.ReactNode {
        return (
            <div className={css(styles.measurer)} aria-hidden="true">
                <div ref={(ref) => (this._line = ref)} className="paragraph">
                    Line Height Measurement
                </div>
            </div>
        );
    }
}

const styles = StyleSheet.create({
    measurer: {
        position: "absolute",
        top: 0,
        left: 0,
        visibility: "hidden",
        // keep from blocking text selection
        zIndex: -1,
    },
});

type FindWidgetsCallback = (id: string, widgetInfo: PerseusWidget) => boolean;

type PassageProps = WidgetProps<PerseusPassageWidgetOptions> & {
    findWidgets: (arg1: FindWidgetsCallback) => ReadonlyArray<Passage>;
};

type DefaultPassageProps = {
    passageTitle: PassageProps["passageTitle"];
    passageText: PassageProps["passageText"];
    footnotes: PassageProps["footnotes"];
    showLineNumbers: PassageProps["showLineNumbers"];
    linterContext: PassageProps["linterContext"];
};

type PassageState = {
    nLines: number | null | undefined;
    startLineNumbersAfter: number;
    stylesAreApplied: boolean;
    highlights: SerializedHighlightSet;
};

// Information about a passage reference, used in inter-widgets.
export type Reference = {
    startLine: number;
    endLine: number;
    content: string | null | undefined;
};

export class Passage
    extends React.Component<PassageProps, PassageState>
    implements Widget
{
    static contextType = PerseusI18nContext;
    declare context: React.ContextType<typeof PerseusI18nContext>;

    _contentRef: HTMLDivElement | null | undefined;
    _lineHeightMeasurerRef: LineHeightMeasurer | null | undefined;
    // @ts-expect-error - TS2564 - Property '_onResize' has no initializer and is not definitely assigned in the constructor.
    _onResize: () => Record<any, any>;
    // @ts-expect-error - TS2564 - Property '_stylesAppiedTimer' has no initializer and is not definitely assigned in the constructor.
    _stylesAppiedTimer: number;

    static defaultProps: DefaultPassageProps = {
        passageTitle: "",
        passageText: "",
        footnotes: "",
        showLineNumbers: true,
        linterContext: linterContextDefault,
    };

    // this just helps with TS weak typing when a Widget
    // doesn't implement any Widget methods
    isWidget = true as const;

    state: PassageState = {
        nLines: null,
        startLineNumbersAfter: 0,
        stylesAreApplied: false,
        highlights: {},
    };

    componentDidMount() {
        this._updateState();

        // @ts-expect-error - TS2322 - Type '(() => void) & Cancelable' is not assignable to type '() => Record<any, any>'.
        this._onResize = _.throttle(() => {
            // If we're rendering JIPT text, we won't have line numbers or a
            // line height measurer, so skip handling this resize.
            if (this.shouldRenderJipt()) {
                return;
            }

            // Remeasure the line height on resize, because the only line
            // height changes we expect are subpixel changes when the user
            // zooms in/out, and the only way to listen for zoom events is to
            // listen for resize events.
            this._lineHeightMeasurerRef?.measureLineHeight();
            this._updateState();
        }, 500);
        window.addEventListener("resize", this._onResize);

        // Wait for Aphrodite styles (which are guaranteed to apply after one
        // tick), then set state.
        //
        // This flag is used to set the `enabled` prop of the
        // `HighlightableContent` component. That way, we only show highlights
        // once styles are ready, and they're measured with the correct
        // position.
        //
        // HACK(mdr): It's not really the Passage's Aphrodite styles that are
        //     causing bad measures, but more so the Khan Academy Test Prep
        //     app's Aphrodite styles. We would ideally instead offer the
        //     embedding application an API to signal that the app's layout has
        //     changed in a way that affects the Renderer... but, for now, just
        //     hardcode this hack into here.
        // TODO(somewhatabstract): Use WB timing
        // eslint-disable-next-line no-restricted-syntax
        this._stylesAppiedTimer = window.setTimeout(() => {
            this.setState({stylesAreApplied: true});
        }, 0);
    }

    shouldComponentUpdate(
        nextProps: PassageProps,
        nextState: PassageState,
    ): any | boolean {
        return (
            !_.isEqual(this.props, nextProps) ||
            !_.isEqual(this.state, nextState)
        );
    }

    componentDidUpdate() {
        this._updateState();
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this._onResize);
        // eslint-disable-next-line no-restricted-syntax
        clearTimeout(this._stylesAppiedTimer);
    }

    _handleSerializedHighlightsUpdate: (
        serializedHighlights: SerializedHighlightSet,
    ) => void = (serializedHighlights: SerializedHighlightSet) => {
        this.setState({highlights: serializedHighlights});
    };

    /**
     * Line numbering
     *
     * These functions support passage line numbering, which is non-trivial
     * because we manually measure lines to support resizing as well as
     * continuing line numbers from previous passages.
     */

    _updateState() {
        // If we're rendering JIPT text, we're not rendering line numbers so we
        // don't need to update this state.
        if (this.shouldRenderJipt()) {
            return;
        }

        this.setState({
            nLines: this._measureLines(),
            startLineNumbersAfter: this._getInitialLineNumber(),
        });
    }

    _measureLines(): number {
        const renderer = ReactDOM.findDOMNode(this._contentRef);
        // @ts-expect-error - TS2769 - No overload matches this call. | TS2339 - Property 'height' does not exist on type 'JQueryStatic'.
        const contentsHeight: number = $(renderer).height();
        const lineHeight = this._getLineHeight();
        const nLines = Math.round(contentsHeight / lineHeight);
        return nLines;
    }

    _getInitialLineNumber(): number {
        let isPassageBeforeThisPassage = true;
        const passagesBeforeUs = this.props
            .findWidgets((id, widgetInfo) => {
                if (widgetInfo.type !== "passage") {
                    return false;
                }
                if (id === this.props.widgetId) {
                    isPassageBeforeThisPassage = false;
                }
                return isPassageBeforeThisPassage;
            })
            .filter(isPassageWidget);

        return passagesBeforeUs
            .map((passageWidget) => {
                return passageWidget.getLineCount();
            })
            .reduce((a, b) => a + b, 0);
    }

    _getLineHeight(): number {
        return this._lineHeightMeasurerRef?.measureLineHeight() || 0;
    }

    getLineCount(): number {
        if (this.state.nLines != null) {
            return this.state.nLines;
        }
        return this._measureLines();
    }

    /**
     * Passage refs
     *
     * These are functions to support the passage refs inter-widgets feature
     * where other widgets can fetch the line numbers of a reference inside of
     * a passage.
     *
     * todo(matthewc): The refs are created by PassageMarkdown's refStart and refEnd,
     * somehow bubbling up to Passage's `this.refs`. This runs against
     * current best practices for refs by using string refs, but also
     * by breaking our expectation of explicit data flow.
     */

    _getStartRefLineNumber(referenceNumber: number): number | null | undefined {
        const refRef = PassageMarkdown.START_REF_PREFIX + referenceNumber;
        const ref = this.refs[refRef];
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (!ref) {
            return null;
        }

        // @ts-expect-error - TS2769 - No overload matches this call.
        const $ref = $(ReactDOM.findDOMNode(ref));
        // We really care about the first text after the ref, not the
        // ref element itself:
        // @ts-expect-error - TS2339 - Property 'next' does not exist on type 'JQueryStatic'.
        let $refText = $ref.next();
        if ($refText.length === 0) {
            // But if there are no elements after the ref, just
            // use the ref itself.
            $refText = $ref;
        }
        const vPos = $refText.offset().top;

        return (
            this.state.startLineNumbersAfter +
            1 +
            this._convertPosToLineNumber(vPos)
        );
    }

    _getEndRefLineNumber(referenceNumber: number): number | null | undefined {
        const refRef = PassageMarkdown.END_REF_PREFIX + referenceNumber;
        const ref = this.refs[refRef];
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (!ref) {
            return null;
        }

        // @ts-expect-error - TS2769 - No overload matches this call.
        const $ref = $(ReactDOM.findDOMNode(ref));
        // We really care about the last text before the ref, not the
        // ref element itself:
        // @ts-expect-error - TS2339 - Property 'prev' does not exist on type 'JQueryStatic'.
        let $refText = $ref.prev();
        if ($refText.length === 0) {
            // But if there are no elements before the ref, just
            // use the ref itself.
            $refText = $ref;
        }
        const height: number = $refText.height();
        const vPos: number = $refText.offset().top;

        let line = this._convertPosToLineNumber(vPos + height);
        if (height === 0) {
            // If the element before the end ref span was the start
            // ref span, it might have 0 height. This is obviously not
            // the intended use case, but we should handle it gracefully.
            // If this is the case, then the "bottom" of our element is
            // actually the top of the line we're on, so we need to add
            // one to the line number.
            line += 1;
        }

        return this.state.startLineNumbersAfter + line;
    }

    _convertPosToLineNumber(absoluteVPos: number): number {
        const content = ReactDOM.findDOMNode(this._contentRef);
        // @ts-expect-error - TS2769 - No overload matches this call. | TS2339 - Property 'offset' does not exist on type 'JQueryStatic'.
        const relativeVPos = absoluteVPos - $(content).offset().top;
        const lineHeight = this._getLineHeight();

        const line = Math.round(relativeVPos / lineHeight);
        return line;
    }

    _getRefContent(referenceNumber: number): string | null | undefined {
        const refRef = PassageMarkdown.START_REF_PREFIX + referenceNumber;
        const ref = this.refs[refRef];
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (!ref) {
            return null;
        }
        // @ts-expect-error - TS2339 - Property 'getRefContent' does not exist on type 'ReactInstance'.
        return ref.getRefContent();
    }

    getReference(referenceNumber: number): Reference | null | undefined {
        const refStartLine = this._getStartRefLineNumber(referenceNumber);
        const refEndLine = this._getEndRefLineNumber(referenceNumber);
        if (refStartLine == null || refEndLine == null) {
            return null;
        }
        const refContent = this._getRefContent(referenceNumber);

        return {
            startLine: refStartLine,
            endLine: refEndLine,
            content: refContent,
        };
    }

    getPromptJSON(): PassagePromptJSON {
        return _getPromptJSON(this.props);
    }

    /**
     * Rendering
     *
     * Functions to render the passage widget.
     */

    _renderInstructions(parseState: ParseState): React.ReactElement<any> {
        const firstQuestionNumber = parseState.firstQuestionRef;
        const firstSentenceRef = parseState.firstSentenceRef;
        const {strings} = this.context;

        let instructions = "";
        if (firstQuestionNumber) {
            instructions += strings.symbolPassage({
                questionSymbol: "[[" + firstQuestionNumber + "]]",
                questionNumber: firstQuestionNumber,
            });
        }
        if (firstSentenceRef) {
            instructions += strings.symbolQuestion({
                sentenceSymbol: "[" + firstSentenceRef + "]",
            });
        }
        const parsedInstructions = PassageMarkdown.parse(instructions);
        return (
            <div className="perseus-widget-passage-instructions">
                {PassageMarkdown.output(parsedInstructions)}
            </div>
        );
    }

    shouldRenderJipt(): boolean {
        // Mostly copied from `renderer.jsx`. If we're doing JIPT, we want to
        // render our content differently.
        const {JIPT} = getDependencies();
        return JIPT.useJIPT && this.props.passageText.indexOf("crwdns") !== -1;
    }

    _renderContent(parsed: Array<SingleASTNode>): React.ReactElement<any> {
        // Wait until Aphrodite styles are applied before enabling highlights,
        // so that we measure the correct positions.
        const enabled = this.state.stylesAreApplied;

        // Highlights are read-only in review mode.
        const editable = !this.props.reviewMode;
        return (
            <HighlightableContent
                editable={editable}
                enabled={enabled}
                onSerializedHighlightsUpdate={
                    this._handleSerializedHighlightsUpdate
                }
                serializedHighlights={this.state.highlights}
            >
                <div ref={(ref) => (this._contentRef = ref)}>
                    <LineHeightMeasurer
                        ref={(ref) => (this._lineHeightMeasurerRef = ref)}
                    />
                    {PassageMarkdown.output(parsed)}
                </div>
            </HighlightableContent>
        );
    }

    _hasFootnotes(): boolean {
        const rawContent = this.props.footnotes;
        const isEmpty = /^\s*$/.test(rawContent);
        return !isEmpty;
    }

    _renderFootnotes(): React.ReactNode {
        const rawContent = this.props.footnotes;
        const parsed = PassageMarkdown.parse(rawContent);
        return PassageMarkdown.output(parsed);
    }

    render(): React.ReactNode {
        const {strings} = this.context;
        let lineNumbers: ReadonlyArray<React.ReactNode>;
        const nLines = this.state.nLines;
        if (this.props.showLineNumbers && nLines) {
            // lineN is the line number in the current passage
            // lineAt is the actual line number across multiple passages
            lineNumbers = _.range(1, nLines + 1).map((lineN) => {
                const lineAt = lineN + this.state.startLineNumbersAfter;
                if (lineAt === 4) {
                    const translatedLine = strings.lineLabel;
                    return (
                        <span key="line-marker" className="line-marker">
                            {translatedLine}
                        </span>
                    );
                }
                return <span key={lineN}>{lineAt}</span>;
            });
        }

        const parseState: ParseState = PassageMarkdown.getInitialParseState();

        // Replace the vertical double quote characters quoting text with
        // an unicode left and right double quote characters. This would
        // avoid rendering right or left unicode double quotes on both
        // ends of a sentence wrapped by double quotes.
        const re = /("{1})([^"]*)("{1})/g;
        const doubleQuoteParsedContent = this.props.passageText.replace(
            re,
            "\u201c$2\u201d",
        );
        const parsedContent = PassageMarkdown.parse(
            doubleQuoteParsedContent,
            parseState,
        );
        // Check if the title has any non-empty text in it.
        const hasTitle = /\S/.test(this.props.passageTitle);

        return (
            <div>
                <div className="perseus-widget-passage-container">
                    {this._renderInstructions(parseState)}
                    <div className="perseus-widget-passage">
                        {hasTitle && (
                            <h3 className="passage-title">
                                <Renderer
                                    content={this.props.passageTitle}
                                    linterContext={this.props.linterContext}
                                    strings={strings}
                                />
                            </h3>
                        )}
                        {/* @ts-expect-error - TS2454 - Variable 'lineNumbers' is used before being assigned. */}
                        {lineNumbers && (
                            <div className="line-numbers" aria-hidden={true}>
                                {lineNumbers}
                            </div>
                        )}
                        {!hasTitle && (
                            <h3 className="perseus-sr-only">
                                {strings.beginningPassage}
                            </h3>
                        )}
                        <div className="passage-text">
                            {this.shouldRenderJipt() ? (
                                // If we're in JIPT mode, just pass off our
                                // content to a <Renderer /> which knows how
                                // to handle rendering JIPT text.
                                <Renderer
                                    content={this.props.passageText}
                                    strings={strings}
                                />
                            ) : (
                                this._renderContent(parsedContent)
                            )}
                        </div>
                        {this._hasFootnotes() && [
                            <h4
                                key="footnote-start"
                                className="perseus-sr-only"
                            >
                                {strings.beginningFootnotes}
                            </h4>,
                            <div key="footnotes" className="footnotes">
                                {this._renderFootnotes()}
                            </div>,
                        ]}
                        <div className="perseus-sr-only">
                            {strings.endPassage}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default {
    name: "passage",
    displayName: "Passage (SAT only)",
    hidden: true,
    widget: Passage,
    isLintable: true,
} satisfies WidgetExports<typeof Passage>;
