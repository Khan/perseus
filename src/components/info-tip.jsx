/** @jsx React.DOM */

var InfoTip = React.createClass({
    getInitialState: function() {
        return {
            hover: false
        };
    },

    render: function() {
        return <span className="perseus-info-tip">
            <i className="icon-question-sign"
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave} />
            <span className="perseus-info-tip-container"
                    style={{display: this.state.hover ? 'block' : 'none'}}>
                <span className="perseus-info-tip-triangle"></span>
                <span className={"perseus-info-tip-content-container " +
                        "vertical-shadow"}>
                    {this.props.children}
                </span>
            </span>
        </span>;
    },

    handleMouseEnter: function() {
        this.setState({hover: true});
    },

    handleMouseLeave: function() {
        this.setState({hover: false});
    }
});

module.exports = InfoTip;
