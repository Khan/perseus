/**
 * A wrapper around react-components/info-tip.jsx that can be rendered on the
 * server without causing a checksum mismatch on the client.
 * (RCSS generates classnames with a randomSuffix, which ensures that any
 * two sets of generated classnames will not match.)
 */

const React = require("react");

const ReactComponentsInfoTip = require("react-components/info-tip.jsx");

const InfoTip = React.createClass({
    getInitialState: function() {
        return {
            didMount: false,
        };
    },

    componentDidMount: function() {
        /* eslint-disable react/no-did-mount-set-state */
        this.setState({didMount: true});
        /* eslint-enable react/no-did-mount-set-state */
    },

    render: function() {
        if (this.state.didMount) {
            return <ReactComponentsInfoTip {...this.props} />;
        } else {
            return <div />;
        }
    },
});

module.exports = InfoTip;
