import {color as wbColor, spacing} from "@khanacademy/wonder-blocks-tokens";
import {Point, Line} from "mafs";
import * as React from "react";

import {lockedFigureColors} from "../../perseus-types";

import type {LockedLineType} from "../../perseus-types";

const LockedLine = (props: LockedLineType) => {
    const {color, lineStyle, kind, points, showStartPoint, showEndPoint} =
        props;
    const [point1, point2] = points;

    let line;

    if (kind === "line" || kind === "segment") {
        const LineType = kind === "segment" ? Line.Segment : Line.ThroughPoints;
        line = (
            <LineType
                point1={point1.coord}
                point2={point2.coord}
                color={lockedFigureColors[color]}
                style={lineStyle}
            />
        );
    } else {
        // TODO(LEMS-1928): Implement rays
        return null;
    }

    return (
        <g className="locked-line">
            {line}
            {showStartPoint && (
                <Point
                    x={point1.coord[0]}
                    y={point1.coord[1]}
                    svgCircleProps={{
                        style: {
                            fill: point1.filled
                                ? lockedFigureColors[point1.color]
                                : wbColor.white,
                            stroke: lockedFigureColors[point1.color],
                            strokeWidth: spacing.xxxxSmall_2,
                        },
                    }}
                />
            )}
            {showEndPoint && (
                <Point
                    x={point2.coord[0]}
                    y={point2.coord[1]}
                    svgCircleProps={{
                        style: {
                            fill: point2.filled
                                ? lockedFigureColors[point2.color]
                                : wbColor.white,
                            stroke: lockedFigureColors[point2.color],
                            strokeWidth: spacing.xxxxSmall_2,
                        },
                    }}
                />
            )}
        </g>
    );
};

export default LockedLine;
