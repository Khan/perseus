import {color} from "@khanacademy/wonder-blocks-tokens";
import {Plot} from "mafs";
import * as React from "react";

import {movePoint} from "../reducer/interactive-graph-action";

import {StyledMovablePoint} from "./components/movable-point";

import type {QuadraticGraphState, MafsGraphProps} from "../types";
import type {vec} from "mafs";

type QuadraticGraphProps = MafsGraphProps<QuadraticGraphState>;
type QuadraticCoefficient = [number, number, number];
export type QuadraticCoords = QuadraticGraphState["coords"];

export function QuadraticGraph(props: QuadraticGraphProps) {
    const {dispatch, graphState} = props;

    const {coords} = graphState;

    // The coefficients are used to calculate the quadratic equation, plot the graph, and to indicate
    // to content creators the currently selected "correct answer". ex: y = 0.200x^2 + 0.000x + 0.000
    // While we should technically never have invalid coordinates, we want to ensure that we have a fallback
    const coeffRef = React.useRef<QuadraticCoefficient>([0, 0, 0]);
    const coeffs = getQuadraticCoefficients(coords);
    if (coeffs !== undefined) {
        coeffRef.current = coeffs;
    }

    // Destructure the coefficients for calculating the quadratic equation
    const [a, b, c] = coeffRef.current;

    // Calculate the y value based on the current x value
    const y = (x) => (a * x + b) * x + c;

    return (
        <>
            <Plot.OfX y={y} color={color.blue} />
            {coords.map((coord, i) => (
                <StyledMovablePoint
                    key={"point-" + i}
                    point={coord}
                    onMove={(destination) =>
                        dispatch(movePoint(i, destination))
                    }
                />
            ))}
        </>
    );
}

// Get the quadratic coefficients from the 3 control points
// These equations were originally set up in 2013 and may require some
// additional comments to help clarify the quadratic formula manipulations
// Origin: https://phabricator.khanacademy.org/D2413
export const getQuadraticCoefficients = (
    coords: QuadraticCoords,
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
