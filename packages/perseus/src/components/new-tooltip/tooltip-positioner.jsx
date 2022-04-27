// @flow
/**
 * This is TooltipPositioner, part of NewTooltip.
 *
 * This component is responsible for positioning the tooltip UI.
 *
 * (For the sake of example, we'll just talk about tooltips with side="top".
 * For other `side` values, swap out all the direction-y words in this
 * docstring accordingly!)
 *
 * First, this component measures the position of the "target point", the
 * top-center of the target element.
 *
 * Then, it absolute-positions (ish) a "tooltip bubble" (which holds
 * the tooltip contents) to have its bottom-center point exactly align (ish)
 * with the target point.
 *
 * Then, it absolute-positions (precisely) a "tooltip arrow" (a triangle that's
 * visually connected to the bubble) to point from the bottom of the tooltip
 * into the target element.
 *
 * Note that the tooltip bubble is positioned "ish", whereas the tooltip arrow
 * is positioned "precisely". In most cases, the tooltip bubble and tooltip
 * arrow will be centered relative to one another. However, if the tooltip
 * bubble can't quite fit in the available space, then it will shift to the
 * left or right until it fits.
 *
 * So, the tooltip bubble may not be centered on the target element, but the
 * tooltip arrow will be - which produces the effect that the arrow won't
 * always be centered on the tooltip bubble. And that's okay! It's better than
 * the alternative, which is to keep the bubble centered and aggressively wrap
 * it until it fits. (This looks verrry bad in some contexts :P)
 *
 * This flexible positioning strategy is encapsulated in the FlexiblePosition
 * component. Look there for more details!
 *
 * Here's a set of three examples, demonstrating the positioning strategy.
 * Pay special attention to the position of the arrow! (the "v" character)
 *
 * .---------------.          .---------------.               .---------------.
 * | Hello, world! |          | Hello, world! |               | Hello, world! |
 * '-v-------------'          '-------v-------'               '-------------v-'
 * <hi!>                            <hi!>                                 <hi!>
 *
 * In order to keep the tooltip aligned with the target element, we listen for
 * events that might cause the target element to move, like window resizes, or
 * scroll events. This behavior is liable to cause performance issues, so we'll
 * need to keep an eye on this logic, and make clever compromises where
 * necessary!
 *
 * This component has a public method `remeasure`, to handle `remeasure` calls
 * passed down from NewTooltip. Calling this method will cause the bubble and
 * arrow to update their position.
 *
 * NOTE(mdr): This component assumes that it's mounted in the root node
 *     provided via props. Do not attempt to mount this component in another
 *     context.
 */
import {StyleSheet, css} from "aphrodite";
import * as React from "react";

import {Errors} from "../../logging/log.js";
import {PerseusError} from "../../perseus-error.js";
import {
    zindexTooltip,
    zindexAboveModal,
} from "../../styles/global-constants.js";

import FlexiblePosition from "./flexible-position.jsx";
import {
    arrowHeight,
    arrowWidth,
    bubbleBorderRadius,
} from "./style-constants.js";
import TooltipArrow from "./tooltip-arrow.jsx";
import TooltipBubble from "./tooltip-bubble.jsx";

import type {NewTooltipProps} from "./types.js";

type TooltipPositionerProps = {
    tooltipProps: NewTooltipProps,
    dismiss: () => void,
    rootElement: HTMLElement,
    targetElement: HTMLElement,
    isAboveModal?: boolean,
    ...
};

type TooltipPositionerState = {
    targetElementClientRect: ?ClientRect,
    rootElementClientRect: ?ClientRect,
    ...
};

type TargetPointOffsets = {
    pxFromTop: number,
    pxFromBottom: number,
    pxFromLeft: number,
    pxFromRight: number,
    ...
};

export default class TooltipPositioner extends React.PureComponent<
    TooltipPositionerProps,
    TooltipPositionerState,
