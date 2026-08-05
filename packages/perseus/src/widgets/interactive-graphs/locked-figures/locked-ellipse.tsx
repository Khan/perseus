import {
    lockedFigureFillStyles,
    lockedFigureColors,
    type LockedEllipseType,
} from "@khanacademy/perseus-core";
import {semanticColor} from "@khanacademy/wonder-blocks-tokens";
import {Ellipse} from "mafs";
import * as React from "react";

import {dashBackingColor, dashedStrokeStyle, strokeWeights} from "./utils";

const LockedEllipse = (props: LockedEllipseType) => {
    const {
        center,
        radius,
        angle,
        color,
        fillStyle,
        strokeStyle,
        weight,
        ariaLabel,
    } = props;

    const hasAria = !!ariaLabel;

    return (
        <g
            className="locked-ellipse"
            aria-label={hasAria ? ariaLabel : undefined}
            aria-hidden={!hasAria}
            role="img"
            // Weight-scaled dash pattern for dashed figures (see dashedStrokeStyle).
            style={dashedStrokeStyle(strokeStyle === "dashed", weight)}
        >
            {strokeStyle === "dashed" && (
                // Solid knockout backing under the dashes so they stay legible
                // over grid lines and shading behind the figure. Drawn first so
                // it sits underneath the dashed outline.
                <Ellipse
                    center={center}
                    radius={radius}
                    angle={angle}
                    fillOpacity={0}
                    strokeStyle="solid"
                    color={dashBackingColor}
                    weight={strokeWeights[weight]}
                />
            )}
            <Ellipse
                center={center}
                radius={radius}
                angle={angle}
                fillOpacity={lockedFigureFillStyles[fillStyle]}
                // mafs only understands "solid"/"dashed"; a "none" stroke is
                // rendered stroke-less via the svgEllipseProps override below.
                strokeStyle={strokeStyle === "none" ? "solid" : strokeStyle}
                color={lockedFigureColors[color]}
                weight={strokeWeights[weight]}
                // We need to override the svg props if we want to have a
                // different fill color than the stroke color (specifically,
                // in the case where the fillStyle is "white"), or no stroke at
                // all (strokeStyle "none").
                svgEllipseProps={{
                    style: {
                        fill:
                            fillStyle === "white"
                                ? semanticColor.core.background.base.default
                                : lockedFigureColors[color],
                        ...(strokeStyle === "none" && {stroke: "none"}),
                    },
                }}
            />
        </g>
    );
};

export default LockedEllipse;
