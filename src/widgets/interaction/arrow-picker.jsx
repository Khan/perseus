var ButtonGroup = require("react-components/button-group.jsx");

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
