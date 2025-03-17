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
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import Tooltip from "@khanacademy/wonder-blocks-tooltip";
import {StyleSheet, css} from "aphrodite";
import * as React from "react";

import {Log} from "../../../logging/log";

import {getRelativeRect} from "./util";

import type {Rect} from "./types";

type Props = {
    label: string;
    onClick: () => unknown;
    onMouseEnter?: () => unknown;
    onMouseLeave?: () => unknown;
    focusNode: Node;
    focusOffset: number;
    offsetParent: Element;
};

class HighlightTooltip extends React.PureComponent<Props> {
    _getFocusRect(): Rect | null | undefined {
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
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
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

    render(): null | React.ReactNode {
        const focusRect = this._getFocusRect();
        if (!focusRect) {
            return null;
        }

        // using div instead of TooltipContent because
        // TooltipContent wouldn't let me overwrite
        // user-select and onClick
        const content: any = (
            // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events -- TODO(LEMS-2871): Address a11y error
            <div
                className={css(styles.tooltipLabel)}
                onClick={this.props.onClick}
            >
                {this.props.label}
            </div>
        );

        const style = {
            position: "absolute",
            left: focusRect.left,
            // offset the spacing WB provides around tooltips
            top: `calc(${Math.round(focusRect.top)}px + 0.95em)`,
            height: 0,
        } as const;

        return (
            // eslint-disable-next-line jsx-a11y/no-static-element-interactions -- TODO(LEMS-2871): Address a11y error
            <div
                style={style}
                onMouseEnter={this.props.onMouseEnter}
                onMouseLeave={this.props.onMouseLeave}
            >
                <Tooltip content={content} opened={true}>
                    <div />
                </Tooltip>
            </div>
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
        fontFamily: `"Lato", sans-serif`,
        padding: `10px ${spacing.medium_16}px`,
        cursor: "pointer",
    },
});

export default HighlightTooltip;
