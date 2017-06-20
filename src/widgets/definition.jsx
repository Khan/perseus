const {StyleSheet, css} = require("aphrodite");
const React = require("react");
const _ = require("underscore");

const Changeable = require("../mixins/changeable.jsx");
const PerseusApi = require("../perseus-api.jsx");
const Renderer = require("../renderer.jsx");
const mediaQueries = require("../styles/media-queries.js");
const styleConstants = require("../styles/constants.js");

const Definition = React.createClass({
    propTypes: {
        ...Changeable.propTypes,
        apiOptions: PerseusApi.Options.propTypes,
        definition: React.PropTypes.string,
        togglePrompt: React.PropTypes.string,
        trackInteraction: React.PropTypes.func.isRequired,
    },

    getDefaultProps: function() {
        return {
            togglePrompt: "define me",
            definition: "definition goes here",
        };
    },

    getInitialState: function() {
        return {
            expanded: false,
        };
    },

    change(...args) {
        return Changeable.change.apply(this, args);
    },

    _onClick: function() {
        this.setState({
            expanded: !this.state.expanded,
        });
        this.props.trackInteraction();
    },

    _onMouseOver: function() {
        this.setState({
            expanded: true,
        });
        this.props.trackInteraction();
    },

    _onMouseOut: function() {
        this.setState({
            expanded: false,
        });
        this.props.trackInteraction();
    },

    render: function() {
        const {readOnly, isMobile} = this.props.apiOptions;

        const linkAnchor = this.props.togglePrompt;

        let link;

        const href = readOnly ? null : 'javascript:void(0)';
        const onClick = readOnly ? null : this._onClick;
        const onMouseOver = this._onMouseOver;
        const onMouseOut = this._onMouseOut;

        if (isMobile) {
            link = <a
                className={css(styles.mobileDefinitionLink)}
                href={href}
                onClick={onClick}
            >
                    {linkAnchor}
                </a>;
        } else {
            link = <a
                className={css(styles.definitionLink)}
                href={href}
                onMouseOver={onMouseOver}
                onMouseOut={onMouseOut}
            >
                    {linkAnchor}
                </a>;
        }

        const expandedStyle = isMobile
            ? styles.contentExpandedMobile
            : styles.contentExpanded;

        return <div
            className={css(styles.container)}
            ref={e => this.container = e}
        >
            <div className={css(styles.linkContainer)}>
                {link}
                {this.state.expanded &&
                    <svg className={css(styles.disclosureArrow)}>
                        <polygon
                            style={{fill: backgroundColor}}
                            points={`0,${arrowHeight} ` +
                                `${arrowWidth},${arrowHeight} ` +
                                `${arrowWidth / 2},0`}
                        />
                    </svg>}
            </div>
            <div className={css(
                    styles.content,
                    isMobile && styles.contentMobile,
                    this.state.expanded && expandedStyle
                )}
                style={{
                    height: this.state.expanded ? "auto" : 0,
                    overflow: this.state.expanded ? "visible" : "hidden",
                }}
                ref="content"
            >
                <Renderer
                    apiOptions={this.props.apiOptions}
                    content={this.props.definition}
                    widgets={this.props.widgets}
                />
            </div>
        </div>;
    },
});

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

    definitionLink: {
        color: '#007d96',
        borderBottom: `dashed 1px #007d96`,
        textDecoration: 'none',

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

    mobileDefinitionLink: {
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
        position: 'absolute',
        width: '250px',
        left: '-65px',
        zIndex: 10,
        transition: 'margin-top 0.1s',
    },

    contentExpanded: {
        background: backgroundColor,
        width: 200,

        // TODO(benkomalo): this is to "full bleed" the background.
        // The actual content padding differs depending on the host
        // container, so this needs to be fixed eventually.
        marginLeft: styleConstants.negativePhoneMargin,
        marginRight: styleConstants.negativePhoneMargin,
        paddingLeft: styleConstants.phoneMargin,
        paddingRight: styleConstants.phoneMargin,
        boxSizing: 'content-box',
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
        width: 200,

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

module.exports = {
    name: "definition",
    displayName: "Definition",
    defaultAlignment: "inline",
    widget: Definition,
    transform: _.identity,
};
