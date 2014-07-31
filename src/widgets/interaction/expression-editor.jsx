/** @jsx React.DOM */

var Expression = require("../../widgets/expression.jsx").getWidget({
        useMathQuill: true
    });

var ExpressionEditor = React.createClass({
    propTypes: {
        value: React.PropTypes.string,
        onChange: React.PropTypes.func.isRequired
    },

    getDefaultProps: function() {
        return {
            value: "0"
        };
    },

    render: function() {
        return Expression({
            ref: "expression",
            value: this.props.value,
            times: false,
            functions: ["f"],
            onChange: (newProps) => {this.props.onChange(newProps.value);},
            buttonsVisible: "never"
        });
    }

});

module.exports = ExpressionEditor;
