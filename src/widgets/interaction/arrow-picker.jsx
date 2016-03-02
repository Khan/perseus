/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable comma-dangle, indent, no-var, react/jsx-closing-bracket-location, react/jsx-sort-prop-types */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

var ButtonGroup = require("react-components/button-group.jsx");
var React = require("react");

var ArrowPicker = React.createClass({
    propTypes: {
        value: React.PropTypes.string,
        onChange: React.PropTypes.func.isRequired
    },

    getDefaultProps: function() {
        return {
            value: ""
        };
    },

    render: function() {
        return <ButtonGroup value={this.props.value}
            allowEmpty={false}
            buttons={[
                {value: "", content: <span>&mdash;</span>},
                {value: "->", content: <span>&#x2192;</span>},
                /*
                TODO(eater): fix khan-exercises so these are supported
                {value: "<-", content: <span>&#x2190;</span>},
                {value: "<->", content: <span>&#x2194;</span>}
                */]}
            onChange={this.props.onChange} />;
    }
});

module.exports = ArrowPicker;
