/** @jsx React.DOM */

var ElementContainer = React.createClass({
    propTypes: {
        initiallVisible: React.PropTypes.bool,
        title: React.PropTypes.string
    },

    getDefaultProps: function() {
        return {
            initiallyVisible: false,
            title: "More"
        };
    },

    getInitialState: function() {
        return {
            show: this.props.initiallyVisible
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
            </div>
        </div>;
    },

    toggle: function(e) {
        e.preventDefault();
        this.setState({show: !this.state.show});
    }
});

module.exports = ElementContainer;
