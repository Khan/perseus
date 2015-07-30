var SectionControlButton = React.createClass({
    propTypes: {
        onClick: React.PropTypes.func.isRequired,
    },

    render: function() {
        return <a
                href="#"
                className={
                    "section-control-button " +
                    "simple-button " +
                    "simple-button--small " +
                    "orange"
                }
                onClick={(e) => {
                    e.preventDefault();
                    this.props.onClick();
                }}>
            <span className={this.props.icon} />
        </a>;
    }
});

module.exports = SectionControlButton;
