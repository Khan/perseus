/** @jsx React.DOM */

require("../core.js");
var Util = require("../util.js");
var knumber = KhanUtil.knumber;

/* If str represents a valid number, return that number.
 * Otherwise, if str is empty and allowEmpty is true, return
 * null.
 * Otherwise, return defaultValue
 */
function numberFromString(str, defaultValue, allowEmpty) {
    if (str === "") {
        return allowEmpty ? null : defaultValue;
    } else {
        var result = Util.firstNumericalParse(str);
        return _.isFinite(result) ? result : defaultValue;
    }
}

var isNumericString = (function() {
    // Specify a result that could only be returned by
    // numberFromString if it was specified as the default
    // null and undefined are less nice because numberFromString
    // could return null if allowEmpty is true, and we want
    // that case to return true here.
    var defaultResult = {};
    return function isNumericString(str, allowEmpty) {
        var result = numberFromString(str, defaultResult, allowEmpty);
        return result !== defaultResult;
    };
})();

// TODO (jack): It would be nice if this did more of the inverse of
// numberFromString, handling fractions and such.
function stringFromNumber(num) {
    return num != null ? String(num) : "";
}

/* An input box that accepts only numbers
 *
 * Calls onChange when a valid number is entered.
 * Reverts to the current value onBlur or on [ENTER]
 * Optionally accepts empty input and sends it to
 * onChange as null
 */
var NumberInput = React.createClass({
    getDefaultProps: function() {
        return {
            allowEmpty: false,
            value: null,
            placeholder: null
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
            onChange: this._handleChange,
            onBlur: this._handleBlur,
            onKeyPress: this._handleBlur,
            defaultValue: stringFromNumber(this.props.value),
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
            this._setValue(this.props.value);
        }
    },

    /* Return true if the empty string is a valid value for our text input
     *
     * This is the case if props.allowEmpty is explicitly specified, or if
     * a placeholder value is specified (which will be returned instead of
     * null in the case of an empty text input)
     */
    _allowEmpty: function() {
        return this.props.allowEmpty || this.props.placeholder != null;
    },

    /* Return the current value of this input
     *
     * Takes into account whether props.allowEmpty is specified (allowing null
     * to be returned in the case of an empty string), and props.placeholder,
     * which will be returned in the case of an empty string otherwise.
     */
    getValue: function() {
        var text = this.getDOMNode().value;
        var num = numberFromString(text, this.props.value, true);
        if (num !== null) {
            return num;
        } else if (this.props.allowEmpty) {
            return null;
        } else if (this.props.placeholder != null) {
            return this.props.placeholder;
        } else {
            return this.props.value;
        }
    },

    /* Set text input focus to this input */
    focus: function() {
        this.getDOMNode().focus();
    },

    _handleChange: function(e) {
        var text = e.target.value;
        if (isNumericString(text, this._allowEmpty())) {
            this.props.onChange(this.getValue());
        }
    },

    // TODO (jack): This should revert to the last valid string
    // rather than the string of the number, to avoid situations
    // like "2/3a" turning into "0.66666666666..."
    _handleBlur: function(e) {
        // Only continue on blur or "enter"
        if (e.type === "keypress" && e.keyCode !== 13) {
            return;
        }

        var text = this.getDOMNode().value;
        if (!isNumericString(text, this._allowEmpty())) {
            this._setValue(this.props.value);
        }
    },

    _setValue: function(val) {
        $(this.getDOMNode()).val(stringFromNumber(val));
    }
});

module.exports = NumberInput;

