var React = require('react');
var Tooltip = require("react-components/tooltip.jsx");
var _ = require("underscore");

var ApiClassNames = require("../perseus-api.jsx").ClassNames;
var MathInput  = require("./math-input.jsx");
var Renderer   = require("../renderer.jsx");
var TextInput  = require("./text-input.jsx");
var MathOutput = require("../components/math-output.jsx");

var captureScratchpadTouchStart =
        require("../util.js").captureScratchpadTouchStart;

var MATH = "math";
var TEXT = "text";
var TEX = "tex";

var InputWithExamples = React.createClass({
    propTypes: {
        type: React.PropTypes.oneOf([MATH, TEXT, TEX]),
        value: React.PropTypes.string,
        onChange: React.PropTypes.func.isRequired,
        className: React.PropTypes.string,
        examples: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
        shouldShowExamples: React.PropTypes.bool,
        convertDotToTimes: React.PropTypes.bool,
        buttonSet: React.PropTypes.string,
        buttonsVisible: React.PropTypes.oneOf(['always', 'never', 'focused']),
        onFocus: React.PropTypes.func,
        onBlur: React.PropTypes.func,
    },

    getDefaultProps: function() {
        return {
            type: TEXT,
            shouldShowExamples: true,
            onFocus: function() { },
            onBlur: function() { }
        };
    },

    getInitialState: function() {
        return {
            focused: false,
            showExamples: false
        };
    },

    _getInputClassName: function() {
        // <MathOutput> is a special component that manages its own class and
        // state, as it's a <span> that wants to act like an <input>.
        if (this.props.type === TEX) {
            return this.props.className;
        }

        // Otherwise, we need to add these INPUT and FOCUSED tags here.
        var className = ApiClassNames.INPUT + " " + ApiClassNames.INTERACTIVE;
        if (this.state.focused) {
            className += " " + ApiClassNames.FOCUSED;
        }
        if (this.props.className) {
            className += " " + this.props.className;
        }
        return className;
    },

    _getPropsForInputType: function() {
        // Minimal set of props, used by each input type
        var inputProps = {
            ref: "input",
            className: this._getInputClassName(),
            value: this.props.value,
            onFocus: this._handleFocus,
            onBlur: this._handleBlur
        };

        if (this.props.type === TEX) {
            return inputProps;
        }

        // Add useful props required for MATH and TEXT modes
        _.extend(inputProps, {
            buttonSet: this.props.buttonSet,
            buttonsVisible: this.props.buttonsVisible,
            onChange: this.props.onChange,
            onTouchStart: captureScratchpadTouchStart
        });

        // And add final props that are MATH- and TEXT-specific
        if (this.props.type === MATH) {
            return _.extend({
                convertDotToTimes: this.props.convertDotToTimes,
            }, inputProps);
        } else if (this.props.type === TEXT) {
            return _.extend({
                autoCapitalize: "off",
                autoComplete: "off",
                autoCorrect: "off",
                spellCheck: "false",
            }, inputProps);
        }
    },

    _getComponentForInputType: function() {
        switch (this.props.type) {
            case TEX:
                return MathOutput;

            case MATH:
                return MathInput;

            case TEXT:
                return TextInput;

            default:
                return null;
        }
    },

    _renderInput: function() {
        var inputProps = this._getPropsForInputType();
        var InputComponent = this._getComponentForInputType();
        return <InputComponent {...inputProps} />;
    },

    render: function() {
        var input = this._renderInput();

        // Static rendering, which doesn't include the 'tooltip' logic that the
        // other types require, and is hence handled separately.
        if (this.props.type === TEX) {
            return input;
        }

        // Else, we need to be able to show examples
        var examplesContent = _.map(this.props.examples, (example) => {
            return "- " + example;
        }).join("\n");

        var showExamples = this.props.shouldShowExamples &&
                this.state.showExamples;

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

    _handleFocus: function() {
        this.props.onFocus();
        this.setState({
            focused: true,
            showExamples: true
        });
    },

    show: function() {
        this.setState({showExamples: true});
    },

    hide: function() {
        this.setState({showExamples: false});
    },

    _handleBlur: function() {
        this.props.onBlur();
        this.setState({
            focused: false,
            showExamples: false
        });
    },

    focus: function() {
        this.refs.input.focus();
    },

    blur: function() {
        this.refs.input.blur();
    },

    handleChange: function(e) {
        this.props.onChange(e.target.value);
    }
});

module.exports = InputWithExamples;
