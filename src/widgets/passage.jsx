/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable comma-dangle, react/jsx-closing-bracket-location, react/jsx-indent-props, react/sort-comp, space-infix-ops */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

/**
 * Highlighting feature discoveries (davidpowell/mdr):
 * Inserting markdown into the raw contents of a passage to make a highlight
 * causes several difficulties. As such, if we were to build a generalizable,
 * site-wide highlighting tool, it may be preferable to build it in such a way
 * that it works on arbitrary React trees - though this would be a significant
 * engineering task. The issues that using markdown caused were:
 *
 * 1) To avoid interaction issues with other markdown, individual words have to
 * be wrapped in markdown, as opposed to a whole highlighted section. In some
 * cases this may even need to be done on sub-sections of words. This causes
 * difficulty in wrapping the correct sub-sections in highlighting markdown,
 * whilst not wrapping other markdown, which would cause the other markdown to
 * be shown as raw (highlighted) text. The current attempt at this, in the
 * render method, is rather hacky.
 *
 * 2) In order to locate the position of a word in a passage, we have to count
 * all prior words in the text. Unfortunately, the passageText prop, from which
 * we start when we add the highlighting markdown, differs slightly from the
 * contents of the DOM tree, which we crawl to locate the position of the text
 * selection. For example, neither markdown nor new line characters appear when
 * crawling the DOM. There are also additional "_" characters that appear when
 * crawling the DOM which are not in the passageText prop. This results in lots
 * of edge case handling to avoid the wrong words from being highlighted (e.g an
 * off-by-one error).
 */


const {StyleSheet, css} = require("aphrodite");
const React = require("react");
const ReactDOM = require("react-dom");
const _ = require("underscore");

const Changeable   = require("../mixins/changeable.jsx");

const Renderer = require("../renderer.jsx");
const PassageMarkdown = require("./passage/passage-markdown.jsx");

// A fake paragraph to measure the line height of the passage. In CSS we always
// set the line height to 22 pixels, but when using the browser zoom feature,
// the line height often ends up being a fractional number of pixels close to
// 22 pixels.
const LineHeightMeasurer = React.createClass({
    measureLineHeight() {
        if (typeof this._cachedLineHeight !== "number") {
            this.forceMeasureLineHeight();
        }

        return this._cachedLineHeight;
    },

    forceMeasureLineHeight() {
        // Add some text which magically fills an entire line.
        this.$body.text(" \u0080");

        // Now, the line height is the difference between the top of the
        // second line and the top of the first line.
        this._cachedLineHeight =
            this.$end.offset().top - this.$body.offset().top;

        // Clear out the first line so it doesn't overlap the passage.
        this.$body.text("");
    },

    render() {
        return <div
            className={css(styles.measurer)}
        >
            <div>
                <div
                    ref={(e) => this.$body = $(e)}
                    className="paragraph"
                />
                <div ref={(e) => this.$end = $(e)} />
            </div>
        </div>;
    },
});

const styles = StyleSheet.create({
    measurer: {
        position: "absolute",
        width: "100%",
        top: 0,
        left: 0,
    },
});

