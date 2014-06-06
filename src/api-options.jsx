module.exports = {
    propTypes: React.PropTypes.shape({
        preWidgetFocus: React.PropTypes.func.isRequired,
        onInputError: React.PropTypes.func.isRequired
    }).isRequired,

    defaults: {
        preWidgetFocus: function() { },
        onInputError: function() { }
    }
};
