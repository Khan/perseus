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
    // when the user is trying to move the points to a location that causes the quadratic equation to hit infinity.
    // The quadratic graph expects a list of 3 coordinates
    // [0] = start point
    // [1] = mid point
    // [2] = end point
    const coordsRef = React.useRef<ReadonlyArray<Coord>>([
        [0, 0],
        [0, 0],
        [0, 0],
    ]);

    // The coefficients are used to calculate the quadratic equation, plot the graph, and to indicate
    // to content creators the currently selected "correct answer". ex: y = 0.200x^2 + 0.000x + 0.000
    // This is being stored as a ref as we may need to use the prior value if the current value is invalid.
    const coeffRef = React.useRef<QuadraticCoefficient>([0, 0, 0]); // The previous (validated) coefficients
    const newCoeff = getQuadraticCoefficients(coords); // The new coefficients based on the current coords (which may be invalid)
    const validCoeff = newCoeff !== undefined;
    if (validCoeff) {
        // If the coefficients are valid, we want to update the refs accordingly
        coeffRef.current = newCoeff;
        coordsRef.current = coords;
    }

    // Destructure the coefficients for calculating the quadratic equation
    const [a, b, c] = coeffRef.current;

    // Calculate the y value based on the current x value
    const y = (x) => (a * x + b) * x + c;

    // Set the xy values for the Parametric plot
    const xy = (x: number) => [x, y(x)] as vec.Vector2;

    // Determine the range / domain of the graph
    const t: vec.Vector2 = [range[0][0], range[0][1]] as vec.Vector2;

    // Ensure that we are only snapping to coordinates that result in a valid quadratic equation
    const getValidDestination = (
        destination: vec.Vector2,
        elementId: number,
    ): vec.Vector2 => {
        // If the destination results in a valid quadratic, we simply want to return the destination
        if (validCoeff) {
            return destination;
        }

        // Otherwise, when the initial destination is invalid, find the next closest x-axis snap step
        const skipStep =
            destination[0] > coords[elementId][0] ? snapStep[0] : -snapStep[0];
        const newDestination = [
            destination[0] + skipStep,
            destination[1],
        ] as vec.Vector2;

        // Set up coords to reflect the new destination so that we can check if the new destination is valid
        const newCoords = [...coords];
        newCoords[elementId] = newDestination;
        const confirmValidDestination = getQuadraticCoefficients(newCoords);

        // If the new destination still results in an invalid quadratic equation,
        // we want to repeat the previous steps until we manage to get a valid destination
        if (confirmValidDestination === undefined) {
            getValidDestination(newDestination, elementId);
        }

        return newDestination;
    };

    const handleOnMove = (destination: vec.Vector2, elementId: number) => {
        // Ensure that the destination is valid before moving the point
        const validDestination = getValidDestination(destination, elementId);
        dispatch(movePoint(elementId, validDestination));
    };

    return (
        <>
            <Plot.Parametric xy={xy} t={t} color={color.blue} />
            {coordsRef.current.map((coord, i) => (
                <StyledMovablePoint
                    key={"point-" + i}
                    point={coord}
                    onMove={(destination) => handleOnMove(destination, i)}
                />
            ))}
        </>
    );
}

// Get the quadratic coefficients from the 3 control points
const getQuadraticCoefficients = (
    coords: ReadonlyArray<Coord>,
): QuadraticCoefficient | undefined => {
    const p1 = coords[0];
    const p2 = coords[1];
    const p3 = coords[2];

    // If the denominator is 0, we are going to return undefined as we are
    // unable to calculate the quadratic coefficients when they hit infinity
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
