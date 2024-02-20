import {useMovablePoint, Line, Vector} from "mafs";
import * as React from "react";

import {Grid} from "./grid";
import {constrain, getLineCoords} from "./utils";

import type {PerseusGraphTypeRay} from "../../perseus-types";
import type {InteractiveGraphProps} from "../interactive-mafs";

type RayProps = Omit<InteractiveGraphProps, "graph"> & {
    graph: PerseusGraphTypeRay;
};

export const RayGraph = (props: RayProps) => {
    const [a, b] = getLineCoords(props.graph, props.range, props.step);

    const pointA = useMovablePoint(a, {
        constrain: (coord) => constrain(coord, props.snapStep, props.range),
    });
    const pointB = useMovablePoint(b, {
        constrain: (coord) => constrain(coord, props.snapStep, props.range),
    });

    const rayTip = getRayTip(pointA.point, pointB.point, props.range);

    return (
        <>
            <Grid {...props} />
            <Vector tail={pointB.point} tip={rayTip} />
            <Line.Segment point1={pointA.point} point2={pointB.point} />
            {pointA.element}
            {pointB.element}
        </>
    );
};

// there's probably a better way to figure this out, but I need to re-learn vector math
/**
 * Given two points, find the tip of the ray that extends through the points to the edge of the range.
 */
const getRayTip = (
    pointA: [number, number],
    pointB: [number, number],
    range: [[number, number], [number, number]],
): [number, number] => {
    // edges of the graph
    const [[xMin, xMax], [yMin, yMax]] = range;
    const [aX, aY] = pointA;
    const [bX, bY] = pointB;

    const yDiff = bY - aY;
    const xDiff = bX - aX;
    const slope = yDiff / xDiff;

    const yAtXMin = slope * (xMin - aX) + aY;
    const yAtXMax = slope * (xMax - aX) + aY;
    const xAtYMin = (yMin - aY) / slope + aX;
    const xAtYMax = (yMax - aY) / slope + aX;

    // clock analogy to help me reason out the quadrants
    switch (true) {
        // 12 o'clock to 2:59
        case yDiff > 0 && xDiff >= 0:
            return xAtYMax > xMax ? [xMax, yAtXMax] : [xAtYMax, yMax];
        // 3 o'clock to 5:59
        case yDiff <= 0 && xDiff > 0:
            // xAtYMin evaluates to -Infinity here
            return Math.abs(xAtYMin) > xMax ? [xMax, yAtXMax] : [xAtYMin, yMin];
        // 9 o'clock to 11:59
        case yDiff >= 0 && xDiff < 0:
            return xAtYMax < xMin ? [xMin, yAtXMin] : [xAtYMax, yMax];
        // 6 o'clock to 8:59
        case yDiff < 0 && xDiff <= 0:
            return xAtYMin < xMin ? [xMin, yAtXMin] : [xAtYMin, yMin];
        default:
            return [xMax, yAtXMax];
    }
};
