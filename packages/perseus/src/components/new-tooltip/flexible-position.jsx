// @flow
/**
 * This is FlexiblePosition, part of NewTooltip.
 *
 * This generalizable component attempts to center its children relative to a
 * given point... but refuses to allow the children to overflow their
 * container. If the children *would* overflow, we first use the Flexbox
 * algorithm to shift the element off-center. If that still doesn't work (i.e.,
 * the children are larger than the container), then we shrink the children.
 *
 * This layout algorithm is entirely implemented via Flexbox. We have three
 * elements: the pre-content spacer, the content, and the post-content spacer.
 * The pre-content spacer and post-content spacer use their basis sizes to
 * position the content at the target point, then shrink by equal amounts in
 * order to *center* the content at the target point.
 *
 * To understand the algorithm, first consider *just* the spacer elements.
 * If the container is 80px wide, and we're targeting a point 60px from the
 * right and 20px from the left, then the spacer elements will use those values
 * as their flex-basis:
 *
 * [        pre-content         ][   post-content   ]
 *
 * They take up 100% of the container by default. But, if the content element
 * _also_ wants space, then the pre-content and post-content spacers need to
 * shrink. We've configured them to shrink by equal amounts, which therefore
 * center-aligns the target element at the target point.
 *
 * [      pre-content      ][content ][post-content ]
 *
 * (Incidentally, the flex-shrink property is surprisingly complicated: it's
 * defined relative to the element's own flex-basis. So, to get the spacers to
 * shrink at equal rates, we define each spacer's flex-shrink to match the
 * _other_ element's flex-basis. Fun! ^_^`)
 *
 * TODO(mdr): This component currently only supports horizontal positioning,
 *     but we'll probably extend it later to support vertical positioning, too.
 */
import {StyleSheet, css} from "aphrodite";
import * as React from "react";

type FlexiblePositionProps = {
    children: React.Node,
    // The direction along which to position the element.
    //
    // If "horizontal", this will be a full-width element that horizontally
    // positions its children near a target x-coordinate.
    //
    // If "vertical", this will be a full-height element that vertically
    // positions its children near a target y-coordinate.
    direction: "horizontal" | "vertical",
    // Specify the target point, by providing its distance from the flex-start
    // and its distance from the flex-end. (These, together, must sum to the
    // total container size.)
    //
    // If `direction` is "horizontal", then `pxFromStart` is the target
    // position's offset from the left of the container, and `pxFromEnd` is the
    // offset from the right.
    //
    // If `direction` is "vertical", then `pxFromStart` is the target
    // position's offset from the top of the container, and `pxFromEnd` is the
    // offset from the bottom.
    pxFromStart: number,
    pxFromEnd: number,
    ...
};

export default class FlexiblePosition extends React.PureComponent<FlexiblePositionProps> {
    render(): React.Element<"div"> {
        const {direction, pxFromStart, pxFromEnd} = this.props;

        const wrapperStyles = [
            styles.wrapper,
            direction === "horizontal" && styles.wrapperHorizontal,
            direction === "vertical" && styles.wrapperVertical,
        ];
        const contentStyles = [
            styles.content,
            direction === "horizontal" && styles.contentHorizontal,
            direction === "vertical" && styles.contentVertical,
        ];

        // We need to handle the zero cases specially, because otherwise we get
        // spacer elements with `flex-shrink: 0` - that is, they don't shrink
        // for the content at all!
        if (pxFromStart === 0) {
            return (
                <div className={css(...wrapperStyles)}>
                    <div className={css(...contentStyles)}>
                        {this.props.children}
                    </div>
                </div>
            );
        }
        if (pxFromEnd === 0) {
            return (
                <div
                    className={css(...wrapperStyles, styles.wrapperAlignToEnd)}
                >
                    <div className={css(...contentStyles)}>
                        {this.props.children}
                    </div>
                </div>
            );
        }

        return (
            <div className={css(...wrapperStyles)}>
                <div
                    style={{
                        flexShrink: pxFromEnd,
                        flexBasis: pxFromStart,
                    }}
                />
                <div className={css(...contentStyles)}>
                    {this.props.children}
                </div>
                <div
                    style={{
                        flexShrink: pxFromStart,
                        flexBasis: pxFromEnd,
                    }}
                />
            </div>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        display: "flex",
        overflow: "hidden",
    },

    wrapperHorizontal: {
        flexDirection: "row",

        // The FlexiblePosition container takes the full width of its parent,
        // and will not allow overflow (see `styles.wrapper`). This ensures
        // that we prefer to shrink our contents, rather than overflow our
        // parent.
        width: "100%",
    },

    wrapperVertical: {
        flexDirection: "column",

        // The FlexiblePosition container takes the full height of its parent,
        // and will not allow overflow (see `styles.wrapper`). This ensures
        // that we prefer to shrink our contents, rather than overflow our
        // parent.
        height: "100%",
    },

    wrapperAlignToEnd: {
        justifyContent: "flex-end",
    },

    content: {
        // The content element must not grow or shrink, and instead always use
        // its basis value.
        flex: "0 0 auto",
    },

    contentHorizontal: {
        // The only case in which the content element should "shrink" is when
        // the content itself is too large for the container. In this case, we
        // constrain the size with maximum width. (We can't use flex-shrink for
        // this behavior, because we need the spacer elements to be prioritized
        // as the only flex-shrinkable elements.)
        maxWidth: "100%",
    },

    contentVertical: {
        // The only case in which the content element should "shrink" is when
        // the content itself is too large for the container. In this case, we
        // constrain the size with maximum height. (We can't use flex-shrink
        // for this behavior, because we need the spacer elements to be
        // prioritized as the only flex-shrinkable elements.)
        maxHeight: "100%",
    },
});
