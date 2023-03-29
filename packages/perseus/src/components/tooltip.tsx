// @ts-nocheck
/**
 * A generic tooltip library for React.js
 *
 * This should eventually end up in react-components
 *
 * Interface: ({a, b} means one of a or b)
 * import Tooltip from "./tooltip.jsx";
 * <Tooltip
 *     className="class-for-tooltip-contents"
 *     horizontalPosition="left" // one of "left", "right"
 *     horizontalAlign="left" // one of "left", "right"
 *     verticalPosition="bottom" // one of "top", "bottom"
 *     arrowSize={10} // arrow size in pixels
 *     borderColor="#ccc" // color of the border for the tooltip
 *     show={true} // whether the tooltip should currently be visible
 *     targetContainerStyle={targetContainerStyle}
 * >
 *     <TargetElementOfTheTooltip />
 *     <TooltipContents1 />
 *     <TooltipContents2 />
 * </Tooltip>
 *
 * To show/hide the tooltip, the parent component should call the
 * .show() and .hide() methods of the tooltip when appropriate.
 * (These are usually set up as handlers of events on the target element.)
 *
 * Notes:
 *     className should not specify a border; that is handled by borderColor
 *     so that the arrow and tooltip match
 */

//          __,,--``\\
//  _,,-''``         \\     ,
// '----------_.------'-.___|\__
//    _.--''``    `)__   )__   @\__
//   (  .. ''---/___,,E/__,E'------`
//    `-''`''
// Here be dragons.

// TODO(joel/aria) fix z-index issues https://s3.amazonaws.com/uploads.hipchat.com/6574/29028/yOApjwmgiMhEZYJ/Screen%20Shot%202014-05-30%20at%203.34.18%20PM.png
// z-index: 3 on perseus-formats-tooltip seemed to work

import createReactClass from "create-react-class";
import PropTypes from "prop-types";
import * as React from "react";
import ReactDOM from "react-dom";

const zIndex = 10;

const Triangle = createReactClass({
    propTypes: {
        color: PropTypes.string.isRequired,
        left: PropTypes.number.isRequired,
        top: PropTypes.number.isRequired,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        horizontalDirection: PropTypes.oneOf(["left", "right"]).isRequired,
        verticalDirection: PropTypes.oneOf(["top", "bottom"]).isRequired,
    },

    render: function () {
        let borderLeft;
        let borderRight;
        let borderTop;
        let borderBottom;

        const hBorder = `${this.props.width}px solid transparent`;
        if (this.props.horizontalDirection === "right") {
            borderLeft = hBorder;
        } else {
            borderRight = hBorder;
        }

        const vBorder = `${this.props.height}px solid ${this.props.color}`;
        if (this.props.verticalDirection === "top") {
            borderTop = vBorder;
        } else {
            borderBottom = vBorder;
        }

        return (
            <div
                style={{
                    display: "block",
                    height: 0,
                    width: 0,
                    position: "absolute",
                    left: this.props.left,
                    top: this.props["top"],
                    borderLeft: borderLeft,
                    borderRight: borderRight,
                    borderTop: borderTop,
                    borderBottom: borderBottom,
                }}
            />
        );
    },
});

const TooltipArrow = createReactClass({
    propTypes: {
        position: PropTypes.string,
        visibility: PropTypes.string,
        left: PropTypes.number,
        top: PropTypes.number,
        color: PropTypes.string.isRequired, // a css color
        border: PropTypes.string.isRequired, // a css color
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        horizontalDirection: PropTypes.oneOf(["left", "right"]).isRequired,
        verticalDirection: PropTypes.oneOf(["top", "bottom"]).isRequired,
    },

    getDefaultProps: function () {
        return {
            position: "relative",
            visibility: "visible",
            left: 0,
            top: 0,
        };
    },

    // TODO(aria): Think about adding a box-shadow to the triangle here
    // See http://css-tricks.com/triangle-with-shadow/
    render: function () {
        //const isRight = (this.props.horizontalDirection === "right");
        const isTop = this.props.verticalDirection === "top";

        const frontTopOffset = isTop ? 0 : 1;
        const borderTopOffset = isTop ? 0 : -1;

        return (
            <div
                style={{
                    display: "block",
                    position: this.props.position,
                    visibility: this.props.visibility,
                    left: this.props.left,
                    top: this.props["top"],
                    width: this.props.width + 2,
                    height: this.props.height + 1,
                    marginTop: -1,
                    marginBottom: -2,
                    zIndex: zIndex,
                }}
            >
                {/* The background triangle used to create the effect of a
                border around the foreground triangle*/}
                <Triangle
                    horizontalDirection={this.props.horizontalDirection}
                    verticalDirection={this.props.verticalDirection}
                    color={this.props.border}
                    left={0}
                    top={borderTopOffset}
                    width={this.props.width + 2} // one extra for the diagonal
                    height={this.props.height + 2}
                />
                {/* The foreground triangle covers all but the left/right edges
                of the background triangle */}
                <Triangle
                    horizontalDirection={this.props.horizontalDirection}
                    verticalDirection={this.props.verticalDirection}
                    color={this.props.color}
                    left={1}
                    top={frontTopOffset}
                    width={this.props.width}
                    height={this.props.height}
                />
            </div>
        );
    },
});

const VERTICAL_CORNERS = {
    top: {
        top: "-100%",
    },
    bottom: {
        top: 0,
    },
} as const;

const HORIZONTAL_CORNERS = {
    left: {
        targetLeft: 0,
    },

    right: {
        targetLeft: "100%",
    },
} as const;

