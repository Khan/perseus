import {color as wbColor, spacing} from "@khanacademy/wonder-blocks-tokens";
import {Point} from "mafs";
import * as React from "react";

import {lockedFigureColors, type LockedPointType} from "../../../perseus-types";

import type {APIOptions} from "../../../types";

type Props = LockedPointType & {
    flags?: APIOptions["flags"];
};

const LockedPoint = (props: Props) => {
    const {flags, color, coord, filled, ariaLabel} = props;
    const [x, y] = coord;

    const hasAria = ariaLabel && flags?.["mafs"]?.["locked-figures-aria"];

    return (
        <g
            className="locked-point"
            aria-label={hasAria ? ariaLabel : undefined}
            aria-hidden={!hasAria}
            style={{
                // Outline styles on focus.
                outlineOffset: spacing.xxxSmall_4,
                borderRadius: "50%",
            }}
        >
            <Point
                x={x}
                y={y}
                svgCircleProps={{
                    style: {
                        fill: filled
                            ? lockedFigureColors[color]
                            : wbColor.white,
                        stroke: lockedFigureColors[color],
                        strokeWidth: spacing.xxxxSmall_2,
                    },
                }}
            />
        </g>
    );
};

export default LockedPoint;
