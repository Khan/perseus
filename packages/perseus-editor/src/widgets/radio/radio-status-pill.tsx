import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import Pill from "@khanacademy/wonder-blocks-pill";
import {semanticColor, sizing, border} from "@khanacademy/wonder-blocks-tokens";
import checkIcon from "@phosphor-icons/core/bold/check-bold.svg";
import minusCircleIcon from "@phosphor-icons/core/bold/minus-circle-bold.svg";
import * as React from "react";

interface RadioStatusPillProps {
    index: number;
    correct?: boolean;
    multipleSelect: boolean;
    onClick: () => void;
}

export function RadioStatusPill({
    index,
    correct,
    multipleSelect,
    onClick,
}: RadioStatusPillProps) {
    return (
        <Pill
            size="large"
            // TODO(LEMS-3686): Update to use CSS modules when we can
            // use them with Wonder Blocks.
            style={{
                // Space between the pill and the text
                marginInlineEnd: sizing.size_080,
                color: correct
                    ? semanticColor.core.foreground.knockout.default
                    : semanticColor.core.foreground.critical.default,
                backgroundColor: correct
                    ? semanticColor.core.background.success.strong
                    : semanticColor.core.background.critical.subtle,
                // Round for single select, square for multiple select
                borderRadius: multipleSelect
                    ? border.radius.radius_040
                    : sizing.size_240,
                border: `1px solid ${correct ? semanticColor.core.border.success.strong : semanticColor.core.border.critical.default}`,
                width: sizing.size_560,
                flexDirection: "row",
            }}
            onClick={onClick}
        >
            <>
                <PhosphorIcon
                    size="small"
                    icon={correct ? checkIcon : minusCircleIcon}
                    style={{marginInlineEnd: sizing.size_060}}
                    color={
                        correct
                            ? semanticColor.core.foreground.knockout.default
                            : semanticColor.core.foreground.critical.default
                    }
                />
                {String.fromCharCode(65 + index)}
            </>
        </Pill>
    );
}
