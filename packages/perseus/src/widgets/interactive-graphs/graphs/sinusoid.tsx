import {color} from "@khanacademy/wonder-blocks-tokens";
import {Plot} from "mafs";
import * as React from "react";

import {X, Y} from "../math";
import {actions} from "../reducer/interactive-graph-action";

import {MovablePoint} from "./components/movable-point";

import type {Coord} from "../../../interactive2/types";
import type {SinusoidGraphState, MafsGraphProps} from "../types";

type SinusoidGraphProps = MafsGraphProps<SinusoidGraphState>;

export type SineCoefficient = {
    amplitude: number;
    angularFrequency: number;
    phase: number;
    verticalOffset: number;
};

export function SinusoidGraph(props: SinusoidGraphProps) {
    const {dispatch, graphState} = props;

    // Destructure the coordinates from the graph state
    // Note: The order of the coordinates is important:
    // The coords[0] is the root and the coords[1] is the first peak
    const {coords} = graphState;

    // The coefficients are used to calculate the sinusoid equation, plot the graph, and to indicate
    // to content creators the currently selected "correct answer" in the Content Editor.
    // While we should technically never have invalid coordinates, we want to ensure that
    // we have a fallback so that the graph can still be plotted without crashing.
    const coeffRef = React.useRef<SineCoefficient>({
        amplitude: 1,
        angularFrequency: 1,
        phase: 1,
        verticalOffset: 0,
    });
    const coeffs = getSinusoidCoefficients(coords);

    // If the coefficients are valid, update the reference
    if (coeffs !== undefined) {
        coeffRef.current = coeffs;
    }

    return (
        <>
            <Plot.OfX
                y={(x) => computeSine(x, coeffRef.current)}
                color={color.blue}
            />
            {coords.map((coord, i) => (
                <MovablePoint
                    key={"point-" + i}
                    point={coord}
                    onMove={(destination) =>
                        dispatch(actions.sinusoid.movePoint(i, destination))
                    }
                />
            ))}
        </>
    );
}

// Plot a sinusoid of the form: f(x) = a * sin(b * x - c) + d
export const computeSine = function (
    x: number, // x-coordinate
    sinusoidCoefficients: SineCoefficient,
) {
    // Break down the coefficients for the sine function to improve readability
    const {
        amplitude: a,
        angularFrequency: b,
        phase: c,
        verticalOffset: d,
    } = sinusoidCoefficients;

    return a * Math.sin(b * x - c) + d;
};

export const getSinusoidCoefficients = (
    coords: ReadonlyArray<Coord>,
): SineCoefficient | undefined => {
    // It's assumed that p1 is the root and p2 is the first peak
    const p1 = coords[0];
    const p2 = coords[1];

    // If the x-coordinates are the same, we are unable to calculate the coefficients
    if (p2[X] === p1[X]) {
        return;
    }

    // Resulting coefficients are canonical for this sine curve
    const amplitude = p2[Y] - p1[Y];
    const angularFrequency = Math.PI / (2 * (p2[X] - p1[X]));
    const phase = p1[X] * angularFrequency;
    const verticalOffset = p1[Y];

    return {amplitude, angularFrequency, phase, verticalOffset};
};
