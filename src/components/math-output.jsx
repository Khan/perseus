/** @jsx React.DOM */

var React         = require("react");
var TeX           = require("../tex.jsx");
var ApiClassNames = require("../perseus-api.jsx").ClassNames;
var Tooltip       = require("react-components/tooltip.jsx");

var MathOutput = React.createClass({
    propTypes: {
        value: React.PropTypes.string,
        className: React.PropTypes.string,
        onFocus: React.PropTypes.func,
        onBlur: React.PropTypes.func
    },

    getDefaultProps: function () {
        return {
            value: "",
            onFocus: function () { },
            onBlur: function () { }
        };
    },

    getInitialState: function () {
        return {
            focused: false,
            selectorNamespace: _.uniqueId("math-output")
        };
    },

    _getInputClassName: function() {
        var className = "math-output " + ApiClassNames.INPUT;
        if (this.state.focused) {
            className += " " + ApiClassNames.FOCUSED;
        }
        if (this.props.className) {
            className += " " + this.props.className;
        }
        return className;
    },

    render: function () {
        var divStyle = {
            textAlign: "center"
        };
        return <span ref="input"
                className={this._getInputClassName()}
                onMouseDown={this.focus}
                onTouchStart={this.focus}>
            <div style={divStyle}>
                <TeX>
                    {this.props.value}
                </TeX>
            </div>
        </span>;
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
