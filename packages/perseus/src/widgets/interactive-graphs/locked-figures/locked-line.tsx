import {color as wbColor, spacing} from "@khanacademy/wonder-blocks-tokens";
import {Point, Line, vec} from "mafs";
import * as React from "react";

import {lockedFigureColors} from "../../../perseus-types";
import {Arrowhead} from "../graphs/components/arrowhead";
import {Vector} from "../graphs/components/vector";
import {useTransformVectorsToPixels} from "../graphs/use-transform";
import {
    calculateAngleInDegrees,
    getIntersectionOfRayWithBox,
} from "../graphs/utils";
import {X, Y} from "../math";

import type {LockedLineType} from "../../../perseus-types";
import type {Interval} from "mafs";

type Props = LockedLineType & {
    range: [Interval, Interval];
};

const LockedLine = (props: Props) => {
    const {color, lineStyle, kind, points, showPoint1, showPoint2, range} =
        props;
    const [point1, point2] = points;

    let line;

    if (kind === "ray") {
        // Rays extend to the end of the graph in one direction.
        const extendedPoint = getIntersectionOfRayWithBox(
            point1.coord,
            point2.coord,
            range,
        );
        line = (
            <Vector
                tail={point1.coord}
                tip={extendedPoint}
                color={lockedFigureColors[color]}
                style={{
                    strokeDasharray:
                        lineStyle === "dashed"
                            ? "var(--mafs-line-stroke-dash-style)"
                            : undefined,
                }}
            />
        );
    } else {
        const LineType = kind === "segment" ? Line.Segment : Line.ThroughPoints;

        let arrowTip =
            kind === "segment"
                ? point2.coord
                : getIntersectionOfRayWithBox(
                      point1.coord,
                      point2.coord,
                      range,
                  );
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [tailPx, tipPx] = useTransformVectorsToPixels(
            point2.coord,
            point1.coord,
        );
        const direction = vec.sub(tailPx, tipPx);
        let angle = calculateAngleInDegrees(direction);
        const startArrowHead = kind !== "segment" && (
            <Arrowhead
                angle={angle}
                tip={arrowTip}
                color={lockedFigureColors[color]}
            />
        );

        arrowTip =
            kind === "segment"
                ? point1.coord
                : getIntersectionOfRayWithBox(
                      point2.coord,
                      point1.coord,
                      range,
                  );
        angle = angle > 180 ? angle - 180 : angle + 180;
        const endArrowHead = kind !== "segment" && (
            <Arrowhead
                angle={angle}
                tip={arrowTip}
                color={lockedFigureColors[color]}
            />
        );

        line = (
            <>
                {startArrowHead}
                <LineType
                    point1={point1.coord}
                    point2={point2.coord}
                    color={lockedFigureColors[color]}
                    style={lineStyle}
                />
                {endArrowHead}
            </>
        );
    }

    return (
        <g className={kind === "ray" ? "locked-ray" : "locked-line"}>
            {line}
            {showPoint1 && (
                <Point
                    x={point1.coord[X]}
                    y={point1.coord[Y]}
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
            {showPoint2 && (
                <Point
                    x={point2.coord[X]}
                    y={point2.coord[Y]}
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
