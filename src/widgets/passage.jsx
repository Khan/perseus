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
        return {};
    },

    render: function() {
        var nLines = this.props.passageText.split('\n').filter(function(n) {
                    return n.length;
                }).length;
        var lineNumbers = _.range(1, nLines + 1).map(function(lineN) {
                    return lineN === 4 && nLines > 4 ?
                        <span className="line-marker">Line</span> :
                        (lineN % 5 === 0 ? lineN : "\n");
                });

        return <div className="perseus-widget-passage">
            {this.props.showLineNumbers && <div className="line-numbers">
                {lineNumbers}
            </div>}
            {Renderer({ content: this.props.passageText })}
        </div>;
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