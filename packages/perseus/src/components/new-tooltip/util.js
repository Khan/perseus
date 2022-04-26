// @flow
/**
 * Utility functions for the NewTooltip component.
 */
import Color from "@khanacademy/wonder-blocks-color";

import type {NewTooltipProps} from "./types.js";

/**
 * Given a set of NewTooltipProps, return the `backgroundColor` and `textColor`
 * of the tooltip. Used in TooltipArrow and TooltipBubble.
 */
export function getTooltipColors(tooltipProps: {
    color: NewTooltipProps["color"],
    inverted: NewTooltipProps["inverted"],
    ...
}): {|
    backgroundColor: string,
    textColor: string,
|} {
    const {color, inverted} = tooltipProps;

    if (inverted) {
        return {backgroundColor: color, textColor: Color.white};
    }
    return {backgroundColor: Color.white, textColor: color};
}
