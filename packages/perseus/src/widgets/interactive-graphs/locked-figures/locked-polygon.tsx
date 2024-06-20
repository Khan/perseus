import {Point, Polygon} from "mafs";
import * as React from "react";

import {
    lockedFigureColors,
    lockedFigureFillStyles,
} from "../../../perseus-types";

import type {LockedPolygonType} from "../../../perseus-types";

const LockedPolygon = (props: LockedPolygonType) => {
    const {points, color, showVertices, fillStyle, strokeStyle} = props;

    return (
        <g className="locked-polygon">
            <Polygon
                points={[...points]}
                fillOpacity={lockedFigureFillStyles[fillStyle]}
                strokeStyle={strokeStyle}
                color={lockedFigureColors[color]}
            />
            {showVertices &&
                points.map((point, index) => (
                    <Point
                        key={`locked-polygon-point-${index}`}
                        x={point[0]}
                        y={point[1]}
                        color={lockedFigureColors[color]}
                    />
                ))}
        </g>
    );
};

export default LockedPolygon;
