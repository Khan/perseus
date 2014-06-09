/** @jsx React.DOM */

var React = require('react');
var Tooltip = require("react-components/tooltip");
var ApiClassNames = require("../perseus-api.jsx").ClassNames;

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
            focused: false,
            showExamples: false
        };
    },

    _getInputClassName: function() {
        // confining mutability!
        var className = ApiClassNames.INPUT;
        if (this.state.focused) {
            className += " " + ApiClassNames.FOCUSED;
        }
        if (this.props.className) {
            className += " " + this.props.className;
        }
        return className;
    },

    render: function() {
        var examplesContent = _.map(this.props.examples, (example) => {
            return "- " + example;
        }).join("\n");

        var showExamples = this.props.shouldShowExamples &&
                this.state.showExamples;

        var inputProps = {
            className: this._getInputClassName(),
            value: this.props.value,
            onChange: this.props.onChange,
            onFocus: this._onFocus,
            onBlur: this._onBlur,
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
                horizontalAlign="left"
                verticalPosition="bottom"
                arrowSize={10}
                borderColor="#ccc"
                show={showExamples}>
            {input}
            <Renderer content={examplesContent} />
        </Tooltip>;
    },

    _onFocus: function() {
        var showExamples = true;
        if (this.props.interceptFocus) {
            var interceptResult = this.props.interceptFocus();
            if (interceptResult === false) {
                showExamples = false;
            }
        }
        this.setState({
            focused: true,
            showExamples: showExamples
        });
    },

    show: function() {
        this.setState({showExamples: true});
    },

    hide: function() {
        this.setState({showExamples: false});
    },

    _onBlur: function() {
        this.setState({
            focused: false,
            showExamples: false
        });
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
