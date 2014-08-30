/** @jsx React.DOM */

var Changeable   = require("../mixins/changeable.jsx");
var EditorJsonify = require("../mixins/editor-jsonify.jsx");
var WidgetJsonifyDeprecated = require("../mixins/widget-jsonify-deprecated.jsx");

var Editor = require("../editor.jsx");
var Renderer = require("../renderer.jsx");
var InfoTip = require("react-components/info-tip.jsx");
var PropCheckBox  = require("../components/prop-check-box.jsx");
var PassageMarkdown = require("./passage/passage-markdown.jsx");
var TextListEditor = require("../components/text-list-editor.jsx");

var Util = require("../util.js");

var Passage = React.createClass({
    mixins: [WidgetJsonifyDeprecated, Changeable],

    propTypes: {
        passageTitle: React.PropTypes.string,
        passageText: React.PropTypes.string,
        footnotes: React.PropTypes.string,
        showLineNumbers: React.PropTypes.bool
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
            nLines: null
        };
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        return !_.isEqual(this.props, nextProps) ||
            !_.isEqual(this.state, nextState);
    },

    render: function() {
        var lineNumbers;
        var nLines = this.state.nLines;
        if (this.props.showLineNumbers && nLines) {
            lineNumbers = _.range(1, nLines + 1).map(function(lineN) {
                return lineN === 4 && nLines > 4 ?
                    <span className="line-marker">Line</span> :
                    (lineN % 5 === 0 ? lineN : "\n");
            });
        }
        return <div className="perseus-widget-passage">
            <div className="passage-title">
                {Renderer({ content: this.props.passageTitle })}
            </div>
            {lineNumbers && <div className="line-numbers">
                {lineNumbers}
            </div>}
            <div className="passage-text">
                {this._renderContent()}
            </div>
            <div className="footnotes">
                {Renderer({ content: this.props.footnotes })}
            </div>
        </div>;
    },

    componentDidMount: function() {
        this._measureLines();
    },

    componentDidUpdate: function() {
        this._measureLines();
    },

    _measureLines: function() {
        var $renderer = $(this.refs.content.getDOMNode());
        var contentsHeight = $renderer.height();
        var lineHeight = parseInt($renderer.css("line-height"));
        var nLines = Math.round(contentsHeight / lineHeight);
        this.setState({
            nLines: nLines
        });
    },

    _renderContent: function() {
        var rawContent = this.props.passageText;
        var parsed = PassageMarkdown.parse(rawContent);
        return <div ref="content">
            {PassageMarkdown.output(parsed)}
        </div>;
    },

    _getStartRefLineNumber: function(referenceNumber) {
        var refRef = PassageMarkdown.START_REF_PREFIX + referenceNumber;
        var ref = this.refs[refRef];
        if (!ref) {
            return null;
        }

        var $ref = $(ref.getDOMNode());
        // We really care about the first text after the ref, not the
        // ref element itself:
        var $refText = $ref.next();
        if ($refText.length === 0) {
            // But if there are no elements after the ref, just
            // use the ref itself.
            $refText = $ref;
        }
        var vPos = $refText.offset().top;

        return this._convertPosToLineNumber(vPos) + 1;
    },

    _getEndRefLineNumber: function(referenceNumber) {
        var refRef = PassageMarkdown.END_REF_PREFIX + referenceNumber;
        var ref = this.refs[refRef];
        if (!ref) {
            return null;
        }

        var $ref = $(ref.getDOMNode());
        // We really care about the last text before the ref, not the
        // ref element itself:
        var $refText = $ref.prev();
        if ($refText.length === 0) {
            // But if there are no elements after the ref, just
            // use the ref itself.
            $refText = $ref;
        }
        var height = $refText.height();
        var vPos = $refText.offset().top;

        var line = this._convertPosToLineNumber(vPos + height);
        if (height === 0) {
            // If the element before the end ref span was the start
            // ref span, it might have 0 height. This is obviously not
            // the intended use case, but we should handle it gracefully.
            // If this is the case, then the "bottom" of our element is
            // actually the top of the line we're on, so we need to add
            // one to the line number.
            line += 1;
        }

        return line;
    },

    _convertPosToLineNumber: function(absoluteVPos) {
        var $content= $(this.refs.content.getDOMNode());
        var relativeVPos = absoluteVPos - $content.offset().top;
        var lineHeight = parseInt($content.css("line-height"));

        var line = Math.round(relativeVPos / lineHeight);
        return line;
    },

    getReference: function(referenceNumber) {
        var refStartLine = this._getStartRefLineNumber(referenceNumber);
        var refEndLine = this._getEndRefLineNumber(referenceNumber);
        if (refStartLine == null || refEndLine == null) {
            return null;
        }

        return [refStartLine, refEndLine];
    },

    simpleValidate: function(rubric) {
        return Passage.validate(this.getUserInput(), rubric);
    },

    statics: {
        displayMode: "block"
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

var PassageEditor = React.createClass({
    mixins: [EditorJsonify, Changeable],

    propTypes: {
        passageTitle: React.PropTypes.string,
        passageText: React.PropTypes.string,
        footnotes: React.PropTypes.string,
        showLineNumbers: React.PropTypes.bool
    },

    getDefaultProps: function() {
        return {
            passageTitle: "",
            passageText: "",
            footnotes: "",
            showLineNumbers: true
        };
    },

    render: function() {
        var passageEditor = Editor({
            ref: "passage-editor",
            content: this.props.passageText,
            widgetEnabled: false,
            placeholder: "Type passage here...",
            onChange: (newProps) => {
                this.change({ passageText: newProps.content });
            }
        });
        var footnotesEditor = Editor({
            ref: "passage-footnotes-editor",
            content: this.props.footnotes,
            widgetEnabled: false,
            placeholder: "Type footnotes here...",
            onChange: (newProps) => {
                this.change({ footnotes: newProps.content });
            }
        });
        return <div className="perseus-widget-passage-editor">
            <div className="perseus-widget-row">
                <PropCheckBox
                    label="Show line numbers"
                    labelAlignment="right"
                    showLineNumbers={this.props.showLineNumbers}
                    onChange={this.props.onChange} />
            </div>
            <div>
                Passage title:
                <InfoTip>
                    <p>An optional title that will appear directly above the
                    passage in the same font style. (E.g. Passage 1)</p>
                </InfoTip>
                <div>
                    <input
                        type="text"
                        defaultValue={this.props.passageTitle}
                        onChange={(e) => {
                            this.change({ passageTitle: e.target.value });
                        }} />
                </div>
            </div>
            <div>
                Passage Text:
                {passageEditor}
            </div>
            <div>
                Footnotes:
                <InfoTip>
                    <p>To add a footnote, use a superscript number ${}^1$ or
                    asterisk ${}^*$ in the passage text and reference it in
                    the footnote section.</p>
                </InfoTip>
                {footnotesEditor}
            </div>
        </div>;
    },
});

module.exports = {
    name: "passage",
    displayName: "Passage",
    widget: Passage,
    editor: PassageEditor,
    transform: (editorProps) => {
        return _.pick(editorProps, "passageTitle", "passageText", "footnotes",
            "showLineNumbers");
    }
};
