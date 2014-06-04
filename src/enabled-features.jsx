module.exports = {
    propTypes: React.PropTypes.shape({
        highlight: React.PropTypes.bool.isRequired,
        toolTipFormats: React.PropTypes.bool.isRequired,
        useMathQuill: React.PropTypes.bool.isRequired
    }).isRequired,

    defaults: {
        highlight: false,
        toolTipFormats: false,
        useMathQuill: false
    }
};
