/** @jsx React.DOM */

var React = require('react');
var Tooltip = require("react-components/tooltip");

var MathInput = require("./math-input.jsx");
var Renderer  = require("../renderer.jsx");
var TextInput = require("./text-input.jsx");

var MATH = "math";
var TEXT = "text";

var InputWithExamples = React.createClass({
    propTypes: {
        type: React.PropTypes.oneOf([MATH, TEXT]),
        value: React.PropTypes.string,
        onChange: React.PropTypes.func.isRequired,
        className: React.PropTypes.string,
        examples: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
        shouldShowExamples: React.PropTypes.bool,
        convertDotToTimes: React.PropTypes.bool,
        interceptFocus: React.PropTypes.func
    },

    getDefaultProps: function() {
        return {
            type: TEXT,
            shouldShowExamples: true
        };
    },

    getInitialState: function() {
        return {
            showExamples: false
        };
    },

    render: function() {
        var examplesContent = _.map(this.props.examples, (example) => {
            return "- " + example;
        }).join("\n");

        var showExamples = this.props.shouldShowExamples &&
                this.state.showExamples;

        var inputProps = {
            className: this.props.className,
            value: this.props.value,
            onChange: this.props.onChange,
            onFocus: this.onFocus,
            onBlur: this.onBlur,
            autoCapitalize: "off",
            autoComplete: "off",
            autoCorrect: "off",
            spellCheck: "false",
            // HACK(aria): We make the input read-only if there is a
            // this.props.interceptFocus function, so that the focus can be
            // intercepted pre-focus for mobile, which doesn't want a
            // keyboard to pop up. Hacky, I know
            readOnly: this.props.interceptFocus != null,
            ref: "input"
        };

        var input = this.props.type === MATH ?
            MathInput(_.extend({
                convertDotToTimes: this.props.convertDotToTimes,
            }, inputProps)) :
            TextInput(inputProps);

        return <Tooltip
                ref="tooltip"
                className="perseus-formats-tooltip"
                horizontalPosition="left"
                horizontalAlign="right"
                verticalPosition="bottom"
                arrowSize={10}
                borderColor="#ccc"
                show={showExamples}>
            {input}
            <Renderer content={examplesContent} />
        </Tooltip>;
    },

    onFocus: function() {
        if (this.props.interceptFocus) {
            var interceptResult = this.props.interceptFocus();
            if (interceptResult === false) {
                return;
            }
        }
        this.show();
    },

    onBlur: function() {
        this.hide();
    },

    show: function() {
        this.setState({showExamples: true});
    },

    hide: function() {
        this.setState({showExamples: false});
    },

    focus: function() {
        this.refs.input.focus();
    },

    handleChange: function(e) {
        this.props.onChange(e.target.value);
    },

    getInputDOMNode: function() {
        return this.refs.input.getDOMNode();
    }
});

module.exports = InputWithExamples;
