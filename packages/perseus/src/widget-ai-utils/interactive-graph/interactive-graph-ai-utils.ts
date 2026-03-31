import {UnreachableCaseError} from "@khanacademy/wonder-stuff-core";

import type interactiveGraph from "../../widgets/interactive-graphs/interactive-graph";
import type {UnsupportedWidgetPromptJSON} from "../unsupported-widget";
import type {PerseusGraphType} from "@khanacademy/perseus-core";
import type React from "react";

// TODO(LEMS-4033): use more self-explanatory types, e.g.
//  `{x: number, y: number}`.
type Coord = [x: number, y: number];
// TODO(LEMS-4033): use more self-explanatory types, e.g.
//  `{point1: {x, y}, point2: {x, y}}`.
type CollinearTuple = readonly [Coord, Coord];

type AngleGraphOptions = {
    type: "angle";
    // TODO(LEMS-4033): angleOffsetDegrees should never be undefined.
    // Communicate the default value explicitly here.
    angleOffsetDegrees: number | undefined;
    startCoords?: readonly [Coord, Coord, Coord];
};

type CircleGraphOptions = {
    type: "circle";
    startParams: {
        center?: Coord;
        radius?: number;
    };
};

type LinearGraphOptions = {
    type: "linear";
    startCoords?: CollinearTuple;
};

type LinearSystemGraphOptions = {
    type: "linear-system";
    startCoords?: readonly CollinearTuple[];
};

type PointGraphOptions = {
    type: "point";
    numPoints?: number | "unlimited";
    startCoords?: readonly Coord[];
};

type PolygonGraphOptions = {
    type: "polygon";
    match?: string;
    numSides?: number | "unlimited";
    startCoords?: readonly Coord[];
};

type QuadraticGraphOptions = {
    type: "quadratic";
    startCoords?: readonly [Coord, Coord, Coord];
};

type RayGraphOptions = {
    type: "ray";
    startCoords?: CollinearTuple;
};

type SegmentGraphOptions = {
    type: "segment";
    numSegments?: number;
    startCoords?: CollinearTuple[];
};

type SinusoidGraphOptions = {
    type: "sinusoid";
    startCoords?: readonly Coord[];
};

type AbsoluteValueGraphOptions = {
    type: "absolute-value";
    startCoords?: readonly [Coord, Coord];
};

type TangentGraphOptions = {
    type: "tangent";
    startCoords?: readonly Coord[];
};

type ExponentialGraphOptions = {
    type: "exponential";
    startCoords?: {coords: readonly [Coord, Coord]; asymptote: number};
};

type LogarithmGraphOptions = {
    type: "logarithm";
    startCoords?: {coords: readonly [Coord, Coord]; asymptote: number};
};

type NoneGraphOptions = Record<string, never>;

type GraphOptions =
    | AbsoluteValueGraphOptions
    | AngleGraphOptions
    | CircleGraphOptions
    | ExponentialGraphOptions
    | LinearGraphOptions
    | LinearSystemGraphOptions
    | NoneGraphOptions
    | PointGraphOptions
    | PolygonGraphOptions
    | QuadraticGraphOptions
    | RayGraphOptions
    | SegmentGraphOptions
    | SinusoidGraphOptions
    | TangentGraphOptions
    | LogarithmGraphOptions;

type AngleUserInput = {
    coords?: readonly [Coord, Coord, Coord];
    angleOffsetDegrees?: number;
};

type CircleUserInput = {
    center?: Coord;
    radius?: number;
};

type LinearUserInput = {
    coords?: CollinearTuple;
};

type LinearSystemInput = {
    coords?: readonly CollinearTuple[] | null;
};

type PointUserInput = {
    coords?: readonly Coord[] | null;
};

type PolygonUserInput = {
    coords?: readonly Coord[] | null;
};

type QuadraticUserInput = {
    coords?: readonly [Coord, Coord, Coord] | null;
};

type RayUserInput = {
    coords?: CollinearTuple | null;
};

type SegmentUserInput = {
    coords?: readonly CollinearTuple[] | null;
};

type SinusoidUserInput = {
    coords?: readonly Coord[] | null;
};

type AbsoluteValueUserInput = {
    coords?: readonly [Coord, Coord] | null;
};

type ExponentialUserInput = {
    coords?: readonly Coord[] | null;
    asymptote?: number | null;
};

type LogarithmUserInput = {
    coords?: readonly Coord[] | null;
    asymptote?: number | null;
};

type TangentUserInput = {
    // TODO(LEMS-4033): change to a more self-explanatory format. These points
    //  are special (one is at the midline of the graph, the other determines
    //  the period and vertical scaling) but I am not sure of their exact
    //  mathematical significance.
    coords?: readonly Coord[] | null;
};

type UserInput =
    | AbsoluteValueUserInput
    | AngleUserInput
    | CircleUserInput
    | ExponentialUserInput
    | LinearUserInput
    | LinearSystemInput
    | PointUserInput
    | PolygonUserInput
    | QuadraticUserInput
    | RayUserInput
    | SegmentUserInput
    | SinusoidUserInput
    | TangentUserInput
    | LogarithmUserInput;

