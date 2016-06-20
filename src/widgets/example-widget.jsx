/**
 * This is a simple number-entry widget
 * It is not as powerful as number-input, but has a simpler, more
 * representative structure as an example widget, and is easier to
 * test new ideas on.
 *
 * TODO(jack): Add more comments
 */

const React = require('react');
const Changeable = require("../mixins/changeable.jsx");
const _ = require("underscore");

const TextInput = React.createClass({
    propTypes: {
        onChange: React.PropTypes.func,
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
        return <input
            ref="input"
            value={this.props.value || ""}
            onChange={this.changeValue}
        />;
    },
});

/**
 * This is the widget's renderer. It shows up in the right column
 * in the demo, and is what is visible to users, and where
 * users enter their answers.
 */
const ExampleWidget = React.createClass({
    propTypes: {
        value: React.PropTypes.string,
    },

    /**
     * Changeable creates this.change() to tell our parent to update our props
     */
    mixins: [Changeable],

    getDefaultProps: function() {
        return {
            value: "",
        };
    },

    getUserInput: function() {
        return this.props.value;
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
     * getUserInput() on the editor that created this widget.
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
        return ExampleWidget.validate(this.getUserInput(), rubric);
    },

    render: function() {
        return <TextInput
            ref="input"
            value={this.props.value}
            onChange={this.change("value")}
        />;
    },
});


/**
 * This is the widget's grading function
 */
_.extend(ExampleWidget, {
    /**
     * simpleValidate generally defers to this function
     *
     * value is usually the result of getUserInput on the widget
     * rubric is the result of calling serialize() on the editor
     */
    validate: function(value, rubric) {
        if (value === "") {
            return {
                type: "invalid",
                message: "It looks like you haven't answered all of the " +
                    "question yet.",
            };
        } else if (value === rubric.correct) {
            return {
                type: "points",
                earned: 1,
                total: 1,
                message: null,
            };
        } else {
            return {
                type: "points",
                earned: 0,
                total: 1,
                message: null,
            };
        }
    },
});

/**
 * For this widget to work, we must require() this file in src/all-widgets.js
 */
module.exports = {
    name: "example-widget",
    displayName: "Example Widget",

    // Tell the renderer what type of `display:` style we would like
    // for the component wrapping this one.
    defaultAlignment: "inline-block",

    hidden: true,   // Hides this widget from the Perseus.Editor widget select
    widget: ExampleWidget,
};
