/* eslint-disable react/prop-types, react/sort-comp */

/* A div that shows/hides its children.
 * (meant for use with editor widgets)
 */
const React = require("react");

const {iconChevronDown, iconChevronUp} = require("../icon-paths.js");
const InlineIcon = require("./inline-icon.jsx");

const MoreOptions = React.createClass({
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

    render: function() {
        return (
            <div className="more-options-container">
                {this.state.show && this.props.children}
                <div className="more-options-title" onClick={this.toggle}>
                    {this.state.show
                        ? <span>
                              <InlineIcon {...iconChevronUp} /> Less
                          </span>
                        : <span>
                              <InlineIcon {...iconChevronDown} /> More
                          </span>}{" "}
                    Options...
                </div>
            </div>
        );
    },

    toggle: function() {
        this.setState({show: !this.state.show});
    },
});

module.exports = MoreOptions;
