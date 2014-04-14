/** @jsx React.DOM */

require("../core.js");
var Util = require("../util.js");
var knumber = KhanUtil.knumber;
var toNumericString = KhanUtil.toNumericString;

/* If str represents a valid number, return that number.
 * Otherwise, if str is empty, return null.
 * Otherwise, return defaultValue
 */
function numberFromString(str, defaultValue) {
    if (str === "") {
        return null;
    } else {
        var result = Util.firstNumericalParse(str);
        return _.isFinite(result) ? result : defaultValue;
    }
}

var isNumericString = (function() {
    // Specify a result that could only be returned by
    // numberFromString if it was specified as the default
    // null and undefined are less nice because numberFromString
    // could return null, and we want that case to return true here.
    var defaultResult = {};
    return function isNumericString(str) {
        var result = numberFromString(str, defaultResult);
        return result !== defaultResult;
    };
})();

/* An input box that accepts only numeric strings
 *
 * Calls onChange when a valid number is entered.
 * Reverts to the current value onBlur or on [ENTER]
 * Accepts empty input and sends it to onChange as null
 * if no numeric placeholder is set.
 */
var NumberInput = React.createClass({
    getDefaultProps: function() {
        return {
            value: null,
            placeholder: null,
            format: null
        };
    },

    getInitialState: function() {
        return {
            format: this.props.format
        };
    },

    render: function() {
        cx = React.addons.classSet;

        var classes = cx({
            "number-input": true,
            "number-input-label": this.props.label != null
        });

        var input = React.DOM.input(_.extend({}, this.props, {
            className: classes,
            type: "text",
            ref: "input",
            onChange: this._handleChange,
            onBlur: this._handleBlur,
            onKeyPress: this._handleBlur,
            defaultValue: toNumericString(this.props.value, this.state.format),
            value: undefined
        }));

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
        var value = this.refs.input.getDOMNode().value;

        if (value === "") {
            placeholder = this.props.placeholder;
            return _.isFinite(placeholder) ? +placeholder : null;
        } else {
            var result = Util.firstNumericalParse(value);
            return _.isFinite(result) ? result : this.props.value;
        }
    },

    /* Set text input focus to this input */
    focus: function() {
        this.refs.input.getDOMNode().focus();
    },

    _handleChange: function(e) {
        var text = e.target.value;
        if (isNumericString(text)) {
            this.props.onChange(this.getValue());
        }
        if (this.props.format == null && KhanUtil.getFormat(text) != null) {
            this.setState({format: KhanUtil.getFormat(text)});
        }
    },

    _handleBlur: function(e) {
        // Only continue on blur or "enter"
        if (e.type === "keypress" && e.keyCode !== 13) {
            return;
        }

        var text = this.refs.input.getDOMNode().value;
        if (!isNumericString(text)) {
            this._setValue(this.props.value, this.state.format);
        }
    },

    _setValue: function(val, format) {
        $(this.refs.input.getDOMNode()).val(toNumericString(val, format));
    }
});

module.exports = NumberInput;

