/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable comma-dangle, no-var, react/prop-types, react/sort-comp */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

/* A div that shows/hides its children.
 * (meant for use with editor widgets)
 */
var React = require("react");

var {iconChevronDown, iconChevronUp} = require("../icon-paths.js");
var InlineIcon = require("./inline-icon.jsx");

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
                    <span><InlineIcon {...iconChevronUp} /> Less</span> :
                    <span><InlineIcon {...iconChevronDown} /> More</span>
                } Options...
            </div>
        </div>;
    },

    toggle: function() {
        this.setState({show: !this.state.show});
    }
});

module.exports = MoreOptions;
