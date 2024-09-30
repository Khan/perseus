import {color as wbColor} from "@khanacademy/wonder-blocks-tokens";
import {Ellipse} from "mafs";
import * as React from "react";

import {
    lockedFigureFillStyles,
    lockedFigureColors,
    type LockedEllipseType,
} from "../../../perseus-types";

import type {APIOptions} from "../../../types";

type Props = LockedEllipseType & {
    flags?: APIOptions["flags"];
};

const LockedEllipse = (props: Props) => {
    const {
        center,
        radius,
        angle,
        color,
        fillStyle,
        strokeStyle,
        ariaLabel,
        flags,
    } = props;

    const hasAria = ariaLabel && flags?.["mafs"]?.["locked-figures-aria"];

    return (
        <g
            className="locked-ellipse"
            aria-label={hasAria ? ariaLabel : undefined}
            aria-hidden={!hasAria}
        >
            <Ellipse
                center={center}
                radius={radius}
                angle={angle}
                fillOpacity={lockedFigureFillStyles[fillStyle]}
                strokeStyle={strokeStyle}
                color={lockedFigureColors[color]}
                // We need to override the svg props if we want to have a
                // different fill color than the stroke color (specifically,
                // in the case where the fillStyle is "white").
                svgEllipseProps={{
                    style: {
                        fill:
                            fillStyle === "white"
                                ? wbColor.white
                                : lockedFigureColors[color],
                    },
                }}
            />
        </g>
    );
};

export default LockedEllipse;
