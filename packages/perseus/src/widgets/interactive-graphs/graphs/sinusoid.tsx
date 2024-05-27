import {color} from "@khanacademy/wonder-blocks-tokens";
import {Plot} from "mafs";
import * as React from "react";

import {movePoint} from "../reducer/interactive-graph-action";

import {StyledMovablePoint} from "./components/movable-point";

import type {Coord} from "../../../interactive2/types";
import type {SinusoidGraphState, MafsGraphProps} from "../types";
import type {vec} from "mafs";

type SinusoidGraphProps = MafsGraphProps<SinusoidGraphState>;

export type SineCoefficient = [
    number, // amplitude
    number, // angularFrequency
    number, // phase
    number, // verticalOffset
];

export function SinusoidGraph(props: SinusoidGraphProps) {
    const {dispatch, graphState} = props;

    // Destructure the coordinates from the graph state
    // Note: The order of the coordinates is important:
    // The coords[0] is the root and the coords[1] is the first peak
    const {coords} = graphState;

    // Destructure the coefficients for calculating the quadratic equation
    const [a, b, c, d] = getSinusoidCoefficients(coords);

    // Move a point to a new destination
    const handleOnMove = (destination: vec.Vector2, elementId: number) => {
        // If the destination is invalid, we do not want to move the point
        const validDestination = isValidDestination(
            destination,
            elementId,
            coords,
        );
        if (validDestination === false) {
            return;
        }
        dispatch(movePoint(elementId, destination));
    };

    return (
        <>
            <Plot.OfX
                y={(x) => computeSine(x, a, b, c, d)}
                color={color.blue}
            />
            {coords.map((coord, i) => (
                <StyledMovablePoint
                    key={"point-" + i}
                    point={coord}
                    onMove={(destination) => handleOnMove(destination, i)}
                />
            ))}
        </>
    );
}

// Ensure that we are only snapping to coordinates that result in a valid sine equation
export const isValidDestination = (
    destination: vec.Vector2,
    elementId: number,
    coords: ReadonlyArray<Coord>,
): boolean => {
    // Set up the new coords
    const newCoords: Coord[] = [...coords];
    newCoords[elementId] = destination;

    // Verify that the new coordinates are not on the same vertical line (infinity slope)
    if (newCoords[0][0] === newCoords[1][0]) {
        return false;
    }

    return true;
};

// Plot a sinusoid of the form: f(x) = a * sin(b * x - c) + d
export const computeSine = function (
    x: number, // x-coordinate
    a: number, // amplitude
    b: number, // angularFrequency
    c: number, // phase
    d: number, // verticalOffset
) {
    return a * Math.sin(b * x - c) + d;
};

export const getSinusoidCoefficients = (
    coords: ReadonlyArray<Coord>,
): SineCoefficient => {
    // It's assumed that p1 is the root and p2 is the first peak
    const p1 = coords[0];
    const p2 = coords[1];

    // Resulting coefficients are canonical for this sine curve
    const amplitude = p2[1] - p1[1];
    const angularFrequency = Math.PI / (2 * (p2[0] - p1[0]));
    const phase = p1[0] * angularFrequency;
    const verticalOffset = p1[1];

    return [amplitude, angularFrequency, phase, verticalOffset];
};
