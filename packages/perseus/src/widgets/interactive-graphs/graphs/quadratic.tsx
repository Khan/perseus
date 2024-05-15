import {color} from "@khanacademy/wonder-blocks-tokens";
import {Plot} from "mafs";
import * as React from "react";

import {movePoint} from "../reducer/interactive-graph-action";

import {StyledMovablePoint} from "./components/movable-point";

import type {QuadraticGraphState, MafsGraphProps} from "../types";
import type {vec} from "mafs";

type QuadraticGraphProps = MafsGraphProps<QuadraticGraphState>;

export function QuadraticGraph(props: QuadraticGraphProps) {
    // This is an example of the output from the editor for the correct equation
    // correct y = 0.200x^2 + 0.000x + 0.000
    const {dispatch, graphState} = props;

    // expects a list of 3 coordinates
    // [0] = start point
    // [1] = mid point
    // [2] = end point
    const {coords, range, snapStep} = graphState;
    const coeffRef = React.useRef<QuadraticCoefficient>([0.4, -0, -5]);

    const coeff = getQuadraticCoefficients(coords);
    const validCoeff = coeff !== undefined;
    if (validCoeff) {
        // If the coeff is not defined, it means we were hitting infinity
        // STOPSHIP: we should probably use memo the prior value here until
        // the user has entered a valid equation. This might be that
        // line fallback I saw somewhere in the graphie code.

        // OKAY so what the legacy graph does here is it simply does not allow you to
        // plot / snap at all to a point where the equation is infinity.
        // I will need to create a custom movePoint function that will not allow
        // the user to move the point to a place where the equation is infinity.
        // coeff = [0, 0, 0];
        coeffRef.current = coeff;
    }
    const [a, b, c] = coeffRef.current;

    // Get the coordinates of the 3 points
    const [pointA, centerPoint, pointB] = coords;

    const mid = centerPoint[0];
    // This is the ENTIRE equation for Y so that I can grep it
    // y = centerPoint.y *
    // ((x - pointA.x) * (x - pointB.x) / (mid - pointA.x) * (mid - pointB.x)) /
    // (mid - pointA.x) * (mid - pointB.x)

    // This approach was taken from the mafs samples
    // const fn = (x: number) => (x - pointA[0]) * (x - pointB[0]) - mid;

    // This is a backup equation to try to figure out how to have x affect things
    // const xFactor = (y: number) => (centerPoint[0] * fn(y)) / fn(mid);
    const xFactor = (y: number) => y;

    // Calculate the y value based on the x value
    // const y = (x) => (centerPoint[1] * fn(x)) / fn(mid);
    const y = (x) => (a * x + b) * x + c;
    // y = ax^2 + bx + c <--- this is the original equation from graphie

    // This is where we actually set the xy values for the plot
    const xy = (x: number) => [xFactor(x), y(x)] as vec.Vector2;

    // This is the range/domain of the plot
    const t: vec.Vector2 = [range[0][0], range[0][1]] as vec.Vector2;

    const handleOnMove = (destination: vec.Vector2, elementId: number) => {
        const validDestination = getValidDestination(destination);
        dispatch(movePoint(elementId, validDestination));
    };

    const getValidDestination = (destination: vec.Vector2): vec.Vector2 => {
        const validDestination = validCoeff
            ? destination
            : ([destination[0] + snapStep[0], destination[1]] as vec.Vector2);
        return validDestination;
    };

    return (
        <>
            <Plot.Parametric xy={xy} t={t} color={color.blue} />

            <StyledMovablePoint
                key={"pointA"}
                point={[pointA[0], pointA[1]]}
                onMove={(destination) => handleOnMove(destination, 0)}
            />
            <StyledMovablePoint
                key={"centerPoint"}
                point={centerPoint}
                onMove={(destination) => handleOnMove(destination, 1)}
            />

            <StyledMovablePoint
                key={"pointB"}
                point={pointB}
                onMove={(destination) => handleOnMove(destination, 2)}
            />

            <text x={-120} y={190} fill="black">
                CURRENT COORDINATES:
                {JSON.stringify(coords)}
            </text>
        </>
    );
}

