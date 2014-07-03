var React = require('react');

module.exports = {
    propTypes: React.PropTypes.shape({
        toolTipFormats: React.PropTypes.bool.isRequired,
        useMathQuill: React.PropTypes.bool.isRequired
    }).isRequired,

    defaults: {
        // TODO(jack): Remove this two options
        toolTipFormats: true,
        useMathQuill: false
    }
};
