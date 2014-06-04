/** @jsx React.DOM */

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
        return <input type="text"
                    className={this.props.className}
                    value={this.props.value}
                    onChange={(e) => this.props.onChange(e.target.value)}
                    onFocus={this.props.onFocus}
                    onBlur={this.props.onBlur} />;
    },

    focus: function() {
        this.getDOMNode().focus();
    }
});

module.exports = TextInput;
