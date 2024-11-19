/* eslint-disable react/no-unsafe */

// TODO(joel/aria) fix z-index issues https://s3.amazonaws.com/uploads.hipchat.com/6574/29028/yOApjwmgiMhEZYJ/Screen%20Shot%202014-05-30%20at%203.34.18%20PM.png
// z-index: 3 on perseus-formats-tooltip seemed to work

import * as React from "react";
import ReactDOM from "react-dom";

import type {Property} from "csstype";

const zIndex = 10;

export enum HorizontalDirection {
    Left = "left",
    Right = "right",
}

export enum VerticalDirection {
    Top = "top",
    Bottom = "bottom",
}

type TriangleProps = {
    color: string;
    left: number;
    top: number;
    width: number;
    height: number;
    horizontalDirection: HorizontalDirection;
    verticalDirection: VerticalDirection;
};

const Triangle = (props: TriangleProps) => {
    let borderLeft;
    let borderRight;
    let borderTop;
    let borderBottom;

    const hBorder = `${props.width}px solid transparent`;
    if (props.horizontalDirection === "right") {
        borderLeft = hBorder;
    } else {
        borderRight = hBorder;
    }

    const vBorder = `${props.height}px solid ${props.color}`;
    if (props.verticalDirection === "top") {
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
                left: props.left,
                top: props.top,
                borderLeft: borderLeft,
                borderRight: borderRight,
                borderTop: borderTop,
                borderBottom: borderBottom,
            }}
        />
    );
};

type TooltipArrowProps = {
    position?: Property.Position;
    visibility?: Property.Visibility;
    left?: number;
    top?: number;
    color: string; // a css color
    border: string; // a css color
    width: number;
    height: number;
    horizontalDirection: HorizontalDirection;
    verticalDirection: VerticalDirection;
    zIndex?: number;
};

const TooltipArrow = ({
    position = "relative",
    visibility = "visible",
    left = 100,
    top = 0,
    ...props
}: TooltipArrowProps) => {
    // TODO(aria): Think about adding a box-shadow to the triangle here
    // See http://css-tricks.com/triangle-with-shadow/

    //const isRight = (this.props.horizontalDirection === "right");
    const isTop = props.verticalDirection === "top";

    const frontTopOffset = isTop ? 0 : 1;
    const borderTopOffset = isTop ? 0 : -1;

    return (
        <div
            style={{
                display: "block",
                position: position,
                visibility: visibility,
                left: left,
                top: top,
                width: props.width + 2,
                height: props.height + 1,
                marginTop: -1,
                marginBottom: -2,
                zIndex: zIndex,
            }}
        >
            {/* The background triangle used to create the effect of a
                border around the foreground triangle*/}
            <Triangle
                horizontalDirection={props.horizontalDirection}
                verticalDirection={props.verticalDirection}
                color={props.border}
                left={0}
                top={borderTopOffset}
                width={props.width + 2} // one extra for the diagonal
                height={props.height + 2}
            />
            {/* The foreground triangle covers all but the left/right edges
                of the background triangle */}
            <Triangle
                horizontalDirection={props.horizontalDirection}
                verticalDirection={props.verticalDirection}
                color={props.color}
                left={1}
                top={frontTopOffset}
                width={props.width}
                height={props.height}
            />
        </div>
    );
};

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

type Props = {
    show: boolean;
    className: string;
    arrowSize: number;
    borderColor: string;
    verticalPosition: VerticalDirection;
    horizontalPosition: HorizontalDirection;
    horizontalAlign: HorizontalDirection.Left;
    children: React.ReactNode;
    targetContainerStyle: any; // style object
};

type DefaultProps = {
    className: Props["className"];
    arrowSize: Props["arrowSize"];
    borderColor: Props["borderColor"];
    verticalPosition: Props["verticalPosition"];
    horizontalPosition: Props["horizontalPosition"];
    horizontalAlign: Props["horizontalAlign"];
    targetContainerStyle: Props["targetContainerStyle"];
};

type State = {
    height: number | null;
};

/**
 * DEPRECATED! Use Wonder Blocks tooltip instead.
 *
 * A generic tooltip library for React.js
 *
 * ```
 * import Tooltip from "./tooltip";
 * <Tooltip
 *     className="class-for-tooltip-contents"
 *     horizontalPosition={HoriziontalDirection.Left}
 *     horizontalAlign={HoriziontalDirection.Left}
 *     verticalPosition={VerticalDirection.Top}
 *     arrowSize={10} // arrow size in pixels
 *     borderColor="#ccc" // color of the border for the tooltip
 *     show={true} // whether the tooltip should currently be visible
 *     targetContainerStyle={targetContainerStyle}
 * >
 *     <TargetElementOfTheTooltip />
 *     <TooltipContents1 />
 *     <TooltipContents2 />
 * </Tooltip>
 * ```
 *
 * To show/hide the tooltip, the parent component should call the
 * `.show()` and `.hide()` methods of the tooltip when appropriate.
 * (These are usually set up as handlers of events on the target element.)
 *
 * Notes:
 *     `className` should not specify a border; that is handled by `borderColor`
 *     so that the arrow and tooltip match
 *
 * ```
 *          __,,--``\\
 *  _,,-''``         \\     ,
 * '----------_.------'-.___|\__
 *    _.--''``    `)__   )__   @\__
 *   (  .. ''---/___,,E/__,E'------`
 *    `-''`''
 * Here be dragons.
 * ```
 */
class Tooltip extends React.Component<Props, State> {
    static defaultProps: DefaultProps = {
        className: "",
        arrowSize: 10,
        borderColor: "#ccc",
        verticalPosition: VerticalDirection.Bottom,
        horizontalPosition: HorizontalDirection.Left,
        horizontalAlign: HorizontalDirection.Left,
        targetContainerStyle: {},
    };

    state: State = {
        height: null, // used for offsetting "top" positioned tooltips
    };

    componentDidMount() {
        this._updateHeight();
    }

    UNSAFE_componentWillReceiveProps() {
        // If the contents have changed, reset our measure of the height
        this.setState({height: null});
    }

    componentDidUpdate() {
        this._updateHeight();
    }

    _renderToolTipDiv(isTooltipAbove?: boolean) {
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
                    verticalDirection={VerticalDirection.Top}
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
                    verticalDirection={VerticalDirection.Top}
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
                    verticalDirection={VerticalDirection.Bottom}
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
                    role="tooltip"
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
                        {/* @ts-expect-error TS2533 - First child is target, rest is tooltip content */}
                        {this.props.children.slice(1)}
                    </div>

                    {arrowBelow}
                </div>
            </div>
        );
    }

    _updateHeight() {
        const tooltipContainer = ReactDOM.findDOMNode(
            // eslint-disable-next-line react/no-string-refs
            this.refs.tooltipContainer,
        ) as HTMLDivElement;
        const height = tooltipContainer.offsetHeight;
        if (height !== this.state.height) {
            this.setState({height});
        }
    }

    render() {
        const isTooltipAbove = this.props.verticalPosition === "top";

        /* We wrap the entire output in a span so that it displays inline */
        return (
            <span>
                {isTooltipAbove && this._renderToolTipDiv(isTooltipAbove)}

                {/* We wrap our input in a div so that we can put the tooltip in a
                div above/below it */}
                <div style={this.props.targetContainerStyle}>
                    {/* @ts-expect-error TS2533 - First child is target, rest is tooltip content */}
                    {this.props.children[0]}
                </div>

                {!isTooltipAbove && this._renderToolTipDiv()}
            </span>
        );
    }
}

// Sorry.  // Apology-Oriented-Programming
export default Tooltip;
