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
            contentOffsetLeft: 0,
            contentOffsetLeftMobile: 0,
            contentWidth: 0,
            contentWidthMobile: 0,
        };
    },

    componentDidMount: function() {
        document.addEventListener("click", this.handleClick);
        // need to wait for aphrodite styles to be rendered
        // so they can accessed for measurements in positionContent
        setTimeout(() => {
            this._positionContent();
        }, 0);
    },

    componentWillUnmount: function() {
        document.removeEventListener("click", this.handleClick);
    },

    handleClick: function(event) {
        let elem = event.target;
        let shouldClose = true;
        while (elem) {
            // If the clicked element is outside the definition box
            // close the definition box
            if (elem === this.content || elem === this.container) {
                shouldClose = false;
                break;
            }
            elem = elem.parentNode;
        }

        if (shouldClose) {
            this.close();
        }
    },

    change(...args) {
        return Changeable.change.apply(this, args);
    },

    close: function() {
        this.setState({
            expanded: false,
        });
    },

    _onClick: function() {
        // close all other open definitions if opening definition
        if (!this.state.expanded) {
            const definitionWidgets = this.props.findWidgets("definition");
            for (const widget of definitionWidgets) {
                if (widget !== this) {
                    widget.close();
                }
            }
        }

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

    /**
    * This function positions the definition boxes so that the complete box
    * is visible on the screen. If the word to be defined is too far to the
    * right or left, the definition box cannot be centered (which is the
    * default).
    */
    _positionContent: function() {
        // container is the word to be defined
        // content is the actual definition
        const documentWidth = document.body.clientWidth;
        const marginWidth =
            this.container.parentElement.parentElement.offsetLeft;
        const contentWidth = documentWidth - 3 * marginWidth;
        const contentWidthMobile = documentWidth;
        const contentOffsetLeft = this.container.offsetLeft - marginWidth;
        const contentOffsetLeftMobile = this.container.offsetLeft;

        this.setState({
            contentWidth: contentWidth,
            contentWidthMobile: contentWidthMobile,
            contentOffsetLeft: -contentOffsetLeft,
            contentOffsetLeftMobile: -contentOffsetLeftMobile,
        });
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
                        <filter id="definition-widget-dropshadow" height="150%">
                            <feOffset
                                dx={dropShadowXOffset}
                                dy={dropShadowYOffset}
                                result="offsetblur"
                            />
                            <feGaussianBlur
                                in="SourceAlpha"
                                stdDeviation={dropShadowRadius / 2}
                            />
                            <feComponentTransfer>
                                <feFuncA
                                    type="linear"
                                    slope={dropShadowOpacity}
                                />
                            </feComponentTransfer>
                            <feMerge>
                                <feMergeNode/>
                                <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                        </filter>
                        <polyline
                            fill="white"
                            filter="url(#definition-widget-dropshadow)"
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
                    left: isMobile
                        ? this.state.contentOffsetLeftMobile
                        : this.state.contentOffsetLeft,
                    width: isMobile
                        ? this.state.contentWidthMobile
                        : this.state.contentWidth,
                }}
                ref={e => this.content = e}
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

const dropShadowXOffset = 0;
const dropShadowYOffset = 1;
const dropShadowOpacity = 0.35;
const dropShadowRadius = 4;

const arrowWidth = 28;
const arrowHeight = 14;
const backgroundColor = styleConstants.white;

const styles = StyleSheet.create({
    container: {
        display: 'inline',
        position: 'relative',
    },

    linkContainer: {
        display: 'inline-block',
    },

    definitionLink: {
        color: styleConstants.blue,
        borderBottom: `dashed 1px ${styleConstants.blue}`,
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
        background: backgroundColor,
        opacity: 0.95,
        borderRadius: 1,
        position: 'absolute',
        transition: 'margin-top 0.1s',
        paddingLeft: styleConstants.phoneMargin,
        paddingRight: styleConstants.phoneMargin,
        zIndex: 2,
    },

    contentExpanded: {
        marginTop: arrowHeight,
        boxShadow: `0px 0px 4px ${styleConstants.gray85}`,
        border: `solid 0.5px ${styleConstants.gray85}`,
    },

    contentExpandedMobile: {
        paddingTop: 32,
        paddingBottom: 32,
        marginTop: arrowHeight,
        boxShadow: `0px 0px 4px ${styleConstants.gray85}`,
        border: `solid 0.5px ${styleConstants.gray85}`,
    },

    disclosureArrow: {
        // HACK - positioning at "bottom: 0", doesn't actually position it to
        // the real bottom, because the container is `inline-block`, and it
        // seems to position it to the baseline? We put in a generous
        // fudge factor to position it down to be flush with the content box
        // below it.
        bottom: -(arrowHeight + 4),
        height: arrowHeight,
        left: '50%',
        marginLeft: -(arrowWidth / 2),
        position: 'absolute',
        width: arrowWidth,
        zIndex: 4, // so popovers appear on top
    },
});

module.exports = {
    name: "definition",
    displayName: "Definition",
    defaultAlignment: "inline",
    widget: Definition,
    transform: _.identity,
};