/**
 * JSON describing an interactive graph widget. Intended for consumption by AI tools.
 * An interactive graph plots equations and draws geometric figures on a
 * Cartesian plane. The user can move and reshape these elements by dragging
 * control points.
 */
export type InteractiveGraphPromptJSON = {
    type: "interactive-graph";

    /**
     * The configuration of the widget, set by the content creator.
     */
    options: {
        /**
         * Configuration of the plotted equation or geometric figure.
         */
        graph: GraphOptions;

        /**
         * The bounds of the graph. Format: `[[xMin, xMax], [yMin, yMax]]`
         */
        range: [x: [min: number, max: number], y: [min: number, max: number]];

        /**
         * Labels on the graph axes. Format: `[xLabel, yLabel]`.
         */
        labels: string[];

        backgroundImageUrl: string | null | undefined;

        // TODO(LEMS-4033): add locked figures to the prompt JSON
    };
    userInput: UserInput;
};

export const getPromptJSON = (
    props: React.ComponentProps<typeof interactiveGraph.widget>,
    userInput: PerseusGraphType,
): InteractiveGraphPromptJSON | UnsupportedWidgetPromptJSON => {
    return {
        type: "interactive-graph",
        options: {
            graph: getGraphOptionsForProps(props),
            backgroundImageUrl: props.backgroundImage?.url,
            range: props.range,
            labels: props.labels,
        },
        userInput: getUserInput(userInput),
    };
};

const getGraphOptionsForProps = (
    props: React.ComponentProps<typeof interactiveGraph.widget>,
): GraphOptions => {
    const type = props.userInput.type;

    switch (type) {
        case "angle":
            return {
                type: props.userInput.type,
                angleOffsetDegrees: props.userInput.angleOffsetDeg,
                startCoords: props.userInput.startCoords,
            };
        case "circle":
            return {
                type: props.userInput.type,
                startParams: {
                    center: props.userInput.startCoords?.center,
                    radius: props.userInput.startCoords?.radius,
                },
            };
        case "linear":
            return {
                type: props.userInput.type,
                startCoords: props.userInput.startCoords,
            };
        case "linear-system":
            return {
                type: props.userInput.type,
                startCoords: props.userInput.startCoords,
            };
        case "point":
            return {
                type: props.userInput.type,
                numPoints: props.userInput.numPoints,
                startCoords: props.userInput.startCoords,
            };
        case "polygon":
            return {
                type: props.userInput.type,
                match: props.userInput.match,
                numSides: props.userInput.numSides,
                startCoords: props.userInput.startCoords,
            };
        case "quadratic":
            return {
                type: props.userInput.type,
                startCoords: props.userInput.startCoords,
            };
        case "ray":
            return {
                type: props.userInput.type,
                startCoords: props.userInput.startCoords,
            };
        case "segment":
            return {
                type: props.userInput.type,
                numSegments: props.userInput.numSegments,
                startCoords: props.userInput.startCoords,
            };
        case "sinusoid":
            return {
                type: props.userInput.type,
                startCoords: props.userInput.startCoords,
            };
        case "tangent":
            return {
                type: props.userInput.type,
                startCoords: props.userInput.startCoords,
            };
        case "none":
            return {};
        case "absolute-value":
            return {
                type: props.userInput.type,
                startCoords: props.userInput.startCoords,
            };
        case "exponential":
            return {
                type: props.userInput.type,
                startCoords: props.userInput.startCoords,
            };
        case "logarithm":
            return {
                type: props.userInput.type,
                startCoords: props.userInput.startCoords,
            };
        case "vector":
            return {
                type: props.userInput.type,
                startCoords: props.userInput.startCoords,
            };
        default:
            throw new UnreachableCaseError(type);
    }
};

const getUserInput = (userInput: PerseusGraphType): UserInput => {
    const type = userInput.type;

    switch (type) {
        case "angle":
            return {
                coords: userInput.coords,
                angleOffsetDegrees: userInput.angleOffsetDeg,
            };
        case "circle":
            return {
                center: userInput.center,
                radius: userInput.radius,
            };
        case "linear":
            return {
                coords: userInput.coords,
            };
        case "linear-system":
            return {
                coords: userInput.coords,
            };
        case "point":
            return {
                coords: userInput.coords,
            };
        case "polygon":
            return {
                coords: userInput.coords,
            };
        case "quadratic":
            return {
                coords: userInput.coords,
            };
        case "ray":
            return {
                coords: userInput.coords,
            };
        case "segment":
            return {
                coords: userInput.coords,
            };
        case "sinusoid":
            return {
                coords: userInput.coords,
            };
        case "tangent":
            return {
                coords: userInput.coords,
            };
        case "none":
            return {};
        case "absolute-value":
            return {
                coords: userInput.coords,
            };
        case "exponential":
            return {
                coords: userInput.coords,
                asymptote: userInput.asymptote,
            };
        case "logarithm":
            return {
                coords: userInput.coords,
                asymptote: userInput.asymptote,
            };
        case "vector":
            return {
                coords: userInput.coords,
            };
        default:
            throw new UnreachableCaseError(type);
    }
};
