const React = require('react');

const Changeable = require("../mixins/changeable.jsx");
const EditorJsonify = require("../mixins/editor-jsonify.jsx");

/**
 * This is the widget's editor. This is what shows up on the left side
 * of the screen in the demo. Only the question writer sees this.
 */
const ExampleWidgetEditor = React.createClass({
    propTypes: {
        correct: React.PropTypes.string,
    },

    mixins: [Changeable, EditorJsonify],

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

    focus: function() {
        this.refs.input.focus();
        return true;
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
});

module.exports = ExampleWidgetEditor;