> {
    _mountRemeasureTimeout: ?TimeoutID;

    state: TooltipPositionerState = {
        targetElementClientRect: null,
        rootElementClientRect: null,
    };

    componentDidMount() {
        // Wait a tick, then measure the elements.
        //
        // NOTE(mdr): This is necessary for all tooltips in IE and Edge, and
        //     some tooltips in other browsers, but I don't understand why.
        //     NewTooltip already waits a tick after mount before rendering
        //     this React subtree, so I would've expected styles to be present
        //     already when this element was initialized. But, without this,
        //     many tooltips are mis-positioned on IE and Edge, and the
        //     `CrossOutTooltip` is apparently always mispositioned, regardless
        //     of browser. So, shrug!
        // TODO(jeff, WEB-1378): Use Wonder Blocks Timing API.
        // eslint-disable-next-line no-restricted-syntax
        this._mountRemeasureTimeout = setTimeout(this.remeasure, 0);

        window.addEventListener("resize", this.remeasure);
        window.addEventListener("scroll", this._handleScroll, true);
    }

    componentWillUnmount() {
        if (this._mountRemeasureTimeout) {
            // TODO(jeff, WEB-1378): Use Wonder Blocks Timing API.
            // eslint-disable-next-line no-restricted-syntax
            clearTimeout(this._mountRemeasureTimeout);
        }
        window.removeEventListener("resize", this.remeasure);
        window.removeEventListener("scroll", this._handleScroll, true);
    }

    /**
     * This is a global scroll handler, which detects all scroll events on the
     * page. As a quick check before proceeding, we query whether the scroll
     * container sits between the root and the target element. If so, this
     * probably affected position, and we should `remeasure` ourselves. If not,
     * do nothing.
     *
     * NOTE(mdr): This is roughly the same check as in VisibilityObserver.
     */
    _handleScroll: (e: Event) => void = (e: Event) => {
        const {rootElement, targetElement} = this.props;
        const scrollContainer: HTMLElement = (e.target: any);

        if (
            rootElement.contains(scrollContainer) &&
            scrollContainer.contains(targetElement)
        ) {
            this.remeasure();
        }
    };

    /**
     * Find the "target point" of the target element: the place where the
     * tooltip arrow will point.
     *
     * When side="top", this is the top-center point.
     * When side="bottom", this is the bottom-center point.
     * When side="left", this is the left-center point.
     * When side="right", this is the right-center point.
     *
     * Compute the target point's offsets from various sides of the screen,
     * and return them. We'll use these offsets to position the tooltip bubble
     * and arrow.
     */
    _computeTargetPointOffsets(
        targetElementClientRect: ClientRect,
        rootElementClientRect: ClientRect,
    ): TargetPointOffsets {
        const {offset, offsetFrom, side} = this.props.tooltipProps;
        const t = targetElementClientRect;
        const r = rootElementClientRect;

        // When `offsetFrom` is "arrow", we need to perform offset from the
        // arrow, rather than the bubble. To do this, we simply increase the
        // offset amount by the arrow's height.
        let totalOffset = offset;
        if (offsetFrom === "arrow") {
            totalOffset += arrowHeight;
        }

        // Compute the position of the target point, relative to the viewport.
        // Our choice of target point depends on the `side` prop, and will be
        // shifted according to the `offset` prop.
        let targetPoint;
        if (side === "top") {
            targetPoint = {
                left: t.left + t.width / 2,
                top: t.top - totalOffset,
            };
        } else if (side === "bottom") {
            targetPoint = {
                left: t.left + t.width / 2,
                top: t.bottom + totalOffset,
            };
        } else if (side === "left") {
            targetPoint = {
                left: t.left - totalOffset,
                top: t.top + t.height / 2,
            };
        } else if (side === "right") {
            targetPoint = {
                left: t.right + totalOffset,
                top: t.top + t.height / 2,
            };
        } else {
            throw new PerseusError(
                `unexpected side ${side}`,
                Errors.InvalidInput,
            );
        }

        // Take the target point, and compute its offset from each side of the
        // root element.
        //
        // Note that the client rect's `right` coordinate is the distance
        // between the element's right edge and the _left_ of the screen, not
        // the right of the screen. The `bottom` coordinate is similarly
        // unintuitive. Surprise!
        //
        // Thankfully, unlike client rects, our `pxFromRight` offset is more
        // what you'd expect: it's the distance between the target point and
        // the _right_ edge of the root element.
        return {
            pxFromTop: targetPoint.top - r.top,
            pxFromBottom: r.bottom - targetPoint.top,
            pxFromLeft: targetPoint.left - r.left,
            pxFromRight: r.right - targetPoint.left,
        };
    }

    _renderBubble(targetPoint: TargetPointOffsets): React.Element<"div"> {
        const {isAboveModal} = this.props;
        const {side, tooltipMargin} = this.props.tooltipProps;

        // Compute the wrapper styles and FlexiblePosition props to position
        // the bubble at the target point. We also apply "tooltip margin"
        // styles, to prevent the tooltip from getting too close to the sides
        // of the page. Also, in addition to the styles set here, we set one
        // more position coordinate in the following block.
        let bubblePositionerClass;
        const bubblePositionerStyles = {};
        const bubbleFlexiblePositionProps = {};
        const bubbleWrapperStyles = {};
        if (side === "top" || side === "bottom") {
            bubblePositionerClass = styles.tooltipBubblePositionerTopBottom;
            bubbleFlexiblePositionProps.direction = "horizontal";
            bubbleFlexiblePositionProps.pxFromStart = targetPoint.pxFromLeft;
            bubbleFlexiblePositionProps.pxFromEnd = targetPoint.pxFromRight;
            bubbleWrapperStyles.marginLeft = tooltipMargin;
            bubbleWrapperStyles.marginRight = tooltipMargin;
        } else if (side === "left" || side === "right") {
            bubblePositionerClass = styles.tooltipBubblePositionerLeftRight;
            bubbleFlexiblePositionProps.direction = "vertical";
            bubbleFlexiblePositionProps.pxFromStart = targetPoint.pxFromTop;
            bubbleFlexiblePositionProps.pxFromEnd = targetPoint.pxFromBottom;
            bubbleWrapperStyles.marginTop = tooltipMargin;
            bubbleWrapperStyles.marginBottom = tooltipMargin;
        } else {
            throw new PerseusError(
                `unexpected side ${side}`,
                Errors.InvalidInput,
            );
        }

        // When side="top", we position ourselves relative to the bottom of the
        // root, so that the tooltip's height will grow upward from the target
        // point.
        //
        // When side="bottom", we position ourselves relative to the top of the
        // root, so that the tooltip's height will grow downward from the
        // target point.
        //
        // When side="left", we position ourselves relative to the right of the
        // root, so that the tooltip's width will grow leftward from the target
        // point.
        //
        // When side="right", we position ourselves relative to the right of
        // the root, so that the tooltip's width will grow rightward from the
        // target point.
        if (side === "top") {
            bubblePositionerStyles.bottom = targetPoint.pxFromBottom;
        } else if (side === "bottom") {
            bubblePositionerStyles.top = targetPoint.pxFromTop;
        } else if (side === "left") {
            bubblePositionerStyles.right = targetPoint.pxFromRight;
        } else if (side === "right") {
            bubblePositionerStyles.left = targetPoint.pxFromLeft;
        } else {
            throw new PerseusError(
                `unexpected side ${side}`,
                Errors.InvalidInput,
            );
        }

        return (
            <div
                className={css(
                    styles.tooltipBubblePositioner,
                    bubblePositionerClass,
                    isAboveModal && styles.tooltipAboveModal,
                )}
                style={bubblePositionerStyles}
            >
                <FlexiblePosition {...bubbleFlexiblePositionProps}>
                    <div
                        className={css(styles.tooltipBubbleWrapper)}
                        style={bubbleWrapperStyles}
                    >
                        <TooltipBubble
                            tooltipProps={this.props.tooltipProps}
                            dismiss={this.props.dismiss}
                        />
                    </div>
                </FlexiblePosition>
            </div>
        );
    }

    _renderArrow(
        targetPoint: TargetPointOffsets,
        rootElementClientRect: ClientRect,
    ): React.Element<"div"> {
        const {isAboveModal} = this.props;
        const {side, tooltipMargin} = this.props.tooltipProps;
        const arrowStyles = {};

        // Compute the vertical position of the arrow (if side is top/bottom),
        // or horizontal position (if side is left/right). Include one extra
        // pixel to get the overlapping just right!
        //
        // When side="top", we position ourselves relative to the bottom of the
        // root element, etc., for consistency with the tooltip bubble. This
        // ensures that, even in the face of extreme circumstances (e.g. the
        // root element unexpectedly changing size), the arrow and bubble will
        // never separate from each other.
        if (side === "top") {
            arrowStyles.bottom = targetPoint.pxFromBottom - arrowHeight + 1;
        } else if (side === "bottom") {
            arrowStyles.top = targetPoint.pxFromTop - arrowHeight + 1;
        } else if (side === "left") {
            arrowStyles.right = targetPoint.pxFromRight - arrowHeight + 1;
        } else if (side === "right") {
            arrowStyles.left = targetPoint.pxFromLeft - arrowHeight + 1;
        } else {
            throw new PerseusError(
                `unexpected side ${side}`,
                Errors.InvalidInput,
            );
        }

        // Compute the horizontal position of the arrow (if side is top/bottom),
        // or vertical position (if side is left/right).
        //
        // While we don't care about the arrow lining up with any *exact* point
        // on the tooltip bubble, we *do* want to ensure that we don't align it
        // with one of the curved corners.
        //
        // So, we determine the minimum and maximum position value that would
        // be safe for the arrow to have while still leaving room for the
        // border radius, and clamp the value to that range.
        //
        // If the page is very narrow, then it's possible that the arrow is too
        // wide, and will have to exceed one bound or the other. In that case,
        // well, that's what you get for using a 18px-wide viewport :P
        const extraSpace = tooltipMargin + bubbleBorderRadius;

        if (side === "top" || side === "bottom") {
            const minLeft = extraSpace;
            const maxLeft =
                rootElementClientRect.width - arrowWidth - extraSpace;
            arrowStyles.left = targetPoint.pxFromLeft - arrowWidth / 2;
            arrowStyles.left = Math.min(arrowStyles.left, maxLeft);
            arrowStyles.left = Math.max(arrowStyles.left, minLeft);
        } else if (side === "left" || side === "right") {
            const minTop = extraSpace;
            const maxTop =
                rootElementClientRect.height - arrowWidth - extraSpace;
            arrowStyles.top = targetPoint.pxFromTop - arrowWidth / 2;
            arrowStyles.top = Math.min(arrowStyles.top, maxTop);
            arrowStyles.top = Math.max(arrowStyles.top, minTop);
        } else {
            throw new PerseusError(
                `unexpected side ${side}`,
                Errors.InvalidInput,
            );
        }

        return (
            <div
                className={css(
                    styles.tooltipArrowPositioner,
                    isAboveModal && styles.tooltipAboveModal,
                )}
                style={arrowStyles}
            >
                <TooltipArrow tooltipProps={this.props.tooltipProps} />
            </div>
        );
    }

    /**
     * Build an Aphrodite style that filters the tooltip's visibility by the
     * `media` prop provided to NewTooltip.
     *
     * When the media query is satisfied, this will have `display: block`. When
     * the media query is not satisfied, this will have `display: none`.
     *
     * If no `media` prop was provided, this returns null.
     */
    _buildMediaFilterStyle(): $FlowFixMe {
        const {media} = this.props.tooltipProps;
        if (!media) {
            return null;
        }

        // NOTE(mdr): It's not, like, _good practice_ to create Aphrodite
        //     stylesheets inline like this, but there's no significant
        //     negative consequences! Thanks to Aphrodite's hashing strategy,
        //     this will always yield the same class name, even though we
        //     rebuild the stylesheet from scratch on each render.
        const mediaFilterStyleSheet = StyleSheet.create({
            mediaFilter: {
                display: "none",
                [media]: {
                    display: "block",
                },
            },
        });

        return mediaFilterStyleSheet.mediaFilter;
    }

    remeasure: () => void = () => {
        const {targetElement, rootElement} = this.props;
        this.setState({
            targetElementClientRect: targetElement.getBoundingClientRect(),
            rootElementClientRect: rootElement.getBoundingClientRect(),
        });
    };

    render(): null | React.Element<"div"> {
        const {targetElementClientRect, rootElementClientRect} = this.state;
        if (!targetElementClientRect || !rootElementClientRect) {
            return null;
        }

        const targetPoint = this._computeTargetPointOffsets(
            targetElementClientRect,
            rootElementClientRect,
        );

        return (
            <div className={css(this._buildMediaFilterStyle())}>
                {this._renderBubble(targetPoint)}
                {this._renderArrow(targetPoint, rootElementClientRect)}
            </div>
        );
    }
}

