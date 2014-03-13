/** @jsx React.DOM */

require("../core.js");

/* A div with  "More Options" that css-transitions in/out on click.
 * (works with children <MoreOptions>{this.props.children</MoreOptions>)
 *
 *
 *
 */
var CSSTransitionGroup = React.addons.CSSTransitionGroup;

var MoreOptions = React.createClass({
    getDefaultProps: function() {
        return {
            show: false,
            arrow: true
        }
    },

    getInitialState: function() {
        return {
            show: this.props.show
        }
    },

    render: function() {
        return <div className="more-options-container">
            <CSSTransitionGroup transitionName="more-options">
            {this.state.show && this.props.children}
            </CSSTransitionGroup>
            <div className="more-options-title" onClick={this.toggle}>
                {this.state.show ? "Less" : "More"} options...
            </div>
        </div>
    },

    toggle: function() {
        this.setState({show: !this.state.show})
    }
})


 module.exports = MoreOptions