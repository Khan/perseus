/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable comma-dangle, indent, no-undef, no-var, react/forbid-prop-types, react/jsx-closing-bracket-location, react/sort-comp */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

var React = require("react");
var ReactDOM = require("react-dom");
var _ = require("underscore");

var Changeable = require("../mixins/changeable.jsx");
var PerseusApi = require("../perseus-api.jsx");
var Renderer = require("../renderer.jsx");

var defaultExplanationProps = {
    showPrompt: "Explain",
    hidePrompt: "Hide explanation",
    explanation: "explanation goes here\n\nmore explanation",
    widgets: {},
};

var Explanation = React.createClass({
    mixins: [Changeable],

    propTypes: {
        apiOptions: PerseusApi.Options.propTypes,
        explanation: React.PropTypes.string,
        hidePrompt: React.PropTypes.string,
        showPrompt: React.PropTypes.string,
        trackInteraction: React.PropTypes.func.isRequired,
        widgets: React.PropTypes.object,
    },

    getDefaultProps: function() {
        return defaultExplanationProps;
    },

    getInitialState: function() {
        return {
            expanded: false,
            contentHeight: 0,
        };
    },

    _onClick: function() {
        this.setState({
            expanded: !this.state.expanded
        });
        this.props.trackInteraction();
    },

    // After rendering, we want to measure the height of the explanation so we
    // know what to animate the height to/from when showing/hiding the
    // explanation.
    _updateHeight: function() {
        const contentElement = ReactDOM.findDOMNode(this.refs.content);

        // Add up the heights of all the the child nodes
        let contentHeight = Array.prototype.reduce.call(
            contentElement.childNodes,
            function(memo, el) {
                return memo + (el.offsetHeight || 0);
            },
            0);

        // Add the height of the renderer's top and bottom margins
        const $renderer = $(contentElement).children(".perseus-renderer").eq(0);
        contentHeight += $renderer.outerHeight(true) - $renderer.outerHeight();

        // Only update state if the height is different, otherwise we'll end
        // up calling componentDidUpdate in an infinite loop!
        if (contentHeight !== this.state.contentHeight) {
            this.setState({
                contentHeight: contentHeight
            });
        }
    },

    componentDidMount: function() {
        this._updateHeight();
    },

    componentDidUpdate: function(prevProps, prevState) {
        this._updateHeight();
    },

    render: function() {
        const { Link } = this.props.apiOptions.baseElements;

        return <div className="perseus-widget-explanation">
            <Link
                className="perseus-widget-explanation-link"
                /* Disable the link when read-only, so it doesn't look
                 * clickable */
                href={this.props.apiOptions.readOnly ?
                      null : "javascript:void(0)"}
                onClick={this.props.apiOptions.readOnly ? null : this._onClick}>

                {"[" + (this.state.expanded ?
                        this.props.hidePrompt :
                        this.props.showPrompt) + "]"}
            </Link>
            <div className="perseus-widget-explanation-content" style={{
                    height: this.state.expanded ? this.state.contentHeight : 0,
                    overflow: this.state.expanded ? "visible" : "hidden"
                }} ref="content">
                <Renderer
                    apiOptions={this.props.apiOptions}
                    content={this.props.explanation}
                    widgets={this.props.widgets}
                />
            </div>
        </div>;
    },

    getUserInput: function() {
        return {};
    },

    simpleValidate: function(rubric) {
        return Explanation.validate(this.getUserInput(), rubric);
    }
});

_.extend(Explanation, {
    validate: function(state, rubric) {
        return {
            type: "points",
            earned: 0,
            total: 0,
            message: null
        };
    }
});

module.exports = {
    name: "explanation",
    displayName: "Explanation (for hints)",
    defaultAlignment: "inline",
    widget: Explanation,
    transform: _.identity
};
