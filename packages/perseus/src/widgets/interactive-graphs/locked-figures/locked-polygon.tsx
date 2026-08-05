import {
    lockedFigureColors,
    lockedFigureFillStyles,
} from "@khanacademy/perseus-core";
import {semanticColor} from "@khanacademy/wonder-blocks-tokens";
import {Point, Polygon} from "mafs";
import * as React from "react";

import {X, Y} from "../math";

import {dashBackingColor, dashedStrokeStyle, strokeWeights} from "./utils";

import type {LockedPolygonType} from "@khanacademy/perseus-core";

const LockedPolygon = (props: LockedPolygonType) => {
    const {points, color, showVertices, fillStyle, strokeStyle, weight} = props;

    const hasAria = !!props.ariaLabel;

    return (
        <g
            className="locked-polygon"
            aria-label={hasAria ? props.ariaLabel : undefined}
            aria-hidden={!hasAria}
            role="img"
            // Weight-scaled dash pattern for dashed figures (see dashedStrokeStyle).
            style={dashedStrokeStyle(strokeStyle === "dashed", weight)}
        >
            {strokeStyle === "dashed" && (
                // Solid knockout backing under the dashes so they stay legible
                // over grid lines and shading behind the figure. Drawn first so
                // it sits underneath the dashed outline.
                <Polygon
                    points={[...points]}
                    fillOpacity={0}
                    strokeStyle="solid"
                    color={dashBackingColor}
                    weight={strokeWeights[weight]}
                />
            )}
            <Polygon
                points={[...points]}
                fillOpacity={lockedFigureFillStyles[fillStyle]}
                // mafs only understands "solid"/"dashed"; a "none" stroke is
                // rendered stroke-less via the svgPolygonProps override below.
                strokeStyle={strokeStyle === "none" ? "solid" : strokeStyle}
                color={lockedFigureColors[color]}
                weight={strokeWeights[weight]}
                // We need to override the svg props if we want to have a
                // different fill color than the stroke color (specifically,
                // in the case where the fillStyle is "white"), or no stroke at
                // all (strokeStyle "none").
                svgPolygonProps={{
                    style: {
                        fill:
                            fillStyle === "white"
                                ? semanticColor.core.background.base.default
                                : lockedFigureColors[color],
                        ...(strokeStyle === "none" && {stroke: "none"}),
                    },
                }}
            />
            {showVertices &&
                points.map((point, index) => (
                    <Point
                        key={`locked-polygon-point-${index}`}
                        x={point[X]}
                        y={point[Y]}
                        color={lockedFigureColors[color]}
                    />
                ))}
        </g>
    );
};

export default LockedPolygon;
