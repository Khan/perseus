import {color} from "@khanacademy/wonder-blocks-tokens";
import {Plot} from "mafs";
import * as React from "react";

import {usePerseusI18n} from "../../../components/i18n-context";
import a11y from "../../../util/a11y";
import {actions} from "../reducer/interactive-graph-action";

import {MovablePoint} from "./components/movable-point";
import {srFormatNumber} from "./screenreader-text";
import {
    getQuadraticPointString,
    getQuadraticVertexString,
    getQuadraticXIntercepts,
} from "./utils";

import type {I18nContextType} from "../../../components/i18n-context";
import type {Coord} from "../../../perseus-types";
import type {
    QuadraticGraphState,
    MafsGraphProps,
    Dispatch,
    InteractiveGraphElementSuite,
} from "../types";
import type {QuadraticCoefficient, QuadraticCoords} from "@khanacademy/kmath";

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

    const {strings, locale} = usePerseusI18n();
    const id = React.useId();
    const quadraticDirectionId = id + "-direction";
    const quadraticVertexId = id + "-vertex";
    const quadraticInterceptsId = id + "-intercepts";

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

    // Aria strings
    const {
        srQuadraticGraph,
        srQuadraticDirection,
        srQuadraticVertex,
        srQuadraticXIntercepts,
        srQuadraticYIntercept,
    } = describeQuadraticGraph(graphState, {strings, locale});

    return (
        <g
            // Outer graph minimal description
            aria-label={srQuadraticGraph}
            aria-describedby={`${quadraticDirectionId} ${quadraticVertexId} ${quadraticInterceptsId}`}
        >
            <Plot.OfX y={y} color={color.blue} />
            {coords.map((coord, i) => (
                <MovablePoint
                    key={"point-" + i}
                    ariaLabel={getQuadraticPointString(i + 1, coord, locale)}
                    point={coord}
                    sequenceNumber={i + 1}
                    onMove={(destination) =>
                        dispatch(actions.quadratic.movePoint(i, destination))
                    }
                />
            ))}
            {/* Hidden elements to provide the descriptions for the
                `aria-describedby` properties */}
            <g id={quadraticDirectionId} style={a11y.srOnly}>
                {srQuadraticDirection}
            </g>
            <g id={quadraticVertexId} style={a11y.srOnly}>
                {srQuadraticVertex}
            </g>
            <g id={quadraticInterceptsId} style={a11y.srOnly}>
                {srQuadraticXIntercepts
                    ? `${srQuadraticXIntercepts} ${srQuadraticYIntercept}`
                    : srQuadraticYIntercept}
            </g>
        </g>
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

// Exported for testing
export function describeQuadraticGraph(
    state: QuadraticGraphState,
    i18n: I18nContextType,
): Record<string, string | undefined> {
    const {strings, locale} = i18n;
    const coeffs = getQuadraticCoefficients(state.coords);
    const [a, b, c] = coeffs ?? [0, 0, 0];

    const vertex: Coord = [-b / (2 * a), c - (b * b) / (4 * a)];
    const xIntercepts = getQuadraticXIntercepts(a, b, c);

    // Aria label strings
    const srQuadraticGraph = "A parabola on a 4-quadrant coordinate plane.";
    const srQuadraticFaceUp = `The parabola opens upward.`;
    const srQuadraticFaceDown = `The parabola opens downward.`;
    const srQuadraticDirection =
        a === 0 ? undefined : a > 0 ? srQuadraticFaceUp : srQuadraticFaceDown;
    // Only describe vertex if the quadratic graph is not a line.
    const srQuadraticVertex =
        a !== 0 ? getQuadraticVertexString(vertex) : undefined;
    const srQuadraticXIntercepts =
        xIntercepts.length === 2
            ? `The X-intercepts are at ${srFormatNumber(xIntercepts[0], locale)} comma 0 and ${srFormatNumber(xIntercepts[1], locale)} comma 0.`
            : xIntercepts.length === 1
              ? `The X-intercept is at ${srFormatNumber(xIntercepts[0], locale)} comma 0.`
              : undefined;
    const srQuadraticYIntercept = `The Y-intercept is at 0 comma ${srFormatNumber(c, locale)}.`;

    return {
        srQuadraticGraph,
        srQuadraticDirection,
        srQuadraticVertex,
        srQuadraticXIntercepts,
        srQuadraticYIntercept,
    };
}
