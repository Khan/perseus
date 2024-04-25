import {color as wbColor, spacing} from "@khanacademy/wonder-blocks-tokens";
import {Point, Line} from "mafs";
import * as React from "react";

import {lockedFigureColors} from "../../perseus-types";

import {Arrowhead} from "./graphs/components/arrowhead";
import {Vector} from "./graphs/components/vector";
import {getArrowheadValues} from "./graphs/utils";

import type {LockedLineType} from "../../perseus-types";
import type {Interval} from "mafs";

type Props = LockedLineType & {
    range: [Interval, Interval];
};

const LockedLine = (props: Props) => {
    const {
        color,
        lineStyle,
        kind,
        points,
        showArrows,
        showStartPoint,
        showEndPoint,
        range,
    } = props;
    const [point1, point2] = points;

    let arrowHeadValues = getArrowheadValues(point1.coord, point2.coord, range);
    const startArrowHead = showArrows && <Arrowhead {...arrowHeadValues} />;

    let line;

    if (kind === "ray") {
        line = (
            <>
                {showArrows && startArrowHead}
                <Vector
                    tail={point1.coord}
                    tip={[arrowHeadValues.x, arrowHeadValues.y]}
                    color={lockedFigureColors[color]}
                    style={{
                        strokeDasharray:
                            lineStyle === "dashed"
                                ? // TODO(lems-1930): Uncomment this line when the
                                  // dashed style is updated in Mafs.
                                  // ? "var(--mafs-line-stroke-dash-style)"
                                "4, 3"
                                : undefined,
                    }}
                />
            </>
        );
    } else {
        const LineType = kind === "segment" ? Line.Segment : Line.ThroughPoints;

        arrowHeadValues = getArrowheadValues(point2.coord, point1.coord, range);
        const endArrowHead = showArrows && <Arrowhead {...arrowHeadValues} />;

        line = (
            <>
                {showArrows && startArrowHead}
                <LineType
                    point1={point1.coord}
                    point2={point2.coord}
                    color={lockedFigureColors[color]}
                    style={lineStyle}
                />
                {showArrows && endArrowHead}
            </>
        );
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
