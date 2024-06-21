import * as React from "react";

import {moveControlPoint, moveLine} from "../reducer/interactive-graph-action";

import {Angle} from "./components/angle-angle";
import {MovableLine} from "./components/movable-line";

import type {CollinearTuple} from "../../../perseus-types";
import type {AngleGraphState, MafsGraphProps} from "../types";
import type {Interval, vec} from "mafs";

type AngleGraphProps = MafsGraphProps<AngleGraphState>;
type AngleProps = {
    vertex: vec.Vector2;
    coords: [vec.Vector2, vec.Vector2];
    showAngles: boolean;
    allowReflexAngles: boolean;
    angleOffsetDeg: number;
    snapDegrees: number;
    range: [Interval, Interval];
};

export function AngleGraph(props: AngleGraphProps) {
    const {dispatch, graphState} = props;

    const {
        coords,
        showAngles,
        range,
        allowReflexAngles,
        angleOffsetDeg,
        snapDegrees,
    } = graphState;

    const handleOnMove = (
        elementId: number,
        itemIndex: number,
        destination: vec.Vector2,
    ) => {
        dispatch(moveControlPoint(elementId, destination, itemIndex));
    };

    console.log(coords);

    const centerPoint = coords[0];
    const endPoints = coords.slice(1, 3) as [vec.Vector2, vec.Vector2];

    const angleLines = [
        [centerPoint, endPoints[0]],
        [centerPoint, endPoints[1]],
    ] as CollinearTuple[];

    const angleParams: AngleProps = {
        vertex: centerPoint,
        coords: endPoints,
        allowReflexAngles: allowReflexAngles || false, // Whether to allow reflex angles or not
        angleOffsetDeg: angleOffsetDeg || 0, // The angle offset from the x-axis
        snapDegrees: snapDegrees || 1, // The multiple of degrees to snap to
        range: range,
        showAngles: showAngles || true, // Whether to show the angle or not
    };

    return (
        <>
            <Angle {...angleParams} />
            {angleLines.map((coord, i) => (
                <MovableLine
                    key={"line-" + (i + 1)}
                    points={coord}
                    snapTo="angles"
                    extend={{start: false, end: true}}
                    onMoveLine={(delta: vec.Vector2) => {
                        dispatch(moveLine(i + 1, delta));
                    }}
                    onMovePoint={(endpointIndex, destination) =>
                        handleOnMove(endpointIndex, i + 1, destination)
                    }
                />
            ))}
        </>
    );
}
