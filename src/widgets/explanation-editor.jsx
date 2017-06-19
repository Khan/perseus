/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable no-var, react/forbid-prop-types, react/jsx-closing-bracket-location, react/sort-comp */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

const React = require("react");
const _ = require("underscore");

const Changeable = require("../mixins/changeable.jsx");
const JsonifyProps = require("../mixins/jsonify-props.jsx");

const Editor = require("../editor.jsx");
const TextInput = require("../components/text-input.jsx");

const defaultExplanationProps = {
    showPrompt: "顯示說明",
    hidePrompt: "隱藏說明",
    explanation: "",
    widgets: {},
};

const ExplanationEditor = React.createClass({
    mixins: [Changeable, JsonifyProps],
    propTypes: {
        ...Changeable.propTypes,
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
                顯示說明的提示文字: <TextInput
                    value={this.props.showPrompt}
                    onChange={this.change("showPrompt")} />
            </label></div>
            <div className="perseus-widget-row"><label>
                隱藏說明的提示文字: <TextInput
                    value={this.props.hidePrompt}
                    onChange={this.change("hidePrompt")} />
            </label></div>
            <div className="perseus-widget-row">
                <Editor
                    apiOptions={this.props.apiOptions}
                    content={this.props.explanation}
                    widgets={this.props.widgets}
                    widgetEnabled={false}
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
    },
});

module.exports = ExplanationEditor;
