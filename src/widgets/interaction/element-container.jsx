var ElementContainer = React.createClass({
    propTypes: {
        initiallVisible: React.PropTypes.bool,
        title: React.PropTypes.node
    },

    getDefaultProps: function() {
        return {
            initiallyVisible: false,
            title: "More"
        };
    },

    getInitialState: function() {
        return {
            show: this.props.initiallyVisible,
            title: "More",
            onUp: null,
            onDown: null,
            onDelete: null
        };
    },

    render: function() {
        return <div className="perseus-interaction-element">
            <a href="#" className={"perseus-interaction-element-title " +
                (this.state.show ? "open" : "closed")}
                onClick={this.toggle}>
                <i className={"icon-chevron-" +
                    (this.state.show ? "down" : "right")} />
                {this.props.title}
            </a>
            <div className={"perseus-interaction-element-content " +
                    (this.state.show ? "enter" : "leave")}>
                {this.props.children}
                {(this.props.onUp != null ||
                    this.props.onDown != null ||
                    this.props.onDelete != null) &&
                    <div className={"edit-controls"}>
                        {(this.props.onUp != null) && <button
                            onClick={this.props.onUp}>
                                <i className={"icon-circle-arrow-up"} />
                            </button>}
                        {(this.props.onDown != null) && <button
                            onClick={this.props.onDown}>
                                <i className={"icon-circle-arrow-down"} />
                            </button>}
                        {(this.props.onDelete != null) && <button
                            onClick={this.props.onDelete}>
                                <i className={"icon-trash"} />
                            </button>}
                    </div>
                }
            </div>
        </div>;
    },

    toggle: function(e) {
        e.preventDefault();
        this.setState({show: !this.state.show});
    }
});

module.exports = ElementContainer;
