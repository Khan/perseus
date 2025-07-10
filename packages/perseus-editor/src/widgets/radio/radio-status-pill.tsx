import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import Pill from "@khanacademy/wonder-blocks-pill";
import {color, sizing, border} from "@khanacademy/wonder-blocks-tokens";
import checkIcon from "@phosphor-icons/core/bold/check-bold.svg";
import minusCircleIcon from "@phosphor-icons/core/bold/minus-circle-bold.svg";
import * as React from "react";

interface RadioStatusPillProps {
    index: number;
    correct?: boolean;
    multipleSelect: boolean;
}

export function RadioStatusPill({
    index,
    correct,
    multipleSelect,
}: RadioStatusPillProps) {
    return (
        <Pill
            size="large"
            // TODO: Update to use CSS modules when we can
            // use them with Wonder Blocks.
            style={{
                // Space between the pill and the text
                marginInlineEnd: sizing.size_080,
                color: correct ? color.white : color.red,
                backgroundColor: correct ? color.activeGreen : color.fadedRed8,
                // Round for single select, square for multiple select
                borderRadius: multipleSelect
                    ? border.radius.radius_040
                    : sizing.size_240,
                border: `1px solid ${correct ? color.activeGreen : color.red}`,
                width: sizing.size_560,
                flexDirection: "row",
            }}
        >
            <>
                <PhosphorIcon
                    size="small"
                    icon={correct ? checkIcon : minusCircleIcon}
                    style={{marginInlineEnd: sizing.size_060}}
                    color={correct ? color.white : color.red}
                />
                {String.fromCharCode(65 + index)}
            </>
        </Pill>
    );
}
