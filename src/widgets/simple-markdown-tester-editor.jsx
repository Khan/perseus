/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable comma-dangle, no-var, react/jsx-closing-bracket-location, react/prop-types, react/sort-comp */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

/**
 * This is the editor for the simple-markdown-tester widget. This is what shows
 * up on the left side of the screen in the demo. Only the question writer
 * sees this.
 */
var React = require('react');

var Changeable = require("../mixins/changeable.jsx");
var EditorJsonify = require("../mixins/editor-jsonify.jsx");

var TextArea = React.createClass({
    render: function() {
        return <textarea
            ref="input"
            value={this.props.value || ""}
            onChange={this.changeValue} />;
    },

    focus: function() {
        this.refs.input.focus();
        return true;
    },

    changeValue: function(e) {
        // Translating from the js event e to the value
        // of the textbox to send to onChange
        this.props.onChange(e.target.value);
    }
});

var SimpleMarkdownTesterEditor = React.createClass({
    mixins: [Changeable, EditorJsonify],

    getDefaultProps: function() {
        return {
            value: ""
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
                        ref="input" />
                </div>
            </label>
        </div>;
    },

    focus: function() {
        this.refs.input.focus();
        return true;
    }
});

module.exports = SimpleMarkdownTesterEditor;
