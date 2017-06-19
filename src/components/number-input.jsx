var React = require('react');
var ReactDOM = require("react-dom");
var classNames = require("classnames");
var firstNumericalParse = require("../util.js").firstNumericalParse;
var captureScratchpadTouchStart =
        require("../util.js").captureScratchpadTouchStart;
var knumber = KhanUtil.knumber;
var toNumericString = KhanUtil.toNumericString;
var getNumericFormat = KhanUtil.getNumericFormat;

/* An input box that accepts only numeric strings
 *
 * Calls onChange(value, format) for valid numbers.
 * Reverts to the current value onBlur or on [ENTER],
 *   but maintains the format (i.e. 3/2, 1 1/2, 150%)
 * Accepts empty input and sends it to onChange as null
 *   if no numeric placeholder is set.
 * If given a checkValidity function, will turn
 *   the background/outline red when invalid
 * If useArrowKeys is set to true, up/down arrows will
 *   increment/decrement integers
 * Optionally takes a size ("mini", "small", "normal")
 */
var NumberInput = React.createClass({
    propTypes: {
        value: React.PropTypes.number,
        format: React.PropTypes.string,
        placeholder: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number
        ]),
        onChange: React.PropTypes.func.isRequired,
        onFormatChange: React.PropTypes.func,
        checkValidity: React.PropTypes.func,
        size: React.PropTypes.string
    },

    getDefaultProps: function() {
        return {
            value: null,
            placeholder: null,
            format: null,
            onFormatChange: () => null,
            checkValidity: () => true,
            useArrowKeys: false
        };
    },

    getInitialState: function() {
        return {
            format: this.props.format
        };
    },

    render: function() {
        var classes = classNames({
            "number-input": true,
            "number-input-label": this.props.label != null,
            "invalid-input": !this._checkValidity(this.props.value),
            "mini": this.props.size === "mini",
            "small": this.props.size === "small",
            "normal": this.props.size === "normal"
        });
        if (this.props.className != null) {
            classes = [classes, this.props.className].join(" ");
        }

        var input = <input
            {...this.props}
            className={classes}
            type="text"
            ref="input"
            onChange={this._handleChange}
            onBlur={this._handleBlur}
            onKeyPress={this._handleBlur}
            onKeyDown={this._onKeyDown}
            onTouchStart={captureScratchpadTouchStart}
            defaultValue={toNumericString(this.props.value, this.state.format)}
            value={undefined}
        />;

        if (this.props.label) {
            return <label>{this.props.label}{input}</label>;
        } else {
            return input;
        }
    },

    componentDidUpdate: function(prevProps) {
        if (!knumber.equal(this.getValue(), this.props.value)) {
            this._setValue(this.props.value, this.state.format);
        }
    },

    /* Return the current "value" of this input
     * If empty, it returns the placeholder (if it is a number) or null
     */
    getValue: function() {
        return this.parseInputValue(ReactDOM.findDOMNode(this.refs.input).value);
    },

    parseInputValue: function(value) {
        if (value === "") {
            var placeholder = this.props.placeholder;
            return _.isFinite(placeholder) ? +placeholder : null;
        } else {
            var result = firstNumericalParse(value);
            return _.isFinite(result) ? result : this.props.value;
        }
    },

    /* Set text input focus to this input */
    focus: function() {
        ReactDOM.findDOMNode(this.refs.input).focus();
    },

    _checkValidity: function(value) {
        if(value == null) {
            return true;
        }

        var val = firstNumericalParse(value);
        var checkValidity = this.props.checkValidity;

        return _.isFinite(val) && checkValidity(val);
    },

    _handleChange: function(e) {
        var text = e.target.value;
        var value = this.parseInputValue(text);
        var format = getNumericFormat(text);

        this.props.onChange(value);
        if (format) {
            this.props.onFormatChange(value, format);
            this.setState({format: format});
        }
    },

    _handleBlur: function(e) {
        // Only continue on blur or "enter"
        if (e.type === "keypress" && e.keyCode !== 13) {
            return;
        }

        this._setValue(this.props.value, this.state.format);
    },

    _onKeyDown: function(e) {
        if (!this.props.useArrowKeys ||
            !_.contains(["ArrowUp", "ArrowDown"], e.key)) {
            return;
        }

        var val = this.getValue();
        if (val !== Math.floor(val)) {
            return; // bail if not an integer
        }

        if (e.key === "ArrowUp") {
            val = val + 1;
        } else if (e.key === "ArrowDown") {
            val = val - 1;
        }

        if (this._checkValidity(val)) {
            this.props.onChange(val);
        }
    },

    _setValue: function(val, format) {
        $(ReactDOM.findDOMNode(this.refs.input)).val(toNumericString(val, format));
    }
});

module.exports = NumberInput;
