/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable comma-dangle, no-var, react/jsx-closing-bracket-location, react/jsx-sort-prop-types */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

var ButtonGroup = require("react-components/button-group.jsx");
var React = require("react");

var DashPicker = React.createClass({
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
            {value: "-", content: <span>&ndash;&ndash;&ndash;</span>},
            {value: "- ", content: <span>&ndash;&nbsp;&nbsp;&ndash;</span>},
            {value: ".", content: <span>&middot;&middot;&middot;&middot;
                </span>},
            {value: ". ", content: <span>&middot; &middot; &middot;</span>}]}
            onChange={this.props.onChange} />;
    }
});

module.exports = DashPicker;
