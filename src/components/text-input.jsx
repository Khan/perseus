var React = require("react");
var TextInput = React.createClass({
    propTypes: {
        value: React.PropTypes.string,
        onChange: React.PropTypes.func.isRequired,
        className: React.PropTypes.string,
        onFocus: React.PropTypes.func,
        onBlur: React.PropTypes.func
    },

    getDefaultProps: function() {
        return {
            value: ""
        };
    },

    render: function() {
        <input
            {...this.props}
            type="text"
            onChange={(e) => this.props.onChange(e.target.value)}
        />;
    },

    focus: function() {
        this.getDOMNode().focus();
    }
});

module.exports = TextInput;
