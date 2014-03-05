/** @jsx React.DOM */

require("../core.js");
var Util = require("../util.js");
var knumber = KhanUtil.knumber;

/* Your go-to input box for numbers and number-like strings
 *
 * Features:
 * - Text Parsing: intelligently parses fractions (1/2), constants (pi), etc.
 *
 * - Validation: uses the owner's checkValidity function
 *
 * - Key Controls: Press up to increment, down to decrement. Stays in-bounds.
 *
 * TODO(brianmerlob): make it increment/decrement better; if invalid make it
 * go to the closest valid number if pressed in the relevant direction.
 * If it is a fraction or decimal, increment by the step size if provided
 *
 */
var ValidatedNumberInput = React.createClass({
    propTypes: {
        value: React.PropTypes.number,
        placeholder: React.PropTypes.any,
        onChange: React.PropTypes.func.isRequired,
        checkValidity: React.PropTypes.func,
    },

    getDefaultProps: function() {
        return {
            value: "",
            placeholder: null,
            checkValidity: function(){return true;}
        };
    },

    render: function() {
        cx = React.addons.classSet;

        var classes = cx({
            "validated-number-input": true,
            "invalid-input": !this._checkValidity(this.props.value),
            "mini": this.props.size === "mini",
            "small": this.props.size === "small",
            "normal": this.props.size === "normal",
        });

        var value = this.props.value == null ? "" : this.props.value;

        var input = React.DOM.input(_.extend({}, this.props, {
            className: classes,
            type: "text",
            ref: "input",
            onChange: this._handleChange,
            onBlur: this._handleBlur,
            onKeyPress: this._handleBlur,
            onKeyDown: this._onKeyDown,
            onInvalid: this._onInvalid,
            defaultValue: String(value),
            value: undefined
        }));

        if (this.props.label) {
            return <label>{this.props.label + " "} {input}</label>;
        } else {
            return input;
        }
    },

    componentDidUpdate: function(prevProps) {
        if (!knumber.equal(this.getValue(), this.props.value)) {
            $(this.refs["input"].getDOMNode()).val(this.props.value);
        }
    },

    // Return the current numeric "value" of this input (or null)
    getValue: function() {
        var value = this.refs["input"].getDOMNode().value;

        if (value === "") {
            if (_.isFinite(this.props.placeholder)) {
                return +this.props.placeholder;
            } else {
                return null;
            }
        } else {
            var result = Util.firstNumericalParse(value);
            if (_.isFinite(result)) {
                return result;
            } else {
                return this.props.value;
            }
        }
    },

    /* Set text input focus to this input */
    focus: function() {
        this.refs["input"].getDOMNode().focus();
    },

    _checkValidity: function(value) {
        if(value === "" || value == null) {
            return true;
        }

        var val = Util.firstNumericalParse(value);
        var checkValidity = this.props.checkValidity;

        return checkValidity(val) && _.isFinite(val);
    },

    _handleChange: function(e) {
        this.props.onChange(this.getValue());
    },

    _onKeyDown: function(e) {
        if (!_.contains(["ArrowUp", "ArrowDown"], e.key)) {
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
});

module.exports = ValidatedNumberInput;
