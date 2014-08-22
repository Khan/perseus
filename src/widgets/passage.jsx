/** @jsx React.DOM */

var Changeable   = require("../mixins/changeable.jsx");
var EditorJsonify = require("../mixins/editor-jsonify.jsx");
var WidgetJsonifyDeprecated = require("../mixins/widget-jsonify-deprecated.jsx");

var Editor = require("../editor.jsx");
var InfoTip = require("react-components/info-tip.jsx");
var PropCheckBox  = require("../components/prop-check-box.jsx");
var Renderer = require("../renderer.jsx");
var TextListEditor = require("../components/text-list-editor.jsx");
var PassageRefTarget = require("./passage-ref-target.jsx");

var Util = require("../util.js");

var REFTARGET_REGEX = /{{([\s\S]+?)}}/g;

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
        var $renderer = $(this.refs.renderer.getDOMNode());
        var contentsHeight = $renderer.height();
        var lineHeight = parseInt($renderer.css("line-height"));
        var nLines = Math.round(contentsHeight / lineHeight);
        this.setState({
            nLines: nLines
        });
    },

    _renderContent: function() {
        var rawContent = this.props.passageText;

        var widgets = {};
        var nextWidgetId = 1;
        var content = rawContent.replace(REFTARGET_REGEX,
                (allText, referencedText) => {
            var id = PassageRefTarget.name + " " + nextWidgetId;
            widgets[id] = {
                type: PassageRefTarget.name,
                graded: false,
                options: {content: referencedText},
                version: PassageRefTarget.version
            };
            nextWidgetId++;
            return "[[" + Util.snowman + " " + id + "]]";
        });

        return Renderer({
            ref: "renderer",
            content: content,
            widgets: widgets
        });
    },

    getReference: function(referenceNumber) {
        var id = PassageRefTarget.name + " " + referenceNumber;
        var reference = this.refs.renderer.interWidgets(id)[0];
        if (!reference) {
            return null;
        }

        var $renderer = $(this.refs.renderer.getDOMNode());
        var $reference = $(reference.getDOMNode());

        var vPos = $reference.offset().top - $renderer.offset().top;
        var height = $reference.height();
        var lineHeight = parseInt($renderer.css("line-height"));

        var firstLine = Math.round(vPos / lineHeight) + 1;
        var numLines = Math.round(height / lineHeight);
        var lastLine = firstLine + numLines - 1;
        return [firstLine, lastLine];
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
