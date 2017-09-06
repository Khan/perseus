// @flow
/* globals KA */

const {StyleSheet, css} = require("aphrodite");
const React = require("react");
const ReactDOM = require("react-dom");
const _ = require("underscore");
const $ = require("jquery");

const HighlightableContent = require("../components/highlighting/highlightable-content.jsx");
const Renderer = require("../renderer.jsx");
const PassageMarkdown = require("./passage/passage-markdown.jsx");

const {linterContextDefault} = require("../gorgon/proptypes.js");

import type {ChangeableProps} from "../mixins/changeable.jsx";
import type {SerializedHighlightSet} from "../components/highlighting/types.js";

declare var i18n: {
    _(format: string, args?: any): string,
};

type JQueryCollection = any;

// A fake paragraph to measure the line height of the passage. In CSS we always
// set the line height to 22 pixels, but when using the browser zoom feature,
// the line height often ends up being a fractional number of pixels close to
// 22 pixels.
class LineHeightMeasurer extends React.Component {
    _cachedLineHeight: number;
    $body: JQueryCollection;
    $end: JQueryCollection;

    measureLineHeight(): number {
        if (typeof this._cachedLineHeight !== "number") {
            this.forceMeasureLineHeight();
        }

        return this._cachedLineHeight;
    }

    forceMeasureLineHeight() {
        // Add some text which magically fills an entire line.
        this.$body.text(" \u0080");

        // Now, the line height is the difference between the top of the
        // second line and the top of the first line.
        this._cachedLineHeight =
            this.$end.offset().top - this.$body.offset().top;

        // Clear out the first line so it doesn't overlap the passage.
        this.$body.text("");
    }

    render() {
        return (
            <div className={css(styles.measurer)}>
                <div>
                    <div ref={e => (this.$body = $(e))} className="paragraph" />
                    <div ref={e => (this.$end = $(e))} />
                </div>
            </div>
        );
    }
}

const styles = StyleSheet.create({
    measurer: {
        position: "absolute",
        width: "100%",
        top: 0,
        left: 0,
    },
});

type PassageProps = ChangeableProps & {
    passageTitle: string,
    passageText: string,
    footnotes: string,
    showLineNumbers: boolean,
    highlights: SerializedHighlightSet,
    reviewModeRubric: {
        passageTitle: string,
        passageText: string,
        footnotes: string,
        showLineNumbers: boolean,
        static: boolean,
    },

    // NOTE(mdr): An old version of the highlighting feature used a widget
    //     state field named `highlightRanges` to save serialized highlights.
    //     This version of highlighting was removed in D36490, but some old
    //     serialized Perseus state might still contain references to
    //     `highlightRanges`. So, do not add a new prop to this component named
    //     `highlightRanges`, or else you might get data that's not in the
    //     format you expect.
    highlightRanges: any,
    // TODO(scottgrant): Flow type for linter context object
    linterContext: any,
};

type PassageState = {
    nLines: ?number,
    startLineNumbersAfter: number,
    stylesAreApplied: boolean,
};

// State kept track of by the PassageMarkdown parser.
type PassageParseState = {
    firstQuestionRef: ?any,
    firstSentenceRef: ?any,
};

// Information about a passage reference, used in inter-widgets.
type Reference = {
    startLine: number,
    endLine: number,
    content: ?string,
};

class Passage extends React.Component {
    props: PassageProps;

    _onResize: () => {};
    _lineHeightMeasurer: LineHeightMeasurer;

    static defaultProps = {
        passageTitle: "",
        passageText: "",
        footnotes: "",
        showLineNumbers: true,
        highlights: {},
        linterContext: linterContextDefault,
    };

    state: PassageState = {
        nLines: null,
        startLineNumbersAfter: 0,
        stylesAreApplied: false,
    };

    componentDidMount() {
        this._updateState();

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
            this._lineHeightMeasurer.forceMeasureLineHeight();
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
        window.setTimeout(() => {
            this.setState({stylesAreApplied: true});
        }, 0);
    }

    shouldComponentUpdate(nextProps: PassageProps, nextState: PassageState) {
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
    }

