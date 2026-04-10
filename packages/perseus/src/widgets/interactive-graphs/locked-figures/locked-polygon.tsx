import {geometry} from "@khanacademy/kmath";
import {
    lockedFigureColors,
    lockedFigureFillStyles,
} from "@khanacademy/perseus-core";
import {semanticColor} from "@khanacademy/wonder-blocks-tokens";
import {Point, Polygon} from "mafs";
import * as React from "react";

import {PolygonAngle} from "../graphs/components/angle-indicators";
import {X, Y} from "../math";

import {strokeWeights} from "./utils";

import type {LockedPolygonType} from "@khanacademy/perseus-core";

const {clockwise} = geometry;

const LockedPolygon = (props: LockedPolygonType) => {
    const {
        points,
        color,
        showVertices,
        showAngles,
        fillStyle,
        strokeStyle,
        weight,
    } = props;

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
                                ? semanticColor.core.background.base.default
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
            {points.map((point, i) => {
                const pt1 = points.at(i - 1);
                const pt2 = points[(i + 1) % points.length];
                // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                if (!pt1 || !pt2) {
                    return null;
                }
                return (
                    <PolygonAngle
                        key={`locked-polygon-angle-${i}`}
                        centerPoint={point}
                        endPoints={[pt1, pt2]}
                        areEndPointsClockwise={clockwise(points)}
                        showAngles={showAngles}
                        snapTo="grid"
                    />
                );
            })}
        </g>
    );
};

export default LockedPolygon;
