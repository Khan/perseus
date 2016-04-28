/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable react/sort-comp */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

const React = require('react');

const Changeable = require("../mixins/changeable.jsx");
const EditorJsonify = require("../mixins/editor-jsonify.jsx");

/**
 * This is the widget's editor. This is what shows up on the left side
 * of the screen in the demo. Only the question writer sees this.
 */
const ExampleWidgetEditor = React.createClass({
    mixins: [Changeable, EditorJsonify],

    propTypes: {
        correct: React.PropTypes.string,
    },

    getDefaultProps: function() {
        return {
            correct: "",
        };
    },

    handleAnswerChange: function(event) {
        this.change({
            correct: event.target.value,
        });
    },

    render: function() {
        return <div>
            <label>
                Correct answer:
                <input
                    value={this.props.correct}
                    onChange={this.handleAnswerChange}
                    ref="input"
                />
            </label>
        </div>;
    },

    focus: function() {
        this.refs.input.focus();
        return true;
    },
});

module.exports = ExampleWidgetEditor;
