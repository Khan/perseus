/**
 * This is the editor for the simple-markdown-tester widget. This is what shows
 * up on the left side of the screen in the demo. Only the question writer
 * sees this.
 */
const React = require('react');

const Changeable = require("../mixins/changeable.jsx");
const EditorJsonify = require("../mixins/editor-jsonify.jsx");

const TextArea = React.createClass({
    propTypes: {
        onChange: React.PropTypes.func.isRequired,
        value: React.PropTypes.string,
    },

    focus: function() {
        this.refs.input.focus();
        return true;
    },

    changeValue: function(e) {
        // Translating from the js event e to the value
        // of the textbox to send to onChange
        this.props.onChange(e.target.value);
    },

    render: function() {
        return <textarea
            ref="input"
            value={this.props.value || ""}
            onChange={this.changeValue}
        />;
    },
});

const SimpleMarkdownTesterEditor = React.createClass({
    propTypes: {
        value: React.PropTypes.string,
    },

    mixins: [Changeable, EditorJsonify],

    getDefaultProps: function() {
        return {
            value: "",
        };
    },

    focus: function() {
        this.refs.input.focus();
        return true;
    },

    render: function() {
        return <div>
            <label>
                <div>Simple markdown contents:</div>
                <div>
                    <TextArea
                        value={this.props.value}
                        onChange={this.change("value")}
                        ref="input"
                    />
                </div>
            </label>
        </div>;
    },
});

module.exports = SimpleMarkdownTesterEditor;
