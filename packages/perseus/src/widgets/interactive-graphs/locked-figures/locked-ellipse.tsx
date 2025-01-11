import {
    lockedFigureFillStyles,
    lockedFigureColors,
    type LockedEllipseType,
} from "@khanacademy/perseus-core";
import {color as wbColor} from "@khanacademy/wonder-blocks-tokens";
import {Ellipse} from "mafs";
import * as React from "react";

const LockedEllipse = (props: LockedEllipseType) => {
    const {center, radius, angle, color, fillStyle, strokeStyle, ariaLabel} =
        props;

    const hasAria = !!ariaLabel;

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
