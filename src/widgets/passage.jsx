/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable comma-dangle, no-undef, react/jsx-closing-bracket-location, react/jsx-indent-props, react/jsx-sort-prop-types, react/prop-types, react/sort-comp, space-infix-ops */
/* To fix, remove an entry above, run ka-lint, and fix errors. */


const React = require("react");
const ReactDOM = require("react-dom");
const _ = require("underscore");

const Changeable   = require("../mixins/changeable.jsx");

const Renderer = require("../renderer.jsx");
const PassageMarkdown = require("./passage/passage-markdown.jsx");

const Passage = React.createClass({
    mixins: [Changeable],

    propTypes: {
        passageTitle: React.PropTypes.string,
        passageText: React.PropTypes.string,
        footnotes: React.PropTypes.string,
        showLineNumbers: React.PropTypes.bool,
        //onChange: React.propTypes.func,
    },

    getDefaultProps: function() {
        return {
            passageTitle: "",
            passageText: "",
            footnotes: "",
            showLineNumbers: true
        };
    },

    getInitialState: function() {
        return {
            nLines: null,
            startLineNumbersAfter: 0,
            highlightRanges: [],
            selectedHighlightRange: null,
        };
    },

    /**
     * Returns the total number of words (or word fragments) in the given
     * selection, based on the number of spaces.
     */
    wordsInSection: function(section) {
        return section
                .split(/\s/)
                .filter((word) => word.length > 0)
                .length;
    },

    /**
     * Compare two ranges according to their start word.
     */
    compareRanges: function(a, b) {
        if (a[0] < b[0]) {
            return -1;
        } else if (a[0] > b[0]) {
            return 1;
        } else {
            return 0;
        }
    },

    mergeOverlappingRanges: function(ranges) {
        const sorted = [...ranges].sort(this.compareRanges);
        const merged = [];

        for (const curr of sorted) {
            const prev = merged[merged.length - 1];

            if (prev && curr[0] <= prev[1]) {
                // These ranges overlap; merge curr into prev.
                merged[merged.length - 1] =
                    [prev[0], Math.max(prev[1], curr[1])];
            } else {
                // These ranges don't overlap; start a new range with curr.
                merged.push(curr);
            }
        }

        return merged;
    },

    /**
     *  Handle a selection by highlighting it (or glomming it to an existing
     *  highlighted region).
     */
    addHighlightRange: function(highlightRange) {
        let newHighlightRanges = this.state.highlightRanges;

        newHighlightRanges.push(highlightRange);
        newHighlightRanges =
            this.mergeOverlappingRanges(newHighlightRanges);

        this.setState({
            highlightRanges: newHighlightRanges
        });
        //this.props.onChange(newHighlightRanges);

        // HACK: Not sure why this is neccessary as setState should cause an
        // update. However, highlighting oftern doesn't appear without it.
        this.forceUpdate();
    },

    getSelectionRange: function(selection) {
        const anchorIndex = this.getSelectionIndex(selection, "anchor");
        const focusIndex = this.getSelectionIndex(selection, "focus");
        const selectionStartIndex = Math.min(anchorIndex, focusIndex);
        const selectionEndIndex = Math.max(anchorIndex, focusIndex);
        return [selectionStartIndex, selectionEndIndex];
    },

    /**
     * Returns the index of either the anchor word or the focus word in the
     * current selection.
     */
    getSelectionIndex: function(selection, nodeType) {
        let node = null;
        let index = 0;
        if (nodeType === "anchor") {
            node = selection.anchorNode;
            index += this.charToWordOffset(
                               selection.anchorOffset, node.textContent);
        } else {
            node = selection.focusNode;
            index += this.charToWordOffset(
                               selection.focusOffset, node.textContent);
        }

        let priorText = "";
        while (node && !(node.classList &&
                node.classList.contains("passage-text"))) {
            while (node.previousSibling) {
                node = node.previousSibling;
                priorText = node.textContent + priorText;
            }
            node = node.parentNode;
        }

        index += this.wordsInSection(priorText);

        return index;
    },

    charToWordOffset: function(offset, selectedText) {
        const beforeSelection = selectedText.substring(0, offset);
        let wordOffset = this.wordsInSection(beforeSelection);

        // If any part of the first word of selectedText is included in
        // beforeSelection, then remove it from the count.
        if (!(selectedText.charAt(offset) === " " ||
                selectedText.charAt(offset - 1) === " ")) {
            wordOffset -= 1;
        }
        return wordOffset;
    },

    /**
     * Handle the current selection for highlighting purposes.
     */
    onConfirmHighlight: function() {
        // Clear the currently-selected range - if it's been re-selected, we'll
        // determine that below.
        this.setState({
            selectedHighlightRange: null
        });

        const selection = window.getSelection();
        const highlightRange = this.getSelectionRange(selection);

        this.addHighlightRange(highlightRange);
    },

    handleMouseUp: function() {
        this.onConfirmHighlight();
    },

    /**
     * Removes the currently-selected highlight region.
     */
    handleRemoveHighlightClick: function() {
        const passageIndex = this.state.highlightRanges.indexOf(
                this.state.selectedHighlightRange);
        const newHighlightRanges = [...this.state.highlightRanges];
        newHighlightRanges.splice(passageIndex, 1);
        this.setState({
            selectedHighlightRange: null,
            highlightRanges: newHighlightRanges
        });
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        return !_.isEqual(this.props, nextProps) ||
            !_.isEqual(this.state, nextState);
    },

    render: function() {
        let lineNumbers;
        const nLines = this.state.nLines;
        if (this.props.showLineNumbers && nLines) {
            // lineN is the line number in the current passage;
            // the displayed line number is
            // lineN + this.state.startLineNumbersAfter, where
            // startLineNumbersAfter is the sum of all line numbers
            // in earlier passages.
            lineNumbers = _.range(1, nLines + 1).map((lineN) => {
                if (lineN === 4 && nLines > 4) {
                    return <span
                            key="line-marker"
                            className="line-marker">
                        Line
                    </span>;
                } else {
                    return lineN + this.state.startLineNumbersAfter;
                }
            });
        }

        let rawContent = this.props.passageText;
        // For each highlighted passage, we (ephemerally) inject highlight
        // markdown into the rawContent.
        _.each(this.state.highlightRanges, function(highlightPassage) {
            const isSelected = (this.state.selectedHighlightRange &&
                this.state.selectedHighlightRange[0]===highlightPassage[0]);
            const rangeStartIndex = highlightPassage[0];
            const rangeEndIndex = highlightPassage[1];

            // First, we break rawContent apart into word-sized fragments. We
            // need to be able to reassemble it later though, so we can't just
            // blindly split on all whitespace characters! Instead, we split
            // only on spaces, then manually split up those text fragments if
            // they contain a non-space-whitespace character (e.g. a newline).
            rawContent = rawContent.split(' ');
            rawContent = rawContent.map(function(fragment) {
                const whitespaceMatch = fragment.match(/\s+/);
                if (whitespaceMatch) {
                    const whitespaceLastIndex = (
                        whitespaceMatch.index +
                        whitespaceMatch[0].length);
                    return [fragment.slice(0, whitespaceLastIndex),
                            fragment.slice(whitespaceLastIndex)];
                } else {
                    return [fragment];
                }
            });
            // Flatten array (since it now contains nested fragments), and drop
            // any empty fragments (which might result from multiple
            // back-to-back spaces, which markdown will ignore anyway).
            rawContent = [].concat(...rawContent);
            rawContent = rawContent.filter(function(fragment) {
                return fragment !== '';
            });

            // Reassemble rawContent, with highlighter markdown included.
            // Two big gotchas here:
            // 1. Markdown does not support partially-overlapping markdown
            // ranges, because it all needs to distill down into HTML (which is
            // non-partially-overlapping). So we have to surround *each*
            // individual word/space with its own highlighter markdown. The
            // end result looks like a continuously-highlighted range though!
            // 2. The fragments may contain other markdown text, so we need to
            // define "word" carefully, so that *only* visible text is
            // surrounded with highlighting markdown, while markdown text is
            // ignored.
            rawContent = (
                rawContent.slice(0, rangeStartIndex).join(' ') +
                ' ' +
                // TODO: we're using these characters to inject the
                // highlight-remove button. This really ought to be a React
                // component instead!
                (isSelected ? "####" : '') +
                rawContent
                    .slice(rangeStartIndex, rangeEndIndex + 1)
                    .map(function(fragment) {
                        // This fragment should contain all user-visible
                        // characters, and no markdown characters!
                        const highlightableMatch = (
                            fragment.match(/[\(\)\-\—\-\.,A-Za-z0-9:'"]+/)
                        );
                        const matchStart = highlightableMatch.index;
                        const matchEnd = (
                                matchStart + highlightableMatch[0].length);
                        return (fragment.slice(0, matchStart) +
                                '&&' +
                                fragment.slice(matchStart, matchEnd) +
                                '&&' +
                                fragment.slice(matchEnd));
                    })
                    .join('&& &&') +
                ' ' +
                rawContent.slice(rangeEndIndex + 1).join(' '));
        }, this);

        const parseState = {};
        const parsedContent = PassageMarkdown.parse(rawContent, parseState);

        return <div
            className="perseus-widget-passage-container"
            onMouseUp={this.handleMouseUp}
        >
            {this._renderInstructions(parseState)}
            <div className="perseus-widget-passage">
                <div className="passage-title">
                    <Renderer content={this.props.passageTitle} />
                </div>
                {lineNumbers &&
                    <div className="line-numbers" aria-hidden={true}>
                        {lineNumbers}
                    </div>
                }
                <h3 className="perseus-sr-only">
                    {i18n._("Beginning of reading passage.")}
                </h3>
                <div className="passage-text">
                    {this._renderContent(parsedContent)}
                </div>
                {this._hasFootnotes() && [
                    <h4 key="footnote-start" className="perseus-sr-only">
                        {i18n._("Beginning of reading passage footnotes.")}
                    </h4>,
                    <div key="footnotes" className="footnotes">
                        {this._renderFootnotes()}
                    </div>
                ]}
                <div className="perseus-sr-only">
                    {i18n._("End of reading passage.")}
                </div>
            </div>
        </div>;
    },

    componentDidMount: function() {
        this._updateState();
    },

    componentDidUpdate: function() {
        this._updateState();
        const highlighterTool = (
                document.getElementById('perseus-selected-highlight'));
        if (highlighterTool) {
            //TODO: there must be a more canonical way to attach a click
            //handler to this component.
            highlighterTool.click(function() {});
            highlighterTool.onclick = this.handleRemoveHighlightClick;
        }
    },

    _updateState: function() {
        this.setState({
            nLines: this._measureLines(),
            startLineNumbersAfter: this._getInitialLineNumber(),
        });
    },

    _measureLines: function() {
        const $renderer = $(ReactDOM.findDOMNode(this.refs.content));
        const contentsHeight = $renderer.height();
        const lineHeight = parseInt($renderer.css("line-height"));
        const nLines = Math.round(contentsHeight / lineHeight);
        return nLines;
    },

    _getInitialLineNumber: function() {
        let isPassageBeforeThisPassage = true;
        const passagesBeforeUs = this.props.interWidgets((id, widgetInfo) => {
            if (widgetInfo.type !== "passage") {
                return false;
            }
            if (id === this.props.widgetId) {
                isPassageBeforeThisPassage = false;
            }
            return isPassageBeforeThisPassage;
        });

        return passagesBeforeUs.map((passageWidget) => {
            return passageWidget.getLineCount();
        }).reduce((a, b) => a + b, 0);
    },

    getLineCount: function() {
        if (this.state.nLines != null) {
            return this.state.nLines;
        } else {
            return this._measureLines();
        }
    },

    _renderInstructions: function(parseState) {
        const firstQuestionNumber = parseState.firstQuestionRef;
        const firstSentenceRef = parseState.firstSentenceRef;

        let instructions = "";
        if (firstQuestionNumber) {
            instructions += i18n._(
                "The symbol %(questionSymbol)s indicates that question " +
                "%(questionNumber)s references this portion of the passage.",
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
        return <div className="perseus-widget-passage-instructions">
            {PassageMarkdown.output(parsedInstructions)}
        </div>;
    },

    _renderContent: function(parsed) {
        return <div ref="content">
            {PassageMarkdown.output(parsed)}
        </div>;
    },

    _hasFootnotes: function() {
        const rawContent = this.props.footnotes;
        const isEmpty = /^\s*$/.test(rawContent);
        return !isEmpty;
    },

    _renderFootnotes: function() {
        const rawContent = this.props.footnotes;
        const parsed = PassageMarkdown.parse(rawContent);
        return PassageMarkdown.output(parsed);
    },

    _getStartRefLineNumber: function(referenceNumber) {
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

        return this.state.startLineNumbersAfter + 1 +
            this._convertPosToLineNumber(vPos);
    },

    _getEndRefLineNumber: function(referenceNumber) {
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
    },

    _convertPosToLineNumber: function(absoluteVPos) {
        const $content= $(ReactDOM.findDOMNode(this.refs.content));
        const relativeVPos = absoluteVPos - $content.offset().top;
        const lineHeight = parseInt($content.css("line-height"));

        const line = Math.round(relativeVPos / lineHeight);
        return line;
    },

    _getRefContent: function(referenceNumber) {
        const refRef = PassageMarkdown.START_REF_PREFIX + referenceNumber;
        const ref = this.refs[refRef];
        if (!ref) {
            return null;
        }
        return ref.getRefContent();
    },

    getReference: function(referenceNumber) {
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
    },

    getUserInput: function() {
        return null;
    },

    simpleValidate: function(rubric) {
        return Passage.validate(this.getUserInput(), rubric);
    }
});

_.extend(Passage, {
    validate: function(state, rubric) {
        return {
            type: "points",
            earned: 0,
            total: 0,
            message: null
        };
    }
});

module.exports = {
    name: "passage",
    displayName: "Passage",
    widget: Passage,
    transform: (editorProps) => {
        return _.pick(editorProps, "passageTitle", "passageText", "footnotes",
            "showLineNumbers");
    }
};