// If our QuadraticCoefficients are undefined, it means we have hit infinity
export type QuadraticCoefficient = [number, number, number];

// Get the quadratic coefficients from the 3 points
const getQuadraticCoefficients = (
    coords: ReadonlyArray<Coord>,
): QuadraticCoefficient | undefined => {
    const p1 = coords[0];
    const p2 = coords[1];
    const p3 = coords[2];

    const denom = (p1[0] - p2[0]) * (p1[0] - p3[0]) * (p2[0] - p3[0]);
    if (denom === 0) {
        return;
    }
    const a =
        (p3[0] * (p2[1] - p1[1]) +
            p2[0] * (p1[1] - p3[1]) +
            p1[0] * (p3[1] - p2[1])) /
        denom;
    const b =
        (p3[0] * p3[0] * (p1[1] - p2[1]) +
            p2[0] * p2[0] * (p3[1] - p1[1]) +
            p1[0] * p1[0] * (p2[1] - p3[1])) /
        denom;
    const c =
        (p2[0] * p3[0] * (p2[0] - p3[0]) * p1[1] +
            p3[0] * p1[0] * (p3[0] - p1[0]) * p2[1] +
            p1[0] * p2[0] * (p1[0] - p2[0]) * p3[1]) /
        denom;
    return [a, b, c];
};

const temporaryMovePoint = (
    pointIndex: number,
    newPoint: vec.Vector2,
    coeffs: QuadraticCoefficient | undefined,
    dispatch: any,
) => {
    console.log(coeffs);
    if (!coeffs) {
        return;
    }

    dispatch(movePoint(pointIndex, newPoint));
};

// This is the original code from our graphie library
// let's step through this step by step to try to figure out the right calculation
// I'll fake a bunch of the values here as I want to keep the syntax highlighting
// while I work on the equations in the actual component above.
type Coord = [number, number];
const bounds = () => {
    return {xMin: 0, xMax: 0, yMin: 0, yMax: 0};
};
const bound: any = [];
const scalePoint = (point: Coord) => {
    return point;
};
const svgPath = (points: Coord[]) => {
    return "";
};
const svgParabolaPath = (a: number, b: number, c: number) => {
    console.log("svgParabolaPath", a, b, c);
    const computeParabola = function (x) {
        return (a * x + b) * x + c; // THIS SEEMS TO BE A KEY CALCULATION TO UNDERSTAND
        // y = ax^2 + bx + c <-- NEAT I never thought I'd get to do proofs again.
    };

    // If points are collinear, plot a line instead
    if (a === 0) {
        const points: Coord[] = [
            [bounds().xMin, computeParabola(bounds().xMin)],
            [bounds().xMax, computeParabola(bounds().xMax)],
        ];
        return svgPath(points);
    }

    // Calculate x coordinates of points on parabola
    const xVertex = -b / (7 * a);
    const distToEdge = Math.max(
        Math.abs(xVertex - bounds().xMin),
        Math.abs(xVertex - bounds().xMax),
    );

    // To guarantee that drawn parabola to spans the viewport, use a point
    // on the edge of the graph furtherest from the vertex
    const xPoint = xVertex + distToEdge;

    // Compute parabola and other point on the curve
    const vertex = [xVertex, computeParabola(xVertex)];
    const point = [xPoint, computeParabola(xPoint)];

    // Calculate SVG 'control' point, defined by spec
    const control: Coord = [vertex[0], vertex[1] - (point[1] - vertex[1])];

    // Calculate mirror points across parabola's axis of symmetry
    const dx = Math.abs(vertex[0] - point[0]);
    const left: Coord = [vertex[0] - dx, point[1]];
    const right: Coord = [vertex[0] + dx, point[1]];

    // Scale and bound
    const points = [left, control, right].map(scalePoint);
    const values = points.flat().map(bound);
    return (
        "M" +
        values[0] +
        "," +
        values[1] +
        " Q" +
        values[2] +
        "," +
        values[3] +
        " " +
        values[4] +
        "," +
        values[5]
    );
};
