var React = require('react');
var _ = require("underscore");

var Changeable = require("../mixins/changeable.jsx");
var EditorJsonify = require("../mixins/editor-jsonify.jsx");

var PerseusMarkdown = require("../perseus-markdown.jsx");
var mdParse = PerseusMarkdown.parse;
var mdOutput = PerseusMarkdown.testOutput;

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
    },

    statics: {
        displayMode: "block"
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
 * This is the widget's editor. This is what shows up on the left side
 * of the screen in test.html. Only the question writer sees this.
 */
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


/**
 * For this widget to work, we must require() this file in src/all-widgets.js
 */
module.exports = {
    name: "simple-markdown-tester",
    displayName: "Simple Markdown Tester",
    hidden: true,   // Hides this widget from the Perseus.Editor widget select
    widget: SimpleMarkdownTester,
    editor: SimpleMarkdownTesterEditor,
    transform: _.identity
};
