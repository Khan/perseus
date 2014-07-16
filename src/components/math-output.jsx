/** @jsx React.DOM */

var React = require("react");
var TeX   = require("../tex.jsx");

var MathOutput = React.createClass({
    propTypes: {
        value: React.PropTypes.string,
        onClick: React.PropTypes.func.isRequired
    },

    getDefaultProps: function () {
        return {
            onClick: null,
            value: ""
        };
    },

    render: function () {
        var spanStyle = {
            display: "inline-block",
            minWidth: 80,
            minHeight: 36,
            borderRadius: 5,
            padding: "3px 5px",
            background: "white",
            border: "1px solid #a4a4a4"
        };
        var divStyle = {
            textAlign: "center"
        };
        return <span ref="input"
                style={spanStyle}
                onClick={this.props.onClick}>
            <div style={divStyle}>
                <TeX>
                    {this.props.value}
                </TeX>
            </div>
        </span>;
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
