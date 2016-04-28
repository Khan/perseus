/* A div that shows/hides its children.
 * (meant for use with editor widgets)
 */
const React = require("react");

const MoreOptions = React.createClass({
    propTypes: {
        children: React.PropTypes.node,
        show: React.PropTypes.bool,
    },

    getDefaultProps: function() {
        return {
            show: false,
        };
    },

    getInitialState: function() {
        return {
            show: this.props.show,
        };
    },

    toggle: function() {
        this.setState({show: !this.state.show});
    },

    render: function() {
        return <div className="more-options-container">
            {this.state.show && this.props.children}
            <div className="more-options-title" onClick={this.toggle}>
                {this.state.show ?
                    <span><i className="icon-chevron-up"   /> Less</span> :
                    <span><i className="icon-chevron-down" /> More</span>
                } Options...
            </div>
        </div>;
    },
});

module.exports = MoreOptions;