const styles = StyleSheet.create({
    tooltipBubblePositioner: {
        // Absolute position.
        // `top`/`bottom`/`left`/`right` provided dynamically, and also by the
        // additional `tooltipBubblePositioner` classes.
        position: "absolute",
        zIndex: zindexTooltip,

        // Disable pointer events, so that any extra empty space consumed by
        // the FlexiblePosition element is not clickable. In
        // `tooltipBubbleWrapper`, we reset this style, so that the user can
        // interact with the tooltip content.
        pointerEvents: "none",
    },

    tooltipAboveModal: {
        zIndex: zindexAboveModal,
    },

    // More positioner styles for when side="top" or side="bottom".
    tooltipBubblePositionerTopBottom: {
        // The positioner consumes the full page width, which gives the
        // FlexiblePosition element the freedom to position the tooltip
        // anywhere horizontally on the page. (Though, of course, it'll aim for
        // the target point!)
        left: 0,
        width: "100%",
    },

    // More positioner styles for when side="left" or side="right".
    tooltipBubblePositionerLeftRight: {
        // The positioner consumes the full page height, which gives the
        // FlexiblePosition element the freedom to position the tooltip
        // anywhere horizontally on the page. (Though, of course, it'll aim for
        // the target point!)
        top: 0,
        height: "100%",
    },

    tooltipBubbleWrapper: {
        // `marginLeft` and `marginRight` styles are provided dynamically, to
        // implement the `tooltipMargin` provided by the caller.

        // Re-enable pointer events, which were disabled by
        // `tooltipBubblePositioner`, so that the user can interact with the
        // tooltip content.
        pointerEvents: "auto",
    },

    tooltipArrowPositioner: {
        // `left` and `top`/`bottom` styles are provided dynamically.
        position: "absolute",
        zIndex: zindexTooltip,

        pointerEvents: "none",
    },
});
