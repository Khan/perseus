/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable react/sort-comp */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

const React = require("react");
const _ = require("underscore");

const Changeable = require("../mixins/changeable.jsx");
const EditorJsonify = require("../mixins/editor-jsonify.jsx");

const Editor = require("../editor.jsx");
const TextInput = require("../components/text-input.jsx");

const defaultExplanationProps = {
    explanation: "explanation goes here\n\nmore explanation",
    hidePrompt: "Hide explanation",
    showPrompt: "Explain",
    widgets: {},
};

const ExplanationEditor = React.createClass({
    mixins: [EditorJsonify, Changeable],

    propTypes: {
        explanation: React.PropTypes.string,
        hidePrompt: React.PropTypes.string,
        showPrompt: React.PropTypes.string,
        // TODO(JJC1138): This could be replaced with a more specific prop spec:
        widgets: React.PropTypes.any,
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
                    onChange={this.change("showPrompt")}
                />
            </label></div>
            <div className="perseus-widget-row"><label>
                Prompt to hide explanation: <TextInput
                    value={this.props.hidePrompt}
                    onChange={this.change("hidePrompt")}
                />
            </label></div>
            <div className="perseus-widget-row">
                <Editor
                    content={this.props.explanation}
                    widgets={this.props.widgets}
                    widgetEnabled={true}
                    immutableWidgets={false}
                    onChange={(props) => {
                        const newProps = {};
                        if (_.has(props, "content")) {
                            newProps.explanation = props.content;
                        }
                        if (_.has(props, "widgets")) {
                            newProps.widgets = props.widgets;
                        }
                        this.change(newProps);
                    }}
                />
            </div>
        </div>;
    },
});

module.exports = ExplanationEditor;
