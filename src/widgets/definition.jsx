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
            belowScreen: false,
            contentOffsetLeft: 0,
            contentOffsetLeftMobile: 0,
            contentWidth: 0,
            contentWidthMobile: 0,
            contentMarginTop: arrowHeight,
        };
    },

    componentDidMount: function() {
        document.addEventListener("click", this.handleClick);
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

    getUserInput: function() {
        return {};
    },

    simpleValidate: function(rubric) {
        return Definition.validate(this.getUserInput(), rubric);
    },

    // check if the definition is fully visible on the bottom
    _definitionBelowScreen: function() {
        const windowBottom = window.innerHeight;
        const bottom = this.container.getBoundingClientRect().bottom;
        return bottom > windowBottom - this.content.offsetHeight;
    },

    // TODO(audrey): think of a better way to have the definition always appear
    // on screen. Currently, the marginTop and absolute positions of the arrow
    // and the definition div are adjusted. Could also consider having
    // dynamic flipping.
    _checkDefinitionPosition: function() {
        // need to wait for aphrodite styles to be rendered
        // so they can accessed for measurements in positionContent
        setTimeout(() => {
            this._positionContentHorizontally();
            if (this._definitionBelowScreen()) {
                this.setState(
                    {
                        belowScreen: true,
                    },
                    this._positionContentVertically
                );
            } else {
                this.setState(
                    {
                        belowScreen: false,
                    },
                    this._positionContentVertically
                );
            }
        }, 0);
    },

    /**
    * This function sets the definition boxes' vertical positions depending
    * on whether the definition should appear above or below. The positions
    * are affected by how long the definition is.
    */
    _positionContentVertically: function() {
        if (this.state.belowScreen) {
            const contentHeight = this.content.offsetHeight;
            // slight hack to better align the bottom of the arrow
            // with the rest of the definition box
            const contentMarginTop = -contentHeight - 2 * arrowHeight - 4;
            this.setState({
                contentMarginTop: contentMarginTop,
            });
        } else {
            this.setState({
                contentMarginTop: arrowHeight,
            });
        }
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

        this.setState(
            {
                expanded: !this.state.expanded,
            },
            this._checkDefinitionPosition
        );
        this.props.trackInteraction();
    },

    _onMouseOver: function() {
        this.setState(
            {
                expanded: true,
            },
            this._checkDefinitionPosition
        );
        this.props.trackInteraction();
    },

    _onMouseOut: function() {
        this.setState({
            expanded: false,
        });
        this.props.trackInteraction();
    },

    /**
    * This function sets the definition boxes' widths so that the complete box
    * is visible on the screen and spans the entire width. It also makes sure
    * the content is centered correctly.
    */
    _positionContentHorizontally: function() {
        // container is the word to be defined
        // content is the actual definition
        const documentWidth = document.body.clientWidth;
        const marginWidth = this.container.parentElement.parentElement
            .offsetLeft;
        const contentWidth = documentWidth - 2 * marginWidth;
        const contentWidthMobile = documentWidth - marginWidth;
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

        const href = readOnly ? null : "javascript:void(0)";
        const onClick = readOnly ? null : this._onClick;
        const onMouseOver = this._onMouseOver;
        const onMouseOut = this._onMouseOut;

        if (isMobile) {
            link = (
                <a
                    className={css(styles.mobileDefinitionLink)}
                    href={href}
                    onClick={onClick}
                >
                    {linkAnchor}
                </a>
            );
        } else {
            link = (
                <a
                    className={css(styles.definitionLink)}
                    href={href}
                    onMouseOver={onMouseOver}
                    onMouseOut={onMouseOut}
                >
                    {linkAnchor}
                </a>
            );
        }

        const expandedStyle = isMobile
            ? styles.contentExpandedMobile
            : styles.contentExpanded;

        const arrowTransform = this.state.belowScreen
            ? "scale(1, -1)"
            : "scale(1, 1)";

        return (
            <div
                className={css(styles.container)}
                ref={e => (this.container = e)}
            >
                <div className={css(styles.linkContainer)}>
                    {link}
                    {this.state.expanded &&
                        <svg
                            className={css(styles.disclosureArrow)}
                            ref={e => (this.arrow = e)}
                            transform={arrowTransform}
                            style={{
                                bottom:
                                    this.state.expanded &&
                                    this.state.belowScreen
                                        ? "18px"
                                        : "-18px",
                            }}
                        >
                            <filter
                                id="definition-widget-dropshadow"
                                height="150%"
                            >
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
                                    <feMergeNode />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                            <polyline
                                fill="white"
                                filter="url(#definition-widget-dropshadow)"
                                points={
                                    `0,${arrowHeight} ` +
                                    `${arrowWidth},${arrowHeight} ` +
                                    `${arrowWidth / 2},0`
                                }
                            />
                        </svg>}
                </div>
                <div
                    className={css(
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
                        marginTop: this.state.contentMarginTop,
                    }}
                    ref={e => (this.content = e)}
                >
                    <Renderer
                        apiOptions={this.props.apiOptions}
                        content={this.props.definition}
                        widgets={this.props.widgets}
                    />
                </div>
            </div>
        );
    },
});

const dropShadowXOffset = 0;
const dropShadowYOffset = 1;
const dropShadowOpacity = 0.35;
const dropShadowRadius = 4;

const arrowWidth = 20;
const arrowHeight = 14;
const backgroundColor = styleConstants.white;

const styles = StyleSheet.create({
    container: {
        display: "inline",
        position: "relative",
    },

    linkContainer: {
        display: "inline-block",
    },

    definitionLink: {
        color: styleConstants.blue,
        borderBottom: `dashed 1px ${styleConstants.blue}`,
        textDecoration: "none",
    },

    mobileDefinitionLink: {
        color: styleConstants.kaGreen,
        borderBottom: `dashed 1px ${styleConstants.kaGreen}`,
        textDecoration: "none",

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
        position: "absolute",
        transition: "margin-top 0.1s",
        paddingLeft: styleConstants.phoneMargin,
        paddingRight: styleConstants.phoneMargin,
        zIndex: 2,
    },

    contentExpanded: {
        boxShadow: `0px 0px 4px ${styleConstants.gray85}`,
        border: `solid 0.5px ${styleConstants.gray85}`,
    },

    contentExpandedMobile: {
        paddingTop: 32,
        paddingBottom: 32,
        boxShadow: `0px 0px 4px ${styleConstants.gray85}`,
        border: `solid 0.5px ${styleConstants.gray85}`,
    },

    disclosureArrow: {
        // HACK - positioning at "bottom: 0", doesn't actually position it to
        // the real bottom, because the container is `inline-block`, and it
        // seems to position it to the baseline? We put in a generous
        // fudge factor to position it down to be flush with the content box
        // below it.
        height: arrowHeight,
        left: "50%",
        marginLeft: -(arrowWidth / 2),
        position: "absolute",
        width: arrowWidth,
        zIndex: 4, // so popovers appear on top
    },
});

_.extend(Definition, {
    validate: function(state, rubric) {
        return {
            type: "points",
            earned: 0,
            total: 0,
            message: null,
        };
    },
});

module.exports = {
    name: "definition",
    displayName: "Definition",
    defaultAlignment: "inline",
    widget: Definition,
    transform: _.identity,
};
