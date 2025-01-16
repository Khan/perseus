import {coefficients} from "@khanacademy/kmath";
import {color} from "@khanacademy/wonder-blocks-tokens";
import {Plot} from "mafs";
import * as React from "react";

import {actions} from "../reducer/interactive-graph-action";

import {MovablePoint} from "./components/movable-point";

import type {
    QuadraticGraphState,
    MafsGraphProps,
    Dispatch,
    InteractiveGraphElementSuite,
} from "../types";
import type {QuadraticCoefficient} from "@khanacademy/kmath";

const {getQuadraticCoefficients} = coefficients;

export function renderQuadraticGraph(
    state: QuadraticGraphState,
    dispatch: Dispatch,
): InteractiveGraphElementSuite {
    return {
        graph: <QuadraticGraph graphState={state} dispatch={dispatch} />,
        interactiveElementsDescription: null,
    };
}

type QuadraticGraphProps = MafsGraphProps<QuadraticGraphState>;

function QuadraticGraph(props: QuadraticGraphProps) {
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
                <MovablePoint
                    key={"point-" + i}
                    point={coord}
                    sequenceNumber={i + 1}
                    onMove={(destination) =>
                        dispatch(actions.quadratic.movePoint(i, destination))
                    }
                />
            ))}
        </>
    );
}
