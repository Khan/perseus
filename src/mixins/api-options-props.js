/**
 * A mixin that accepts the `apiOptions` prop, and populates any missing values
 * with defaults.
 */
const React = require("react");

const ApiOptions = require("../perseus-api.jsx").Options;

const ApiOptionsProps = {
    propTypes: {
        // TODO(mdr): Should this actually be objectOf(any)?
        apiOptions: React.PropTypes.any,
    },

    getDefaultProps() {
        return { apiOptions: {} };
    },

    getApiOptions() {
        return {
            ...ApiOptions.defaults,
            ...this.props.apiOptions,
        };
    },
};

module.exports = ApiOptionsProps;
