import * as React from "react";

import {movePoint} from "../reducer/interactive-graph-action";
import useGraphConfig from "../reducer/use-graph-config";

import {Angle} from "./components/angle-indicators";
import {trimRange} from "./components/movable-line";
import {StyledMovablePoint} from "./components/movable-point";
import {SVGLine} from "./components/svg-line";
import {Vector} from "./components/vector";
import {useTransformVectorsToPixels} from "./use-transform";
import {getIntersectionOfRayWithBox} from "./utils";

import type {CollinearTuple} from "../../../perseus-types";
import type {AngleGraphState, MafsGraphProps} from "../types";
import type {vec} from "mafs";

type AngleGraphProps = MafsGraphProps<AngleGraphState>;

export function AngleGraph(props: AngleGraphProps) {
    const {dispatch, graphState} = props;
    const {graphDimensionsInPixels} = useGraphConfig();

    const {
        coords,
        showAngles,
        range,
        allowReflexAngles,
        angleOffsetDeg,
        snapDegrees,
    } = graphState;

    // Break the coords into the two end points and the center point
    const endPoints = [coords[0], coords[2]] satisfies [
        vec.Vector2,
        vec.Vector2,
    ];
    const centerPoint = coords[1];

    // Convert the vectors to pixels for rendering the svg lines
    const angleLines = [
        [centerPoint, endPoints[0]],
        [centerPoint, endPoints[1]],
    ] satisfies CollinearTuple[];

    const linePixelCoords = [
        useTransformVectorsToPixels(centerPoint, endPoints[0]),
        useTransformVectorsToPixels(centerPoint, endPoints[1]),
    ] as CollinearTuple[];

    // Create the SVG lines for the angle
    const svgLines = linePixelCoords.map(([startPtPx, endPtPx], i) => {
        const trimmedRange = trimRange(range, graphDimensionsInPixels);
        const endExtend = getIntersectionOfRayWithBox(
            angleLines[i][0],
            angleLines[i][1],
            trimmedRange,
        );

        return (
            <g key={`line-${i}`}>
                <SVGLine
                    start={startPtPx}
                    end={endPtPx}
                    style={{
                        stroke: "var(--movable-line-stroke-color)",
                        strokeWidth: "var(--movable-line-stroke-weight)",
                    }}
                />
                <Vector
                    tail={angleLines[i][1]}
                    tip={endExtend}
                    color={"var(--movable-line-stroke-color)"}
                />
            </g>
        );
    });

    // Create the angle indicator parameters
    const angleParams = {
        vertex: centerPoint,
        coords: endPoints,
        allowReflexAngles: allowReflexAngles || false, // Whether to allow reflex angles or not
        angleOffsetDeg: angleOffsetDeg || 0, // The angle offset from the x-axis
        snapDegrees: snapDegrees || 1, // The multiple of degrees to snap to
        range: range,
        showAngles: showAngles || false, // Whether to show the angle or not
    };

    // Render the lines, angle, and then movable points
    return (
        <>
            {svgLines}
            <Angle {...angleParams} />
            {coords.map((point, i) => (
                <StyledMovablePoint
                    key={"point-" + i}
                    snapTo={"angles"}
                    point={point}
                    onMove={(destination: vec.Vector2) =>
                        dispatch(movePoint(i, destination))
                    }
                />
            ))}
        </>
    );
}
