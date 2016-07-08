/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable comma-dangle, no-var, react/jsx-closing-bracket-location, react/prop-types, react/sort-comp */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

var React = require("react");

var {
    iconChevronDown,
    iconChevronRight,
    iconCircleArrowDown,
    iconCircleArrowUp,
    iconTrash,
} = require("../../icon-paths.js");
var InlineIcon   = require("../../components/inline-icon.jsx");

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
                {this.state.show
                    ? <InlineIcon {...iconChevronDown} />
                    : <InlineIcon {...iconChevronRight} />
                }
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
                                <InlineIcon {...iconCircleArrowUp} />
                            </button>}
                        {(this.props.onDown != null) && <button
                            onClick={this.props.onDown}>
                                <InlineIcon {...iconCircleArrowDown} />
                            </button>}
                        {(this.props.onDelete != null) && <button
                            onClick={this.props.onDelete}>
                                <InlineIcon {...iconTrash} />
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
