var React = require('react');
var Tooltip = require("react-components/js/tooltip.jsx");
var ApiClassNames = require("../perseus-api.jsx").ClassNames;

var MathInput = require("./math-input.jsx");
var Renderer  = require("../renderer.jsx");
var TextInput = require("./text-input.jsx");

var captureScratchpadTouchStart =
        require("../util.js").captureScratchpadTouchStart;

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
        interceptFocus: React.PropTypes.func,
        buttonSet: React.PropTypes.string,
        buttonsVisible: React.PropTypes.oneOf(['always', 'never', 'focused']),
        onFocus: React.PropTypes.func,
        onBlur: React.PropTypes.func
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
            buttonSet: this.props.buttonSet,
            buttonsVisible: this.props.buttonsVisible,
            onChange: this.props.onChange,
            onFocus: this._handleFocus,
            // HACK (jack): This fixes readonly inputs (from interceptFocus)
            // not getting focus events when clicked on mobile:
            onClick: this.props.interceptFocus != null ? this.focus : null,
            onBlur: this._handleBlur,
            onTouchStart: captureScratchpadTouchStart,
            ref: "input"
        };

        var input = this.props.type === MATH ?
            <MathInput
                convertDotToTimes={this.props.convertDotToTimes}
                {...inputProps}
            /> :
            <TextInput
                autoCapitalize="off"
                autoComplete="off"
                autoCorrect="off"
                spellCheck="false"
                readOnly={this.props.interceptFocus != null}
                {...inputProps}
            />;

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
        var showExamples = true;
        if (this.props.interceptFocus) {
            var interceptResult = this.props.interceptFocus();
            if (interceptResult === false) {
                showExamples = false;
            }
        }
        this.props.onFocus();
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

    handleChange: function(e) {
        this.props.onChange(e.target.value);
    },

    getInputDOMNode: function() {
        return this.refs.input;
    }
});

module.exports = InputWithExamples;
