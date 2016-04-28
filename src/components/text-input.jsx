const React = require("react");

const ReactDOM = require("react-dom");

const TextInput = React.createClass({
    propTypes: {
        className: React.PropTypes.string,
        disabled: React.PropTypes.bool,
        labelText: React.PropTypes.string,
        onBlur: React.PropTypes.func,
        onChange: React.PropTypes.func.isRequired,
        onFocus: React.PropTypes.func,
        value: React.PropTypes.string,
    },

    getDefaultProps: function() {
        return {
            disabled: false,
            value: "",
        };
    },

    focus: function() {
        ReactDOM.findDOMNode(this).focus();
    },

    blur: function() {
        ReactDOM.findDOMNode(this).blur();
    },

    getValue: function() {
        return ReactDOM.findDOMNode(this).value;
    },

    getStringValue: function() {
        return ReactDOM.findDOMNode(this).value.toString();
    },

    setSelectionRange: function(selectionStart, selectionEnd) {
        ReactDOM.findDOMNode(this).setSelectionRange(
            selectionStart, selectionEnd);
    },

    getSelectionStart: function() {
        return ReactDOM.findDOMNode(this).selectionStart;
    },

    getSelectionEnd: function() {
        return ReactDOM.findDOMNode(this).selectionEnd;
    },

    render: function() {
        return <input
            {...this.props}
            type="text"
            disabled={this.props.disabled}
            aria-label={this.props.labelText}
            onChange={(e) => this.props.onChange(e.target.value)}
        />;
    },
});

module.exports = TextInput;
