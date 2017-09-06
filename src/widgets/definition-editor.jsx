const React = require("react");
const _ = require("underscore");

const Changeable = require("../mixins/changeable.jsx");
const EditorJsonify = require("../mixins/editor-jsonify.jsx");

const Editor = require("../editor.jsx");
const TextInput = require("../components/text-input.jsx");

const DefinitionEditor = React.createClass({
    propTypes: {
        ...Changeable.propTypes,
        togglePrompt: React.PropTypes.string,
        definition: React.PropTypes.string,
        apiOptions: React.PropTypes.any,
    },

    getDefaultProps: function() {
        return {
            togglePrompt: "",
            definition: "",
        };
    },

    change(...args) {
        return Changeable.change.apply(this, args);
    },

    serialize() {
        return EditorJsonify.serialize.call(this);
    },

    render: function() {
        return (
            <div className="perseus-widget-definition-editor">
                <a
                    href="https://docs.google.com/document/d/1udaPef4imOfTMhmLDlWq4SM0mxL0r3YHFZE-5J1uGfo"
                    target="_blank"
                >
                    Definition style guide
                </a>
                <div className="perseus-widget-row">
                    <label>
                        Word to be defined:{" "}
                        <TextInput
                            value={this.props.togglePrompt}
                            onChange={this.change("togglePrompt")}
                            placeholder="define me"
                        />
                    </label>
                </div>
                <div className="perseus-widget-row">
                    <Editor
                        apiOptions={this.props.apiOptions}
                        content={this.props.definition}
                        widgetEnabled={false}
                        placeholder="definition goes here"
                        onChange={props => {
                            const newProps = {};
                            if (_.has(props, "content")) {
                                newProps.definition = props.content;
                            }
                            this.change(newProps);
                        }}
                    />
                </div>
            </div>
        );
    },
});

module.exports = DefinitionEditor;