    _handleSerializedHighlightsUpdate = (
        serializedHighlights: SerializedHighlightSet
    ) => {
        this.props.onChange({highlights: serializedHighlights});
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
        const $renderer = $(ReactDOM.findDOMNode(this.refs.content));
        const contentsHeight = $renderer.height();
        const lineHeight = this._getLineHeight();
        const nLines = Math.round(contentsHeight / lineHeight);
        return nLines;
    }

    _getInitialLineNumber(): number {
        let isPassageBeforeThisPassage = true;
        const passagesBeforeUs = this.props.findWidgets((id, widgetInfo) => {
            if (widgetInfo.type !== "passage") {
                return false;
            }
            if (id === this.props.widgetId) {
                isPassageBeforeThisPassage = false;
            }
            return isPassageBeforeThisPassage;
        });

        return passagesBeforeUs
            .map(passageWidget => {
                return passageWidget.getLineCount();
            })
            .reduce((a, b) => a + b, 0);
    }

    _getLineHeight(): number {
        return this._lineHeightMeasurer.measureLineHeight();
    }

    getLineCount(): number {
        if (this.state.nLines != null) {
            return this.state.nLines;
        } else {
            return this._measureLines();
        }
    }

    /**
     * Passage refs
     *
     * These are functions to support the passage refs inter-widgets feature
     * where other widgets can fetch the line numbers of a reference inside of
     * a passage.
     */

