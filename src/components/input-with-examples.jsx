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
        convertDotToTimes: React.PropTypes.bool
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
            onFocus: this.show,
            onBlur: this.hide,
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

    show: function() {
        this.setState({showExamples: true});
    },

    hide: function() {
        this.setState({showExamples: false});
    },

    focus: function() {
        this.refs.input.focus();
    }
});

module.exports = InputWithExamples;
