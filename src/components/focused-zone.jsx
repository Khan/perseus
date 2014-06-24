/** @jsx React.DOM */

var React = require("react");
// TODO(joel)
// var $ = require("jquery");

// HACK(joel)
//
// http://stackoverflow.com/a/7668761/2121468
//
// All these selectors are definitely overkill but better safe than sorry.
var focusable = [
    'a[href]',
    'area[href]',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    'button:not([disabled])',
    'iframe',
    'object',
    'embed',
    '*[tabindex]',
    '*[contenteditable]'
    ].join(', ');

/* A component that alerts when it gains or loses activity.
 *
 * Let's define this component's idea of "focused".
 *
 * A dom node is focused if it
 * ~ contains (or is) a focused node.
 * ~ contains (or is) the last clicked element on the page.
 */
var FocusZone = React.createClass({
    propTypes: {
        handleLoseFocus: React.PropTypes.func,
        handleGainFocus: React.PropTypes.func
    },
    render: function() {
        var tag = this.props.tag;

        return <tag>{this.props.children}</tag>;
    },

    handlePageEvent: function(event) {
        var wasFocused = this.state.focused;
        var nowFocused = this.getDOMNode().contains(event.target);

        this.setState({ focused: nowFocused });

        if (nowFocused && !wasFocused && this.props.handleGainFocus) {
            this.props.handleGainFocus(event);
        } else if (wasFocused && !nowFocused && this.props.handleLoseFocus) {
            this.props.handleLoseFocus(event);
        }
    },

    componentDidMount: function() {
        window.addEventListener("click", this.handlePageEvent);
        $(focusable).on("focus", this.handlePageEvent);
    },

    componentWillUnmount: function() {
        window.removeEventListener("click", this.handlePageEvent);
        $(focusable).off("focus", this.handlePageEvent);
    },

    getInitialState: function() {
        return { focused: false };
    },

    getDefaultProps: function() {
        return { tag: React.DOM.div };
    }
});

module.exports = FocusZone;
