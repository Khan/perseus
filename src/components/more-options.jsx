/* A div that shows/hides its children.
 * (meant for use with editor widgets)
 */

var MoreOptions = React.createClass({
    getDefaultProps: function() {
        return {
            show: false
        };
    },

    getInitialState: function() {
        return {
            show: this.props.show
        };
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

    toggle: function() {
        this.setState({show: !this.state.show});
    }
});

module.exports = MoreOptions;
