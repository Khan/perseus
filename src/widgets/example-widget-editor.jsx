/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable comma-dangle, no-var, react/jsx-closing-bracket-location, react/prop-types, react/sort-comp */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

var React = require('react');

var Changeable = require("../mixins/changeable.jsx");
var EditorJsonify = require("../mixins/editor-jsonify.jsx");

/**
 * This is the widget's editor. This is what shows up on the left side
 * of the screen in the demo. Only the question writer sees this.
 */
var ExampleWidgetEditor = React.createClass({
    mixins: [Changeable, EditorJsonify],

    getDefaultProps: function() {
        return {
            correct: ""
        };
    },

    handleAnswerChange: function(event) {
        this.change({
            correct: event.target.value
        });
    },

    render: function() {
        return <div>
            <label>
                Correct answer:
                <input
                    value={this.props.correct}
                    onChange={this.handleAnswerChange}
                    ref="input" />
            </label>
        </div>;
    },

    focus: function() {
        this.refs.input.focus();
        return true;
    }
});

module.exports = ExampleWidgetEditor;