const Passage = React.createClass({
    propTypes: {
        ...Changeable.propTypes,
        passageTitle: React.PropTypes.string,
        passageText: React.PropTypes.string,
        footnotes: React.PropTypes.string,
        showLineNumbers: React.PropTypes.bool,
        onChange: React.PropTypes.func,
        highlightRanges: React.PropTypes.arrayOf(
            React.PropTypes.arrayOf(React.PropTypes.number)),
        reviewModeRubric: React.PropTypes.shape({
            passageTitle: React.PropTypes.string,
            passageText: React.PropTypes.string,
            footnotes: React.PropTypes.string,
            showLineNumbers: React.PropTypes.bool,
            static: React.PropTypes.bool,
        }),
    },

    getDefaultProps: function() {
        return {
            passageTitle: "",
            passageText: "",
            footnotes: "",
            showLineNumbers: true,
            highlightRanges: [],
        };
    },

    getInitialState: function() {
        return {
            nLines: null,
            startLineNumbersAfter: 0,
            newHighlightRange: null,
            selectedHighlightRange: null,
            mouseX: null,
            mouseY: null,
        };
    },

    change(...args) {
        return Changeable.change.apply(this, args);
    },

    // TODO(davidpowell,mdr): We punted on supporting passages that contain
    //     markers referenced in questions, because they caused bugs that we
    //     couldn't diagnose quickly. Reading passages and essay passages don't
    //     currently contain markers, though, so they're always supported!
    supportsHighlighting: function() {
        // HACK(davidpowell,mdr): If a passage contains question markers, the
        //     first one should be labeled #1, so just scan for marker #1.
        return !(this.props.passageText.match(/\[\[1\]\]/));
    },

    // If this is a reading passage and not in review mode, then the user can
    // update the highlighting state. Otherwise, highlights will still render,
    // but in read-only mode.
    canUpdateHighlighting: function() {
        return !this.props.reviewModeRubric && this.supportsHighlighting();
    },

    /**
     * Returns the total number of words (or word fragments) in the given
     * selection, based on the number of spaces.
     */
    wordsInSection: function(section) {
        // HACK (davidpowell): Sometimes the raw content of the page contains
        // "end of sentence. _New sentence", the node seems to split after the
        // underscore (e.g. "end of sentence. _" is in one node and "New
        // sentence..." is in  another). This would lead to the underscore
        // being counted as a seperate word due to the fact that the words in
        // each node are counted separately. The line below is a hacky fix for
        // this.
        section = section.replace(/_+/g, "");
        // Strip out markers from writing passages which are not in
        // passage-text.
        // Note: highlighting is currently disabled in writing passages but
        // this is left in for potential future development.
        section = section.replace(/\[Marker for question [0-9]+\]/g, " ");
        section = section.replace(/\[Sentence [0-9]+\]/g, " ");
        const sectionWordArray = section
                                .split(/\s+/)
                                .filter((word) => word.length > 0);
        return sectionWordArray.length;
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
    addHighlightRange: function() {
        let newHighlightRanges = [...this.props.highlightRanges];
        newHighlightRanges.push(this.state.newHighlightRange);
        newHighlightRanges = this.mergeOverlappingRanges(newHighlightRanges);
        this.props.onChange({highlightRanges: newHighlightRanges});

        // HACK: Not sure why this is neccessary as setState should cause an
        // update. However, highlighting often doesn't appear without it.
        this.forceUpdate();
    },

    /**
     * Returns true if the selection anchor is before the selection focus in
     * the passage
     */
    isAnchorFirst: function(anchorNode, focusNode, anchorOffset, focusOffset) {
        if (anchorNode === focusNode) {
            // If the selection is contained in one node, does the anchor point
            // come before the focus point?
            return anchorOffset < focusOffset;
        } else {
            // If the selection spans multiple nodes, does anchorNode come
            // before focusNode in the document?
            return anchorNode.compareDocumentPosition(focusNode) === 4;
        }
    },

    /**
     * The anchor of a selection is where the user began their selection and
     * the focus is where the user ended their selection. This function sorts
     * the two into the order they are in a passage. For example, if a user
     * makes their selection forwards the anchor will be the start and if they
     * make it backwards, the focus will be the start.
     */
    sortIndices: function(selection) {
        const anchorIndex = this.getSelectionIndex(selection, "anchor");
        const focusIndex = this.getSelectionIndex(selection, "focus");
        const anchorNode = selection.anchorNode;
        const focusNode = selection.focusNode;
        const anchorOffset = selection.anchorOffset;
        const focusOffset = selection.focusOffset;
        if (this.isAnchorFirst(
                anchorNode, focusNode, anchorOffset, focusOffset)) {
            return {
                selectionStartIndex: anchorIndex,
                selectionEndIndex: focusIndex,
                startNode: anchorNode,
                endNode: focusNode,
                startNodeOffset: anchorOffset,
                endNodeOffset: focusOffset,
            };
        } else {
            return {
                selectionStartIndex: focusIndex,
                selectionEndIndex: anchorIndex,
                startNode: focusNode,
                endNode: anchorNode,
                startNodeOffset: focusOffset,
                endNodeOffset: anchorOffset,
            };
        }
    },

    /**
     * Gets the range of a selection, returning an array of the form
     * [selectionStartIndex, selectionEndIndex] where selectionStartIndex is the
     * the index of the first word in the selection, with respect to the passage
     * as a whole. Note that we are counting the indices in words and not
     * characters.
     */
    getSelectionRange: function(selection) {
        const selectionOrderObject = this.sortIndices(selection);
        let {selectionStartIndex, selectionEndIndex} = selectionOrderObject;
        const {startNode, endNode, startNodeOffset, endNodeOffset} =
            selectionOrderObject;

        if (selectionStartIndex === null || selectionEndIndex === null) {
            return null;
        }

        // Prevents selecting a space from highlighting both surrounding words.
        // Using selection.toString() would be preferable but it is buggy in
        // Chrome (08/2016). When selecting the last char of a line it adds a
        // space.
        if (startNode.textContent.charAt(startNodeOffset) === " " &&
                selectionEndIndex > selectionStartIndex) {
            selectionStartIndex += 1;
        }
        if (endNode.textContent.charAt(endNodeOffset - 1) === " " &&
                selectionEndIndex > selectionStartIndex) {
            selectionEndIndex -= 1;
        }

        return [selectionStartIndex, selectionEndIndex];
    },

    isInPassageText: function(node) {
        let ancestor = node;
        while (ancestor) {
            if (ancestor.classList &&
                    ancestor.classList.contains("passage-text")) {
                // Traverse up the tree to find first element. This is needed as
                // Node.contains(otherNode) only works in IE if otherNode is an
                // element.
                while (node.nodeType !== 1) {
                    node = node.parentNode;
                }
                return ancestor.contains(node);
            }
            ancestor = ancestor.parentNode;
        }
        return false;
    },

    /**
     * Returns the index of either the anchor word or the focus word in the
     * current selection.
     */
    getSelectionIndex: function(selection, nodeType) {
        let node = null;
        let offset = 0;

        const punctuation = ".?;:!,\'\"";

        if (nodeType === "anchor") {
            node = selection.anchorNode;
            offset = selection.anchorOffset;
        } else {
            node = selection.focusNode;
            offset = selection.focusOffset;
        }

        if (!this.isInPassageText(node)) {
            return null;
        }

        let selectionNodeText = node.textContent;

        // Would prefer to use string.prototype.includes but it's not in IE 10.
        if (punctuation.indexOf(selectionNodeText.charAt(0)) !== -1) {
            selectionNodeText = selectionNodeText.slice(1);
        }

        let index = this.charToWordOffset(offset, selectionNodeText);

        let priorText = "";
        let nodeText = "";
        while (node && !(node.classList &&
                node.classList.contains("passage-text"))) {
            while (node.previousSibling) {
                node = node.previousSibling;
                nodeText = node.textContent;

                let spacer = "";
                const lastChar = nodeText.charAt(nodeText.length - 1);
                const newSentence = (punctuation.indexOf(lastChar) !== -1) ||
                    (!node.nextSibling) ||
                    (lastChar === "_" &&
                     node.nextSibling.textContent.charAt(0).match(/[\w ]/));

                // HACK: Add space when nodes split at end of sentence. This
                // stops two words from successive paragraphs merging together.
                // Assumes paragraphs end with punctuation.
                if (newSentence && priorText.length > 0) {
                    spacer = " ";
                }
                priorText = nodeText + spacer + priorText;
            }
            node = node.parentNode;
        }
        // TODO (davidpowell): Rewrite this so that the number of prior words is
        // calculated in one go. (As opposed to one call to charToWordOffset
        // with the current node and another to wordsInSection with the combined
        // text of all the previous nodes). There will be some non-trivial edge
        // cases to consider (see other TODOs and HACKs).
        index += this.wordsInSection(priorText);

        // This subtracts one from the index if the end of the last node in
        // priorText is the first word in a hyphenated pair. This is to stop
        // them being double counted (in the offset index and the priorText
        // index). A hyphenated pair is counted as one word when adding the
        // highlight.
        if ((priorText.charAt(priorText.length - 1) === "_" &&
                !selectionNodeText.charAt(0).match(/[\w ]/))) {
            index -= 1;
        }

        return index;
    },

    /**
     * Given the index of a character within a block of text, return the index
     * of the corresponding word.
     */
    charToWordOffset: function(offset, nodeText) {
        // Move the offset back to the previous space to exclude partial words.
        while (offset > 0 && nodeText.charAt(offset - 1) !== " ") {
            offset -= 1;
        }
        const beforeSelection = nodeText.substring(0, offset);
        let wordOffset = this.wordsInSection(beforeSelection);

        // HACK: Special case for if a selection starts on a space at the
        // beginning of a node. This most frequently occurs when a user tries to
        // start a highlight on the space after an existing highlight. This hack
        // is neccessary due to the handling of spaces being stopped from
        // highlighting the surrounding words in getSelectionRange not taking
        // into account if it is the start of a new node.
        if (nodeText.charAt(0) === " " && offset === 0) {
            wordOffset -= 1;
        }
        return wordOffset;
    },

    /**
     * Handle the current selection for highlighting purposes.
     */
    handleConfirmHighlightClick: function() {
        this.setState({newHighlightRange: null});
        this.addHighlightRange();
        // Collapse selection after adding highlight to keep behaviour
        // consistent. Without this, the selection sometimes changes to the
        // already existing highlight when merging selections.
        const selection = window.getSelection();
        selection.collapse(selection.anchorNode, selection.anchorOffset);
    },

    /**
     * Finds if there is already an exisiting highlight range that completely
     * contains the current selected range and returns that existing range.
     */
    isHighlighted: function(selectedRange) {
        const currentHighlightRanges = this.props.highlightRanges;
        for (const range of currentHighlightRanges) {
            if (selectedRange[0] >= range[0] && selectedRange[1] <= range[1]) {
                return range;
            }
        }
        return null;
    },

    /**
     * Resets newHighlightRange and selectedHighlightRange to null. This
     * has the effect of dismissing any open tooltips when a user clicks
     * elsewhere on the page.
     */
    handleMouseDown: function(e) {
        if (!e.target.getAttribute("data-highlighting-tooltip")) {
            this.setState({
                newHighlightRange: null,
                selectedHighlightRange: null,
            });
        }
    },

    /**
     * Handles all mouse up events on passage-widget-passage-container. There
     * are 2 cases we care about here (in the order they are below):
     * 1) A user has selected an existing highlight which they will then be
     *    prompted to confirm that they wish to remove.
     * 2) A user has made a new selection which they will then be prompted to
     *    add as a new highlight.
     */
    handleMouseUp: function(e) {
        const isHighlightTooltipShown = this.state.newHighlightRange ||
                                        this.state.selectedHighlightRange;
        if (this.canUpdateHighlighting() && !isHighlightTooltipShown) {
            // HACK - the height of the sat task title bar is 60px - subtracting
            // this in order to position the tooltip in the correct position on
            // the page. We can't use relative position of the passage as that
            // requires putting the tooltip inside the passage which sometimes
            // cuts off the edge.
            this.setState({mouseX: e.clientX, mouseY: e.clientY - 60});
            const selection = window.getSelection();
            const selectionRange = this.getSelectionRange(selection);
            if (selectionRange) {
                const selectedHighlightRange =
                    this.isHighlighted(selectionRange);

                if (selectedHighlightRange) {
                    this.setState({
                        newHighlightRange: null,
                        selectedHighlightRange: selectedHighlightRange,
                    });
                } else if (selection.toString() !== " " &&
                        !selection.isCollapsed) {
                    this.setState({
                        newHighlightRange: selectionRange,
                        selectedHighlightRange: null,
                    });
                }
            }
        }
    },

    /**
     * Removes the currently-selected highlight region.
     */
    handleRemoveHighlightClick: function() {
        const selectedHighlightRange = this.state.selectedHighlightRange;
        const passageIndex = this.props.highlightRanges.findIndex(
            (r) => r[0] === selectedHighlightRange[0] &&
                   r[1] === selectedHighlightRange[1]);
        const newHighlightRanges = [...this.props.highlightRanges];
        newHighlightRanges.splice(passageIndex, 1);

        this.setState({
            selectedHighlightRange: null,
        });

        this.props.onChange({highlightRanges: newHighlightRanges});
    },

    /**
     * Splits the rawContent into an array of words
     */
    stringToArrayOfWords: function(rawContent) {
        // First, we break rawContent apart into word-sized fragments. We
        // need to be able to reassemble it later though, so we can't just
        // blindly split on all whitespace characters! Instead, we split
        // only on spaces, then manually split up those text fragments if
        // they contain a non-space-whitespace character (e.g. a newline).
        rawContent = rawContent.split(" ");
        rawContent = rawContent.map(function(fragment) {
            const whitespaceMatch = fragment.match(/\s+/);
            if (whitespaceMatch) {
                const whitespaceLastIndex = (
                    whitespaceMatch.index +
                    whitespaceMatch[0].length);
                return [
                    fragment.slice(0, whitespaceLastIndex),
                    fragment.slice(whitespaceLastIndex),
                ];
            } else {
                return [fragment];
            }
        });
        // Flatten array (since it now contains nested fragments), and drop
        // any empty fragments (which might result from multiple
        // back-to-back spaces, which markdown will ignore anyway).
        rawContent = [].concat(...rawContent);
        rawContent = rawContent.filter(fragment => fragment !== "");
        return rawContent;
    },

    /**
     * Adjusts index of highlight to account for stray markdown or whitespace in
     * the rawContents of the page.
     */
    adjustIndexforMarkdownAndWhitespace: function(index, textArray) {
        // Ensure we don't index outside the bounds of the textArray
        const stopIter = Math.min(textArray.length - 1, index);
        for (let i=0; i<=stopIter; i++) {
            const match = textArray[i].match(/^\s+$/) || [
                "{highlighting.end}{highlighting.start}",
                "{highlighting.end}",
                "{highlighting.start}"
            ].includes(textArray[i]);
            if (match) {
                index++;
            }
        }
        return index;
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        return !_.isEqual(this.props, nextProps) ||
            !_.isEqual(this.state, nextState);
    },

    renderAddHighlightTooltip: function() {
        const positionX = `${this.state.mouseX}px`;
        const positionY = `${this.state.mouseY}px`;
        return <span
            onClick={this.handleConfirmHighlightClick}
            style={{position:'absolute', left: positionX, top: positionY}}
        >
            <img
                data-highlighting-tooltip={true}
                width="130"
                height="44"
                style={{
                    position: 'absolute',
                    top: "-54px",
                    left: "-65px",
                }}
                src='/images/perseus/add-highlight.svg'
            />
        </span>;

    },

    renderRemoveHighlightTooltip: function() {
        const positionX = `${this.state.mouseX}px`;
        const positionY = `${this.state.mouseY}px`;
        return <span
            onClick={this.handleRemoveHighlightClick}
            style={{position:'absolute', left: positionX, top: positionY}}
        >
            <img
                data-highlighting-tooltip={true}
                width="163"
                height="44"
                style={{
                    position: 'absolute',
                    top: '-54px',
                    left: '-81px',
                }}
                src='/images/perseus/remove-highlight.svg'
            />
        </span>;
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
                    return <span>
                        {lineN + this.state.startLineNumbersAfter}
                    </span>;
                }
            });
        }

        let highlightStartText = "{highlighting.start}";
        let highlightEndText = "{highlighting.end}";

        if (this.props.reviewModeRubric) {
            highlightStartText = "{review-highlighting.start}";
            highlightEndText = "{review-highlighting.end}";
        }

        let rawContent = this.props.passageText;
        // For each highlighted passage, we (ephemerally) inject highlight
        // markdown into the rawContent.
        _.each(this.props.highlightRanges, function(highlightRange) {
            rawContent = rawContent.replace(/\n +\n/g, "\n\n");
            rawContent = rawContent.replace(/\r\n +\r\n/g, "\r\n\r\n");
            const textArray = this.stringToArrayOfWords(rawContent);
            const rangeStartIndex =
                this.adjustIndexforMarkdownAndWhitespace(
                    highlightRange[0], textArray);
            const rangeEndIndex =
                this.adjustIndexforMarkdownAndWhitespace(
                    highlightRange[1], textArray);

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
                textArray.slice(0, rangeStartIndex).join(" ") + " " +
                textArray
                    .slice(rangeStartIndex, rangeEndIndex + 1)
                    .map(function(fragment) {
                        // This fragment should contain all user-visible
                        // characters, and no markdown characters!
                        // TODO (davidpowell/mdr): Change regex to blacklist
                        // markdown as oppose to whitelisting certain
                        // characters.
                        /* eslint-disable */
                        const textRegex = new RegExp("[\\(\\)\\—\\-\\—\\-\\‑\\.\
                                            \\[\\]\\+\\$\\?,!A-Za-z0-9\
                                            \u00C0-\u017F:;'‘’\"“”=%<>\s]+");
                        /* eslint-enabled */
                        const highlightableMatch = (fragment.match(textRegex));
                        if (highlightableMatch) {
                            const matchStart = highlightableMatch.index;
                            const matchEnd = (
                                    matchStart + highlightableMatch[0].length);
                            return (fragment.slice(0, matchStart) +
                                    highlightStartText +
                                    fragment.slice(matchStart, matchEnd) +
                                    highlightEndText +
                                    fragment.slice(matchEnd));
                        } else {
                            return fragment;
                        }
                    })
                    .join(highlightStartText + " " + highlightEndText) +
                " " +
                textArray.slice(rangeEndIndex + 1).join(" "));
        }, this);

        const parseState = {};
        const parsedContent = PassageMarkdown.parse(rawContent, parseState);

        // Check if the title has any non-empty text in it.
        const hasTitle = /\S/.test(this.props.passageTitle);

        return <div>
            <div
                onMouseUp={this.handleMouseUp}
                className="perseus-widget-passage-container"
            >
                {this._renderInstructions(parseState)}
                <div className="perseus-widget-passage">
                    {hasTitle && <h3 className="passage-title">
                        <Renderer content={this.props.passageTitle} />
                    </h3>}
                    {lineNumbers &&
                        <div className="line-numbers" aria-hidden={true}>
                            {lineNumbers}
                        </div>
                    }
                    {!hasTitle && <h3 className="perseus-sr-only">
                        {i18n._("Beginning of reading passage.")}
                    </h3>}
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
            </div>
            {this.state.newHighlightRange && this.renderAddHighlightTooltip()}
            {this.state.selectedHighlightRange &&
                this.renderRemoveHighlightTooltip()}
        </div>;
    },

    componentDidMount: function() {
        this._updateState();
        window.addEventListener("mousedown", this.handleMouseDown);

        this._onResize = _.throttle(() => {
            // Remeasure the line height on resize, because the only line
            // height changes we expect are subpixel changes when the user
            // zooms in/out, and the only way to listen for zoom events is to
            // listen for resize events.
            this._lineHeightMeasurer.forceMeasureLineHeight();
            this._updateState();
        }, 500);
        window.addEventListener("resize", this._onResize);
    },

    componentWillUnmount: function() {
        window.removeEventListener("mousedown", this.handleMouseDown);
        window.removeEventListener("resize", this._onResize);
    },

    componentDidUpdate: function() {
        this._updateState();
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
        const lineHeight = this._getLineHeight();
        const nLines = Math.round(contentsHeight / lineHeight);
        return nLines;
    },

    _getInitialLineNumber: function() {
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
            <LineHeightMeasurer ref={e => this._lineHeightMeasurer = e} />
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

    _getLineHeight: function() {
        return this._lineHeightMeasurer.measureLineHeight();
    },

    _convertPosToLineNumber: function(absoluteVPos) {
        const $content = $(ReactDOM.findDOMNode(this.refs.content));
        const relativeVPos = absoluteVPos - $content.offset().top;
        const lineHeight = this._getLineHeight();

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
