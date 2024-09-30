import {color as wbColor} from "@khanacademy/wonder-blocks-tokens";
import {Point, Polygon} from "mafs";
import * as React from "react";

import {
    lockedFigureColors,
    lockedFigureFillStyles,
} from "../../../perseus-types";
import {X, Y} from "../math";

import type {LockedPolygonType} from "../../../perseus-types";
import type {APIOptions} from "../../../types";

type Props = LockedPolygonType & {
    flags?: APIOptions["flags"];
};

const LockedPolygon = (props: Props) => {
    const {points, color, showVertices, fillStyle, strokeStyle} = props;

    const hasAria =
        props.ariaLabel && props.flags?.["mafs"]?.["locked-figures-aria"];

    return (
        <g
            className="locked-polygon"
            aria-label={hasAria ? props.ariaLabel : undefined}
            aria-hidden={!hasAria}
        >
            <Polygon
                points={[...points]}
                fillOpacity={lockedFigureFillStyles[fillStyle]}
                strokeStyle={strokeStyle}
                color={lockedFigureColors[color]}
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
