import {color} from "@khanacademy/wonder-blocks-tokens";
import {Plot} from "mafs";
import * as React from "react";

import {movePoint} from "../reducer/interactive-graph-action";

import {StyledMovablePoint} from "./components/movable-point";

import type {QuadraticGraphState, MafsGraphProps} from "../types";
import type {Coord} from "@khanacademy/perseus";
import type {vec} from "mafs";

type QuadraticGraphProps = MafsGraphProps<QuadraticGraphState>;
type QuadraticCoefficient = [number, number, number];

export function QuadraticGraph(props: QuadraticGraphProps) {
    const {dispatch, graphState} = props;

    const {coords, range, snapStep} = graphState;

    // We are going to store the coordinates as a ref as we may need to use the prior value
    // if the current value is invalid. This ensures that the graphed points don't jump around
    // when the user is trying to move the points to a location that causes the graph to hit infinity.
    // The quadratic graph expects a list of 3 coordinates
    // [0] = start point
    // [1] = mid point
    // [2] = end point
    const coordsRef = React.useRef<ReadonlyArray<Coord>>([
        [0, 0],
        [0, 0],
        [0, 0],
    ]);

    // The coefficients are used to calculate the quadratic equation, plot the graph, and
    // to indicate to content creators the currently selected "correct answer". ex: y = 0.200x^2 + 0.000x + 0.000
    // This is being stored as a ref as we may need to use the prior value if the current value is invalid.
    const coeffRef = React.useRef<QuadraticCoefficient>([0, 0, 0]);
    const coeff = getQuadraticCoefficients(coords);
    const validCoeff = coeff !== undefined;
    if (validCoeff) {
        // If the coeff is not defined, it means we were hitting infinity
        // and are unable to calculate the quadratic coefficients
        coeffRef.current = coeff;
        coordsRef.current = coords;
    }

    // We are going to destructure the coefficients here
    const [a, b, c] = coeffRef.current;

    // Get the coordinates of the 3 points
    const [pointA, centerPoint, pointB] = coordsRef.current;

    // Calculate the y value based on the x value
    const y = (x) => (a * x + b) * x + c;

    // This is where we actually set the xy values for the plot
    const xy = (x: number) => [x, y(x)] as vec.Vector2;

    // This is the range/domain of the plot
    const t: vec.Vector2 = [range[0][0], range[0][1]] as vec.Vector2;

    // We want to ensure that we are only moving the point to a valid destination
    const handleOnMove = (destination: vec.Vector2, elementId: number) => {
        const validDestination = getValidDestination(destination, elementId);
        dispatch(movePoint(elementId, validDestination));
    };

    // This is the function that will snap the point to the nearest VALID grid line
    const getValidDestination = (
        destination: vec.Vector2,
        elementId: number,
    ): vec.Vector2 => {
        const skipStep =
            destination[0] > coords[elementId][0] ? snapStep[0] : -snapStep[0];
        const newDestination = validCoeff
            ? destination
            : ([destination[0] + skipStep, destination[1]] as vec.Vector2);

        const newCoords = [...coords];
        newCoords[elementId] = newDestination;

        if (!validCoeff) {
            const confirmValidDestination = getQuadraticCoefficients(newCoords);
            if (confirmValidDestination === undefined) {
                getValidDestination(newDestination, elementId);
            }
        }

        return newDestination;
    };

    return (
        <>
            <Plot.Parametric xy={xy} t={t} color={color.blue} />
            <StyledMovablePoint
                key={"pointA"}
                point={pointA}
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
        </>
    );
}

// Get the quadratic coefficients from the 3 points
const getQuadraticCoefficients = (
    coords: ReadonlyArray<Coord>,
): QuadraticCoefficient | undefined => {
    const p1 = coords[0];
    const p2 = coords[1];
    const p3 = coords[2];

    // If the denominator is 0, we are going to return undefined as we are
    // unable to calculate the quadratic coefficients as they hit infinity
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
