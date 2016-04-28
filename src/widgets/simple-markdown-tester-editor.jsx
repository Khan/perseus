/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable react/sort-comp */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

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

    render: function() {
        return <textarea
            ref="input"
            value={this.props.value || ""}
            onChange={this.changeValue}
        />;
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
});

const SimpleMarkdownTesterEditor = React.createClass({
    mixins: [Changeable, EditorJsonify],

    propTypes: {
        value: React.PropTypes.string,
    },

    getDefaultProps: function() {
        return {
            value: "",
        };
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

    focus: function() {
        this.refs.input.focus();
        return true;
    },
});

module.exports = SimpleMarkdownTesterEditor;
