/** @jsx React.DOM */
(function(Perseus) {

var InfoTip = React.createClass({
    getInitialState: function() {
        return {
            hover: false
        };
    },

    render: function() {
        return <span class="perseus-info-tip">
            <i class="icon-question-sign"
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave} />
            <span class="perseus-info-tip-container"
                    style={{display: this.state.hover ? 'block' : 'none'}}>
                <span class="perseus-info-tip-triangle"></span>
                <span class={"perseus-info-tip-content-container " +
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

Perseus.InfoTip = InfoTip;

})(Perseus);
