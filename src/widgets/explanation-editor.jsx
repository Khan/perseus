/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable comma-dangle, no-var, react/forbid-prop-types, react/jsx-closing-bracket-location, react/jsx-sort-prop-types, react/sort-comp */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

var React = require("react");
var _ = require("underscore");

var Changeable = require("../mixins/changeable.jsx");
var EditorJsonify = require("../mixins/editor-jsonify.jsx");

var Editor = require("../editor.jsx");
var TextInput = require("../components/text-input.jsx");

var defaultExplanationProps = {
    showPrompt: "Explain",
    hidePrompt: "Hide explanation",
    explanation: "explanation goes here\n\nmore explanation",
    widgets: {},
};

var ExplanationEditor = React.createClass({
    mixins: [EditorJsonify, Changeable],

    propTypes: {
        showPrompt: React.PropTypes.string,
        hidePrompt: React.PropTypes.string,
        explanation: React.PropTypes.string,
        widgets: React.PropTypes.object,
        apiOptions: React.PropTypes.any,
    },

    getDefaultProps: function() {
        return defaultExplanationProps;
    },

    getInitialState: function() {
        return {
        };
    },

    render: function() {
        return <div className="perseus-widget-explanation-editor">
            <div className="perseus-widget-row"><label>
                Prompt to show explanation: <TextInput
                    value={this.props.showPrompt}
                    onChange={this.change("showPrompt")} />
            </label></div>
            <div className="perseus-widget-row"><label>
                Prompt to hide explanation: <TextInput
                    value={this.props.hidePrompt}
                    onChange={this.change("hidePrompt")} />
            </label></div>
            <div className="perseus-widget-row">
                <Editor
                    apiOptions={this.props.apiOptions}
                    content={this.props.explanation}
                    widgets={this.props.widgets}
                    widgetEnabled={true}
                    immutableWidgets={false}
                    onChange={(props) => {
                        var newProps = {};
                        if (_.has(props, "content")) {
                            newProps.explanation = props.content;
                        }
                        if (_.has(props, "widgets")) {
                            newProps.widgets = props.widgets;
                        }
                        this.change(newProps);
                    }} />
            </div>
        </div>;
    }
});

module.exports = ExplanationEditor;
