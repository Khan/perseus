const ButtonGroup = require("react-components/button-group.jsx");
const React = require("react");

const DashPicker = React.createClass({
    propTypes: {
        onChange: React.PropTypes.func.isRequired,
        value: React.PropTypes.string,
    },

    getDefaultProps: function() {
        return {
            value: "",
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
            onChange={this.props.onChange}
        />;
    },
});

module.exports = DashPicker;
