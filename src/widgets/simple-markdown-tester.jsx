const React = require('react');
const _ = require("underscore");

const Changeable = require("../mixins/changeable.jsx");

const PerseusMarkdown = require("../perseus-markdown.jsx");
const mdParse = PerseusMarkdown.parse;
const mdOutput = PerseusMarkdown.basicOutput;

const SimpleMarkdownTester = React.createClass({
    propTypes: {
        value: React.PropTypes.string,
    },

    mixins: [Changeable],

    getDefaultProps: function() {
        return {
            value: "",
        };
    },

    toJSON: function() {
        return {};
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
        return SimpleMarkdownTester.validate(this.toJSON(), rubric);
    },

    render: function() {
        const parsed = mdParse(this.props.value);
        const output = mdOutput(parsed);
        return <div>
            {output}
        </div>;
    },
});


/**
 * This is the widget's grading function
 */
_.extend(SimpleMarkdownTester, {
    /**
     * simpleValidate generally defers to this function
     *
     * state is usually the result of toJSON on the widget
     * rubric is the result of calling toJSON() on the editor
     */
    validate: function(state, rubric) {
        return {
            type: "points",
            earned: 0,
            total: 0,
            message: null,
        };
    },
});

/**
 * For this widget to work, we must require() this file in src/all-widgets.js
 */
module.exports = {
    name: "simple-markdown-tester",
    displayName: "Simple Markdown Tester",
    hidden: true,   // Hides this widget from the Perseus.Editor widget select
    widget: SimpleMarkdownTester,
    transform: _.identity,
};
