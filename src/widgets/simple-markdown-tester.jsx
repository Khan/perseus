/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable comma-dangle, no-var, react/sort-comp */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

var React = require('react');
var _ = require("underscore");

var Changeable = require("../mixins/changeable.jsx");

var PerseusMarkdown = require("../perseus-markdown.jsx");
var mdParse = PerseusMarkdown.parse;
var mdOutput = PerseusMarkdown.basicOutput;

var SimpleMarkdownTester = React.createClass({
    propTypes: {
        value: React.PropTypes.string
    },

    getDefaultProps: function() {
        return {
            value: ""
        };
    },

    mixins: [Changeable],

    toJSON: function() {
        return {};
    },

    render: function() {
        var parsed = mdParse(this.props.value);
        var output = mdOutput(parsed);
        return <div>
            {output}
        </div>;
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
    }
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
            message: null
        };
    }
});

/**
 * For this widget to work, we must require() this file in src/all-widgets.js
 */
module.exports = {
    name: "simple-markdown-tester",
    displayName: "Simple Markdown Tester",
    hidden: true,   // Hides this widget from the Perseus.Editor widget select
    widget: SimpleMarkdownTester,
    transform: _.identity
};
