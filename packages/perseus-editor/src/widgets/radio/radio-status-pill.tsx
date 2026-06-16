import {StatusBadge} from "@khanacademy/wonder-blocks-badge";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {border, semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import checkIcon from "@phosphor-icons/core/bold/check-bold.svg";
import minusCircleIcon from "@phosphor-icons/core/bold/minus-circle-bold.svg";
import * as React from "react";

import type {StyleType} from "@khanacademy/wonder-blocks-core";

interface RadioStatusPillProps {
    index: number;
    correct?: boolean;
    multipleSelect: boolean;
}

// Passed to StatusBadge's `styles` prop, which is typed as Wonder Blocks
// `StyleType` (per-part: root/icon/label) and does not accept a className.
// Match the original Pill's compact, fixed-width box so the A/B/C indicators
// stay aligned; `cursor: default` since the badge is read-only (status is set
// via the adjacent segmented control), not clickable.
const boxStyle: StyleType = {
    width: sizing.size_560,
    justifyContent: "center",
    boxSizing: "border-box",
    cursor: "default",
};
const roundStyle: StyleType = {borderRadius: sizing.size_240};
const squareStyle: StyleType = {borderRadius: border.radius.radius_040};
// Correct uses the strong (dark green) fill with knockout (white) content,
// matching the runtime choice indicator. Incorrect keeps StatusBadge's default
// subtle critical (light red) styling.
const correctStrongStyle: StyleType = {
    backgroundColor: semanticColor.core.background.success.strong,
    borderColor: semanticColor.core.border.success.strong,
};
const knockoutForegroundStyle: StyleType = {
    color: semanticColor.core.foreground.knockout.default,
};

/**
 * A read-only status indicator showing whether a choice is correct (a green
 * check) or incorrect (a red minus), labelled with the choice letter (A, B,
 * C...). Status is changed via the adjacent segmented control, so this is no
 * longer interactive — it is a Wonder Blocks `StatusBadge`.
 */
export function RadioStatusPill({
    index,
    correct,
    multipleSelect,
}: RadioStatusPillProps) {
    return (
        <StatusBadge
            kind={correct ? "success" : "critical"}
            icon={
                <PhosphorIcon
                    size="small"
                    icon={correct ? checkIcon : minusCircleIcon}
                />
            }
            label={String.fromCharCode(65 + index)}
            styles={{
                // Round for single select, square for multiple select.
                root: [
                    boxStyle,
                    multipleSelect ? squareStyle : roundStyle,
                    correct && correctStrongStyle,
                ],
                label: correct ? knockoutForegroundStyle : undefined,
                icon: correct ? knockoutForegroundStyle : undefined,
            }}
        />
    );
}
