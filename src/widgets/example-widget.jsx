/** @jsx React.DOM */

/**
 * This is a simple number-entry widget
 * It is not as powerful as number-input, but has a simpler, more
 * representative structure as an example widget, and is easier to
 * test new ideas on.
 *
 * TODO(jack): Add more comments
 */

var Widgets = require("../widgets.js");
var Changeable = require("../mixins/changeable.jsx");
var JsonifyProps = require("../mixins/jsonify-props.jsx");

var knumber = KhanUtil.knumber;

var TextInput = React.createClass({
    render: function() {
        return <input
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

/**
 * This is the widget's renderer. It shows up in the right column
 * in test.html, and is what is visible to users, and where
 * users enter their answers.
 */
var ExampleWidget = React.createClass({
    propTypes: {
        value: React.PropTypes.string
    },

    getDefaultProps: function() {
        return {
            value: ""
        };
    },

    /**
     * Changeling creates this.change() to tell our parent to update our props
     *
     * JsonifyProps creates this.toJSON() which returns the state of the widget
     * for checking the answer in simpleValidate
     */
    mixins: [Changeable, JsonifyProps],

    render: function() {
        return <TextInput
            ref="input"
            value={this.props.value}
            onChange={this.change("value")} />;
    },

    /**
     * Widgets that are focusable should add a focus method that returns
     * true if focusing succeeded. The first such widget found will be
     * focused on page load.
     */
    focus: function() {
        this.refs.input.focus();
        return true;
    },

    /**
     * simpleValidate is called for grading. Rubric is the result of calling
     * toJSON() on the editor that created this widget.
     *
     * Should return an object representing the grading result, such as
     * {
     *     type: "points",
     *     earned: 1,
     *     total: 1,
     *     message: null
     * }
     */
    simpleValidate: function(rubric) {
        return ExampleWidget.validate(this.toJSON(), rubric);
    }
});


/**
 * This is the widget's grading function
 */
_.extend(ExampleWidget, {
    /**
     * simpleValidate generally defers to this function
     *
     * state is usually the result of toJSON on the widget
     * rubric is the result of calling toJSON() on the editor
     */
    validate: function(state, rubric) {
        if (state.value === "") {
            return {
                type: "invalid",
                message: "It looks like you haven't answered all of the " +
                    "question yet."
            };
        } else if (state.value === rubric.correct) {
            return {
                type: "points",
                earned: 1,
                total: 1,
                message: null
            };
        } else {
            return {
                type: "points",
                earned: 0,
                total: 1,
                message: null
            };
        }
    }
});


/**
 * This is the widget's editor. This is what shows up on the left side
 * of the screen in test.html. Only the question writer sees this.
 */
var ExampleWidgetEditor = React.createClass({
    mixins: [Changeable, JsonifyProps],

    getDefaultProps: function() {
        return {
            correct: ""
        };
    },

    handleAnswerChange: function(e) {
        this.change("correct", e.target.value);
        // Could also write:
        // this.change({
        //     correct: e.target.value
        // });
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


/**
 * For this widget to work, we must register it.
 * We also must require() this file in src/all-widgets.js
 *
 * TODO(jack): Eventually make all-widgets.js do the
 * registration, and use module.exports to save the
 * renderer and editor.
 */
Widgets.register("example-widget", ExampleWidget);
Widgets.register("example-widget-editor", ExampleWidgetEditor);

