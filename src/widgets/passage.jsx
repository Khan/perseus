/** @jsx React.DOM */

var Changeable   = require("../mixins/changeable.jsx");
var JsonifyProps = require("../mixins/jsonify-props.jsx");

var Editor = require("../editor.jsx");
var PropCheckBox  = require("../components/prop-check-box.jsx");
var Renderer = require("../renderer.jsx");
var TextListEditor = require("../components/text-list-editor.jsx");

var Passage = React.createClass({
    mixins: [JsonifyProps, Changeable],

    propTypes: {
        passageText: React.PropTypes.string,
        showLineNumbers: React.PropTypes.bool
    },

    getDefaultProps: function() {
        return {
            passageText: "",
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
            {lineNumbers && <div className="line-numbers">
                {lineNumbers}
            </div>}
            {Renderer({ ref: "renderer", content: this.props.passageText })}
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

    simpleValidate: function(rubric) {
        return Passage.validate(this.toJSON(), rubric);
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
    mixins: [JsonifyProps, Changeable],

    propTypes: {
        passageText: React.PropTypes.string,
        showLineNumbers: React.PropTypes.bool
    },

    getDefaultProps: function() {
        return {
            passageText: "",
            showLineNumbers: true
        };
    },

    render: function() {
        var editor = Editor({
            ref: "passage-editor",
            content: this.props.passageText,
            widgetEnabled: false,
            placeholder: "Type passage here...",
            onChange: (newProps) => {
                this.change({ passageText: newProps.content });
            }
        });
        return <div className="perseus-widget-passage-editor">

            Passage Text:
            {editor}
            <div className="perseus-widget-row">
                <PropCheckBox
                    label="Show line numbers"
                    labelAlignment="right"
                    showLineNumbers={this.props.showLineNumbers}
                    onChange={this.props.onChange} />
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
        return _.pick(editorProps, "passageText", "showLineNumbers");
    }
};