    _getStartRefLineNumber(referenceNumber: number): ?number {
        const refRef = PassageMarkdown.START_REF_PREFIX + referenceNumber;
        const ref = this.refs[refRef];
        if (!ref) {
            return null;
        }

        const $ref = $(ReactDOM.findDOMNode(ref));
        // We really care about the first text after the ref, not the
        // ref element itself:
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

    _getEndRefLineNumber(referenceNumber: number): ?number {
        const refRef = PassageMarkdown.END_REF_PREFIX + referenceNumber;
        const ref = this.refs[refRef];
        if (!ref) {
            return null;
        }

        const $ref = $(ReactDOM.findDOMNode(ref));
        // We really care about the last text before the ref, not the
        // ref element itself:
        let $refText = $ref.prev();
        if ($refText.length === 0) {
            // But if there are no elements before the ref, just
            // use the ref itself.
            $refText = $ref;
        }
        const height = $refText.height();
        const vPos = $refText.offset().top;

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

    _convertPosToLineNumber(absoluteVPos): number {
        const $content = $(ReactDOM.findDOMNode(this.refs.content));
        const relativeVPos = absoluteVPos - $content.offset().top;
        const lineHeight = this._getLineHeight();

        const line = Math.round(relativeVPos / lineHeight);
        return line;
    }

    _getRefContent(referenceNumber: number): ?string {
        const refRef = PassageMarkdown.START_REF_PREFIX + referenceNumber;
        const ref = this.refs[refRef];
        if (!ref) {
            return null;
        }
        return ref.getRefContent();
    }

    getReference(referenceNumber: number): ?Reference {
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

    /**
     * Misc functions
     *
     * These are misc widget functions used for the widget API
     */

    getUserInput(): null {
        return null;
    }

    simpleValidate(rubric: any) {
        return Passage.validate(this.getUserInput(), rubric);
    }

    /* eslint-disable react/sort-comp */
    static validate(state, rubric) {
        return {
            type: "points",
            earned: 0,
            total: 0,
            message: null,
        };
    }
    /* eslint-enable react/sort-comp */

    /**
     * Rendering
     *
     * Functions to render the passage widget.
     */

    _renderInstructions(parseState: PassageParseState): React.Element<any> {
        const firstQuestionNumber = parseState.firstQuestionRef;
        const firstSentenceRef = parseState.firstSentenceRef;

        let instructions = "";
        if (firstQuestionNumber) {
            instructions += i18n._(
                "The symbol %(questionSymbol)s indicates that question " +
                    "%(questionNumber)s references this portion of the " +
                    "passage.",
                {
                    questionSymbol: "[[" + firstQuestionNumber + "]]",
                    questionNumber: firstQuestionNumber,
                }
            );
        }
        if (firstSentenceRef) {
            instructions += i18n._(
                " The symbol %(sentenceSymbol)s indicates that the " +
                    "following sentence is referenced in a question.",
                {
                    sentenceSymbol: "[" + firstSentenceRef + "]",
                }
            );
        }
        const parsedInstructions = PassageMarkdown.parse(instructions);
        return (
            <div className="perseus-widget-passage-instructions">
                {PassageMarkdown.output(parsedInstructions)}
            </div>
        );
    }

    shouldRenderJipt() {
        // Mostly copied from `renderer.jsx`. If we're doing JIPT, we want to
        // render our content differently.
        return (
            // $FlowFixMe KA is a global
            typeof KA !== "undefined" &&
            KA.language === "en-pt" &&
            this.props.passageText.indexOf("crwdns") !== -1
        );
    }

    _renderContent(parsed): React.Element<any> {
        // Wait until Aphrodite styles are applied before enabling highlights,
        // so that we measure the correct positions.
        const enabled = this.state.stylesAreApplied;

        // Highlights are read-only in review mode.
        const editable = !this.props.reviewModeRubric;

        return (
            <HighlightableContent
                editable={editable}
                enabled={enabled}
                onSerializedHighlightsUpdate={
                    this._handleSerializedHighlightsUpdate
                }
                serializedHighlights={this.props.highlights}
            >
                <div ref="content">
                    <LineHeightMeasurer
                        ref={e => (this._lineHeightMeasurer = e)}
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

    _renderFootnotes(): React.Element<any> {
        const rawContent = this.props.footnotes;
        const parsed = PassageMarkdown.parse(rawContent);
        return PassageMarkdown.output(parsed);
    }

    render() {
        let lineNumbers;
        const nLines = this.state.nLines;
        if (this.props.showLineNumbers && nLines) {
            // lineN is the line number in the current passage;
            // the displayed line number is
            // lineN + this.state.startLineNumbersAfter, where
            // startLineNumbersAfter is the sum of all line numbers
            // in earlier passages.
            lineNumbers = _.range(1, nLines + 1).map(lineN => {
                if (lineN === 4 && nLines > 4) {
                    return (
                        <span key="line-marker" className="line-marker">
                            Line
                        </span>
                    );
                } else {
                    return (
                        <span key={lineN}>
                            {lineN + this.state.startLineNumbersAfter}
                        </span>
                    );
                }
            });
        }

        const parseState: PassageParseState = {
            firstSentenceRef: null,
            firstQuestionRef: null,
        };
        const parsedContent = PassageMarkdown.parse(
            this.props.passageText,
            parseState
        );

        // Check if the title has any non-empty text in it.
        const hasTitle = /\S/.test(this.props.passageTitle);

        return (
            <div>
                <div className="perseus-widget-passage-container">
                    {this._renderInstructions(parseState)}
                    <div className="perseus-widget-passage">
                        {hasTitle &&
                            <h3 className="passage-title">
                                <Renderer
                                    content={this.props.passageTitle}
                                    linterContext={this.props.linterContext}
                                />
                            </h3>}
                        {lineNumbers &&
                            <div className="line-numbers" aria-hidden={true}>
                                {lineNumbers}
                            </div>}
                        {!hasTitle &&
                            <h3 className="perseus-sr-only">
                                {i18n._("Beginning of reading passage.")}
                            </h3>}
                        <div className="passage-text">
                            {this.shouldRenderJipt()
                                ? // If we're in JIPT mode, just pass off our
                                  // content to a <Renderer /> which knows how
                                  // to handle rendering JIPT text.
                                  <Renderer content={this.props.passageText} />
                                : this._renderContent(parsedContent)}
                        </div>
                        {this._hasFootnotes() && [
                            <h4
                                key="footnote-start"
                                className="perseus-sr-only"
                            >
                                {i18n._(
                                    "Beginning of reading passage footnotes."
                                )}
                            </h4>,
                            <div key="footnotes" className="footnotes">
                                {this._renderFootnotes()}
                            </div>,
                        ]}
                        <div className="perseus-sr-only">
                            {i18n._("End of reading passage.")}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = {
    name: "passage",
    displayName: "Passage (SAT only)",
    widget: Passage,
    transform: (editorProps: any) => {
        return _.pick(
            editorProps,
            "passageTitle",
            "passageText",
            "footnotes",
            "showLineNumbers"
        );
    },
    isLintable: true,
};
