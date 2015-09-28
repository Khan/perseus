var React = require("react");

var TextInput = React.createClass({
    propTypes: {
        value: React.PropTypes.string,
        onChange: React.PropTypes.func.isRequired,
        className: React.PropTypes.string,
        labelText: React.PropTypes.string,
        onFocus: React.PropTypes.func,
        onBlur: React.PropTypes.func
    },

    getDefaultProps: function() {
        return {
            value: ""
        };
    },

    render: function() {
        return <input
            {...this.props}
            type="text"
            aria-label={this.props.labelText}
            onChange={(e) => this.props.onChange(e.target.value)} />;
    },

    focus: function() {
        this.getDOMNode().focus();
    },

    blur: function() {
        this.getDOMNode().blur();
    },

    getValue: function() {
        return this.getDOMNode().value;
    },

    getStringValue: function() {
        return this.getDOMNode().value.toString();
    },

    setSelectionRange: function(selectionStart, selectionEnd) {
        this.getDOMNode().setSelectionRange(selectionStart, selectionEnd);
    },

    getSelectionStart: function() {
        return this.getDOMNode().selectionStart;
    },

    getSelectionEnd: function() {
        return this.getDOMNode().selectionEnd;
    }

});

module.exports = TextInput;
