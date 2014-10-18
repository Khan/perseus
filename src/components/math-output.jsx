var React         = require("react");
var TeX           = require("react-components/tex.jsx");
var ApiClassNames = require("../perseus-api.jsx").ClassNames;
var Tooltip       = require("react-components/tooltip.jsx");
var ModifyTex     = require("../tex-wrangler.js").modifyTex;

var MathOutput = React.createClass({
    propTypes: {
        value: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number
        ]),
        className: React.PropTypes.string,
        onFocus: React.PropTypes.func,
        onBlur: React.PropTypes.func
    },

    getDefaultProps: function() {
        return {
            value: "",
            onFocus: function() { },
            onBlur: function() { }
        };
    },

    getInitialState: function() {
        return {
            focused: false,
            selectorNamespace: _.uniqueId("math-output")
        };
    },

    _getInputClassName: function() {
        var className = "math-output " + ApiClassNames.INPUT + " " +
            ApiClassNames.INTERACTIVE;
        if (this.state.focused) {
            className += " " + ApiClassNames.FOCUSED;
        }
        if (this.props.className) {
            className += " " + this.props.className;
        }
        return className;
    },

    _getDisplayValue: function(value) {
        // Cast from (potentially a) number to string
        var displayText;
        if (value != null) {
            displayText = "" + value;
        } else {
            displayText = "";
        }
        return ModifyTex(displayText);
    },

    render: function() {
        var divStyle = {
            textAlign: "center"
        };

        return <span ref="input"
                className={this._getInputClassName()}
                onMouseDown={this.focus}
                onTouchStart={this.focus}>
            <div style={divStyle}>
                <TeX>
                    {this._getDisplayValue(this.props.value)}
                </TeX>
            </div>
        </span>;
    },

    getValue: function() {
        return this.props.value;
    },

    focus: function() {
        if (!this.state.focused) {
            this.props.onFocus();
            this._bindBlurHandler();
            this.setState({
                focused: true
            });
        }
    },

    blur: function() {
        if (this.state.focused) {
            this.props.onBlur();
            this._unbindBlurHandler();
            this.setState({
                focused: false
            });
        }
    },

    _bindBlurHandler: function() {
        $(document).bind("vclick." + this.state.selectorNamespace, (e) => {
            // Detect whether the target has our React DOM node as a parent
            var $closestWidget = $(e.target).closest(this.getDOMNode());
            if (!$closestWidget.length) {
                this.blur();
            }
        });
    },

    _unbindBlurHandler: function() {
        $(document).unbind("." + this.state.selectorNamespace);
    },

    componentWillUnmount: function() {
        this._unbindBlurHandler();
    }
});

module.exports = MathOutput;