const HORIZONTAL_ALIGNMNENTS = {
    left: {
        tooltipLeft: 0,
        arrowLeft: (arrowSize) => 0,
    },
    right: {
        tooltipLeft: "-100%",
        arrowLeft: (arrowSize) => -arrowSize - 2,
    },
} as const;

// eslint-disable-next-line react/no-unsafe
const Tooltip = createReactClass({
    propTypes: {
        show: PropTypes.bool.isRequired,
        className: PropTypes.string,
        arrowSize: PropTypes.number,
        borderColor: PropTypes.string,
        verticalPosition: PropTypes.oneOf(Object.keys(VERTICAL_CORNERS)),
        horizontalPosition: PropTypes.oneOf(Object.keys(HORIZONTAL_CORNERS)),
        horizontalAlign: PropTypes.oneOf(Object.keys(HORIZONTAL_ALIGNMNENTS)),
        children: PropTypes.arrayOf(PropTypes.element).isRequired,
        targetContainerStyle: PropTypes.any, // style object
    },

    getDefaultProps: function () {
        return {
            className: "",
            arrowSize: 10,
            borderColor: "#ccc",
            verticalPosition: "bottom",
            horizontalPosition: "left",
            horizontalAlign: "left",
            targetContainerStyle: {},
        };
    },

    getInitialState: function () {
        return {
            height: null, // used for offsetting "top" positioned tooltips
        };
    },

    componentDidMount: function () {
        this._updateHeight();
    },

    UNSAFE_componentWillReceiveProps: function () {
        // If the contents have changed, reset our measure of the height
        this.setState({height: null});
    },

    componentDidUpdate: function () {
        this._updateHeight();
    },

    _renderToolTipDiv: function (isTooltipAbove) {
        const settings = Object.assign(
            {},
            HORIZONTAL_CORNERS[this.props.horizontalPosition],
            HORIZONTAL_ALIGNMNENTS[this.props.horizontalAlign],
            VERTICAL_CORNERS[this.props.verticalPosition],
        );

        let arrowAbove;
        let arrowBelow;

        if (isTooltipAbove) {
            // We put an absolutely positioned arrow in the correct place
            arrowAbove = (
                <TooltipArrow
                    verticalDirection="top"
                    horizontalDirection={this.props.horizontalAlign}
                    position="absolute"
                    color="white"
                    border={this.props.borderColor}
                    left={settings.arrowLeft(this.props.arrowSize)}
                    top={-this.props.arrowSize + 2}
                    width={this.props.arrowSize}
                    height={this.props.arrowSize}
                    zIndex={zIndex}
                />
            );

            // And we use a visibility: hidden arrow below to shift up the
            // content by the correct amount
            arrowBelow = (
                <TooltipArrow
                    verticalDirection="top"
                    horizontalDirection={this.props.horizontalAlign}
                    visibility="hidden"
                    color="white"
                    border={this.props.borderColor}
                    left={settings.arrowLeft(this.props.arrowSize)}
                    top={-1}
                    width={this.props.arrowSize}
                    height={this.props.arrowSize}
                    zIndex={zIndex}
                />
            );
        } else {
            arrowAbove = (
                <TooltipArrow
                    verticalDirection="bottom"
                    horizontalDirection={this.props.horizontalAlign}
                    color="white"
                    border={this.props.borderColor}
                    left={settings.arrowLeft(this.props.arrowSize)}
                    top={-1}
                    width={this.props.arrowSize}
                    height={this.props.arrowSize}
                    zIndex={zIndex}
                />
            );

            arrowBelow = null;
        }

        /* A positioned div below the input to be the parent for our
            tooltip */
        return (
            <div
                style={{
                    position: "relative",
                    height: 0,
                    display: this.props.show ? "block" : "none",
                }}
            >
                <div
                    // eslint-disable-next-line react/no-string-refs
                    ref="tooltipContainer"
                    className="tooltipContainer"
                    style={{
                        position: "absolute",
                        // height must start out undefined, not null, so that
                        // we can measure the actual height with jquery.
                        // This is used to position the tooltip with top: -100%
                        // when in verticalPosition: "top" mode
                        height: this.state.height || undefined,
                        left: settings.targetLeft,
                    }}
                >
                    {arrowAbove}

                    {/* The contents of the tooltip */}
                    <div
                        className={this.props.className}
                        // eslint-disable-next-line react/no-string-refs
                        ref="tooltipContent"
                        style={{
                            position: "relative",
                            top: settings["top"],
                            left: settings.tooltipLeft,
                            border: "1px solid " + this.props.borderColor,
                            boxShadow: "0 1px 3px " + this.props.borderColor,
                            zIndex: zIndex - 1,
                        }}
                    >
                        {this.props.children.slice(1)}
                    </div>

                    {arrowBelow}
                </div>
            </div>
        );
    },

    _updateHeight: function () {
        const height = ReactDOM.findDOMNode(
            // eslint-disable-next-line react/no-string-refs
            this.refs.tooltipContainer,
        ).offsetHeight;
        if (height !== this.state.height) {
            this.setState({height});
        }
    },

    render: function () {
        const isTooltipAbove = this.props.verticalPosition === "top";

        /* We wrap the entire output in a span so that it displays inline */
        return (
            <span>
                {isTooltipAbove && this._renderToolTipDiv(isTooltipAbove)}

                {/* We wrap our input in a div so that we can put the tooltip in a
                div above/below it */}
                <div style={this.props.targetContainerStyle}>
                    {this.props.children[0]}
                </div>

                {!isTooltipAbove && this._renderToolTipDiv()}
            </span>
        );
    },
});

// Sorry.  // Apology-Oriented-Programming
export default Tooltip;
