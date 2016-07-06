/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable comma-dangle, indent, no-var, object-curly-spacing, react/forbid-prop-types, react/jsx-closing-bracket-location, react/sort-comp */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

const { StyleSheet, css } = require("aphrodite");
const React = require("react");
const ReactDOM = require("react-dom");
const _ = require("underscore");
const $ = require("jQuery");

const Changeable = require("../mixins/changeable.jsx");
const PerseusApi = require("../perseus-api.jsx");
const Renderer = require("../renderer.jsx");
const mediaQueries = require("../styles/media-queries.js");

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
        if (prevProps !== this.props) {
            // Internal state only changes on height changes itself (which
            // we wouldn't want to call _updateHeight() on), or on toggling
            // expansion (which also doesn't affect the content height), so
            // we only care about prop changes.
            this._updateHeight();
        }
    },

    render: function() {
        const { Link } = this.props.apiOptions.baseElements;

        const linkAnchor = '[' +
            (this.state.expanded ?
                this.props.hidePrompt : this.props.showPrompt) +
            ']';

        return <div className={css(styles.container)}>
            <Link
                className={css(styles.explanationLink)}
                href={this.props.apiOptions.readOnly ?
                      null : "javascript:void(0)"}
                onClick={this.props.apiOptions.readOnly ? null : this._onClick}
            >
                {linkAnchor}
            </Link>
            <div className={css(
                    styles.content,
                    this.state.expanded && styles.contentExpanded
                )}
                style={{
                    height: this.state.expanded ? this.state.contentHeight : 0,
                    overflow: this.state.expanded ? "visible" : "hidden"
                }}
                ref="content"
            >
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


const leftBorderSpacing = 23;
const verticalContentSpacing = 22;

const styles = StyleSheet.create({
    container: {
        display: 'inline',
    },

    explanationLink: {
        display: 'inline-block',
        fontStyle: 'italic',
        color: '#007d96',

        // TODO(benkomalo): these should be pulled in from common typography
        // shared files so we have a single place where the type hierarchy is
        // defined; one off font sizes for individual components should be
        // avoided.
        [mediaQueries.xl]: {
            fontSize: 20,
            lineHeight: 1.1,
        },
        [mediaQueries.lgOrSmaller]: {
            fontSize: 17,
            lineHeight: 1.4,
        },
        [mediaQueries.smOrSmaller]: {
            fontSize: 14,
            lineHeight: 1.3,
        },
    },

    content: {
        position: 'relative',
        transition: 'height 0.1s',
    },

    contentExpanded: {
        borderLeft: '5px solid #ccc',
        marginLeft: -leftBorderSpacing,
        paddingLeft: leftBorderSpacing,
        marginBottom: verticalContentSpacing,
        marginTop: verticalContentSpacing,
    },
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
