/** @jsx React.DOM */

var React         = require("react");
var TeX           = require("../tex.jsx");
var ApiClassNames = require("../perseus-api.jsx").ClassNames;

var MathOutput = React.createClass({
    propTypes: {
        value: React.PropTypes.string,
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
        this.props.onFocus();
        this._bindBlurHandler();
        this.setState({
            focused: true
        });
    },

    blur: function() {
        this.props.onBlur();
        this._unbindBlurHandler();
        this.setState({
            focused: false
        });
    },

    _bindBlurHandler: function() {
        $(document).bind("vmousedown." + this.state.selectorNamespace, (e) => {
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
    },

    // For consistency with the API that Expression and NumericInput use to
    // get their current input element. Perhaps this should have a different
    // name, and those should explicitly use a different method when they need
    // to get its DOM node?
    getInputDOMNode: function() {
        return this.refs.input.getDOMNode();
    }
});

module.exports = MathOutput;
