import {
    lockedFigureColors,
    lockedFigureFillStyles,
} from "@khanacademy/perseus-core";
import {color as wbColor} from "@khanacademy/wonder-blocks-tokens";
import {Point, Polygon} from "mafs";
import * as React from "react";

import {X, Y} from "../math";

import {strokeWeights} from "./utils";

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
        >
            <Polygon
                points={[...points]}
                fillOpacity={lockedFigureFillStyles[fillStyle]}
                strokeStyle={strokeStyle}
                color={lockedFigureColors[color]}
                weight={strokeWeights[weight]}
                // We need to override the svg props if we want to have a
                // different fill color than the stroke color (specifically,
                // in the case where the fillStyle is "white").
                svgPolygonProps={{
                    style: {
                        fill:
                            fillStyle === "white"
                                ? wbColor.white
                                : lockedFigureColors[color],
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
