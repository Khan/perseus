/* eslint-disable comma-dangle, max-len, no-var, react/jsx-closing-bracket-location, react/sort-comp */
/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

var React = require("react");

var ReactDOM = require("react-dom");

var TextInput = React.createClass({
    propTypes: {
        value: React.PropTypes.string,
        onChange: React.PropTypes.func.isRequired,
        className: React.PropTypes.string,
        labelText: React.PropTypes.string,
        onFocus: React.PropTypes.func,
        onBlur: React.PropTypes.func,
        disabled: React.PropTypes.bool,
    },

    getDefaultProps: function() {
        return {
            value: "",
            disabled: false,
        };
    },

    render: function() {
        const {labelText, ...props} = this.props;
        return <input
            {...props}
            type="text"
            aria-label={labelText}
            onChange={(e) => this.props.onChange(e.target.value)} />;
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
        ReactDOM.findDOMNode(this).setSelectionRange(selectionStart, selectionEnd);
    },

    getSelectionStart: function() {
        return ReactDOM.findDOMNode(this).selectionStart;
    },

    getSelectionEnd: function() {
        return ReactDOM.findDOMNode(this).selectionEnd;
    }

});

module.exports = TextInput;
