module.exports = {
    propTypes: React.PropTypes.shape({
        interceptInputFocus: React.PropTypes.func,
        onInputError: React.PropTypes.func.isRequired
    }).isRequired,

    defaults: {
        interceptInputFocus: null,
        onInputError: function() { }
    }
};
