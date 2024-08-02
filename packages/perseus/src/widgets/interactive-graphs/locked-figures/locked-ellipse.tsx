import {Ellipse} from "mafs";
import * as React from "react";

import {
    lockedFigureFillStyles,
    lockedFigureColors,
    type LockedEllipseType,
} from "../../../perseus-types";

const LockedEllipse = (props: LockedEllipseType) => {
    const {center, radius, angle, color, fillStyle, strokeStyle} = props;

    return (
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
                            ? "white"
                            : lockedFigureColors[color],
                },
            }}
        />
    );
};

export default LockedEllipse;
