/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable comma-dangle, indent, object-curly-spacing, react/forbid-prop-types, react/jsx-closing-bracket-location, react/sort-comp */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

const { StyleSheet, css } = require("aphrodite");
const React = require("react");
const ReactDOM = require("react-dom");
const _ = require("underscore");

const Changeable = require("../mixins/changeable.jsx");
const PerseusApi = require("../perseus-api.jsx");
const Renderer = require("../renderer.jsx");
const mediaQueries = require("../styles/media-queries.js");
const styleConstants = require("../styles/constants.js");

const defaultExplanationProps = {
    showPrompt: "Explain",
    hidePrompt: "Hide explanation",
    explanation: "explanation goes here\n\nmore explanation",
    widgets: {},
};

const Explanation = React.createClass({
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
        this._updateHeight();
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
        const {isMobile} = this.props.apiOptions;

        // TODO(jared): this feels super fagile -- would
        // `contentElement.scrollHeight` work?

        // Add up the heights of all the the child nodes
        const contentHeight = Array.prototype.reduce.call(
            contentElement.childNodes,
            (memo, el) => memo + (el.offsetHeight || 0),
            isMobile ? 0 : 2 * verticalContentPadding);

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
        const {Link} = this.props.apiOptions.baseElements;
        const {readOnly, isMobile} = this.props.apiOptions;

        const linkAnchor = this.state.expanded ?
                this.props.hidePrompt : this.props.showPrompt;

        let linkContainer;

        const href = readOnly ? null : 'javascript:void(0)';
        const onClick = readOnly ? null : this._onClick;

        if (isMobile) {
            linkContainer = <div className={css(styles.linkContainer)}>
                <a
                    className={css(styles.mobileExplanationLink)}
                    href={href}
                    onClick={onClick}
                >
                    {linkAnchor}
                </a>
                {this.state.expanded &&
                    <svg className={css(styles.disclosureArrow)}>
                        <polygon
                            style={{fill: backgroundColor}}
                            points={`0,${arrowHeight} ` +
                                `${arrowWidth},${arrowHeight} ` +
                                `${arrowWidth / 2},0`}
                        />
                    </svg>}
            </div>;
        } else {
            linkContainer = <div className={css(styles.linkContainer)}>
                <Link
                    className={css(styles.explanationLink)}
                    href={href}
                    onClick={onClick}
                >
                    {`[${linkAnchor}]`}
                </Link>
            </div>;
        }

        const expandedStyle = isMobile
            ? styles.contentExpandedMobile
            : styles.contentExpanded;

        return <div className={css(styles.container)}>
            {linkContainer}
            <div className={css(
                    styles.content,
                    isMobile && styles.contentMobile,
                    this.state.expanded && expandedStyle
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
const verticalContentPadding = 10;

const arrowWidth = 30;
const arrowHeight = 14;
const backgroundColor = styleConstants.gray95;

const styles = StyleSheet.create({
    container: {
        display: 'inline',
        position: 'relative',
    },

    linkContainer: {
        display: 'inline-block',
    },

    explanationLink: {
        fontStyle: 'italic',
        color: '#007d96',

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

    mobileExplanationLink: {
        color: styleConstants.kaGreen,
        borderBottom: `dashed 1px ${styleConstants.kaGreen}`,
        textDecoration: 'none',

        // TODO(benkomalo): these should be pulled in from common typography
        // shared files so we have a single place where the type hierarchy is
        // defined; one off font sizes for individual components should be
        // avoided.
        [mediaQueries.xl]: {
            fontSize: 22,
            lineHeight: 1.4,
        },
        [mediaQueries.lgOrSmaller]: {
            fontSize: 20,
            lineHeight: 1.5,
        },
        [mediaQueries.smOrSmaller]: {
            fontSize: 18,
            lineHeight: 1.2,
        },
    },

    content: {
        position: 'relative',
        transition: 'all 0.1s',
    },

    contentExpanded: {
        borderLeft: '5px solid #ccc',
        marginLeft: -leftBorderSpacing,
        paddingLeft: leftBorderSpacing,

        paddingTop: verticalContentPadding,
        paddingBottom: verticalContentPadding,

        // Note: we still use arrow height as the vertical margin, even on
        // desktop when there is no arrow, but it's good enough.
        marginBottom: arrowHeight,
        marginTop: arrowHeight,
    },

    contentExpandedMobile: {
        boxSizing: 'content-box',
        paddingTop: 32,
        paddingBottom: 32,
        marginTop: arrowHeight,
    },

    contentMobile: {
        background: backgroundColor,

        // TODO(benkomalo): this is to "full bleed" the background.
        // The actual content padding differs depending on the host
        // container, so this needs to be fixed eventually.
        marginLeft: styleConstants.negativePhoneMargin,
        marginRight: styleConstants.negativePhoneMargin,
        paddingLeft: styleConstants.phoneMargin,
        paddingRight: styleConstants.phoneMargin,
    },

    disclosureArrow: {
        // HACK - positioning at "bottom: 0", doesn't actually position it to
        // the real bottom, because the container is `inline-block`, and it
        // seems to position it to the baseline? We put in a generous
        // fudge factor to position it down to be flush with the content box
        // below it.
        bottom: -(arrowHeight + 5),
        height: arrowHeight,
        left: '50%',
        marginLeft: -(arrowWidth / 2),
        position: 'absolute',
        width: arrowWidth,
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
