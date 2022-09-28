// @flow
/**
 * A tooltip to point to the focus of a highlight.
 *
 * We use the NewTooltip component, which positions itself not by coordinate,
 * but by watching the position of a target DOM element. So, we render a 0x0
 * DOM element, absolute-position it to the position of the the highlight
 * focus, and point the tooltip at that 0x0 element.
 *
 * This technique enables NewTooltip to use its existing visibility-watching
 * and scroll-tracking logic to effectively "watch" the focus of this
 * highlight. So, we get lots of the repositioning logic for free! But we _do_
 * still have to notify the tooltip to remeasure itself when the highlight
 * focus _changes_.
 */
import {StyleSheet, css} from "aphrodite";
import * as React from "react";

import {Log} from "../../../logging/log.js";
import {colors} from "../../../styles/global-styles.js";
import NewTooltip from "../../new-tooltip/new-tooltip.jsx";

import {getRelativeRect} from "./util.js";

import type {Rect} from "./types.js";

type HighlightTooltipProps = {|
    label: string,
    onClick: () => mixed,
    onMouseEnter?: () => mixed,
    onMouseLeave?: () => mixed,

    focusNode: Node,
    focusOffset: number,
    offsetParent: Element,
|};

class HighlightTooltip extends React.PureComponent<HighlightTooltipProps> {
    _tooltip: ?React.ElementRef<typeof NewTooltip>;

    _getFocusRect(): ?Rect {
        const {focusNode, focusOffset, offsetParent} = this.props;

        // Get a range of *just* the focus point of the selection.
        const focusRange = document.createRange();
        focusRange.setStart(focusNode, focusOffset);
        focusRange.setEnd(focusNode, focusOffset);

        // Then, get the bounding box of the collapsed range. This will be a
        // zero-width rectangle, but still have positioning information, which
        // we can use the position the tooltip.
        //
        // NOTE(mdr): If we used getClientBoundingRect here instead, Safari
        //     would return an unpositioned rect. But all tested browsers at
        //     time of writing (latest Chrome, Firefox, Safari) return at least
        //     one rectangle from getClientRects, and it's well-positioned.
        const focusRect = focusRange.getClientRects()[0];

        // NOTE(mdr): ...except in the case where the focus is between two
        //     paragraphs, in which case the focus range has no client rects?
        //     Not sure why, or in what browsers (only noticed in Chrome 60),
        //     but let's catch that case and bail out.
        // TODO(mdr): Instead, we should somehow walk back the range until we
        //     find an appropriate position for the tooltip. Sounds tricky!
        if (!focusRect) {
            Log.log(
                "[Highlighting] Known bug: Could not determine the focus " +
                    'position, so did not show an "Add Highlight" tooltip. ' +
                    "https://app.asana.com/0/329800276300868/413878480039713 " +
                    "(see also /r/asana-links)",
            );
            return null;
        }

        // Compute the desired position of the tooltip relative to the offset
        // parent.
        const {left, top} = offsetParent.getBoundingClientRect();
        const relativeFocusRect = getRelativeRect(
            {
                left: focusRect.left,
                top: focusRect.top,
                width: focusRect.width,
                height: focusRect.height,
            },
            {left, top},
        );

        return relativeFocusRect;
    }

    render(): null | React.Node {
        const focusRect = this._getFocusRect();
        if (!focusRect) {
            return null;
        }

        const content = (
            <div className={css(styles.tooltipLabel)}>{this.props.label}</div>
        );

        return (
            <NewTooltip
                content={content}
                color={colors.kaBlue}
                inverted={true}
                onClick={this.props.onClick}
                onMouseEnter={this.props.onMouseEnter}
                onMouseLeave={this.props.onMouseLeave}
                toggleOnHover={false}
                showOnMount={true}
                ref={(e) => (this._tooltip = e)}
            >
                <div
                    style={{
                        position: "absolute",
                        left: focusRect.left,
                        top: focusRect.top,
                        height: focusRect.height,
                    }}
                />
            </NewTooltip>
        );
    }
}

const styles = StyleSheet.create({
    tooltipLabel: {
        // Unlike most tooltip contents, we don't want this label to be
        // selectable. Selecting it is not only unhelpful, but dangerous: if
        // the user accidentally selects the "Add highlight" tooltip text, then
        // we lose our reference to the _actual_ text they want to highlight,
        // and the "Add highlight" action fails.
        userSelect: "none",
    },
});

export default HighlightTooltip;
