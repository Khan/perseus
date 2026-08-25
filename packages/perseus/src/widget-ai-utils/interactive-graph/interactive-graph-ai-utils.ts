import {UnreachableCaseError} from "@khanacademy/wonder-stuff-core";

import type interactiveGraph from "../../widgets/interactive-graphs/interactive-graph";
import type {UnsupportedWidgetPromptJSON} from "../unsupported-widget";
import type {PerseusGraphType} from "@khanacademy/perseus-core";
import type React from "react";

type Coord = [x: number, y: number];
type CollinearTuple = readonly [Coord, Coord];

interface AngleGraphOptions {
    type: "angle";
    angleOffsetDegrees?: number | null;
    startCoords?: readonly [Coord, Coord, Coord];
}

interface CircleGraphOptions {
    type: "circle";
    startParams: {
        center?: Coord;
        radius?: number;
    };
}

interface LinearGraphOptions {
    type: "linear";
    startCoords?: CollinearTuple;
}

interface LinearSystemGraphOptions {
    type: "linear-system";
    startCoords?: readonly CollinearTuple[];
}

interface PointGraphOptions {
    type: "point";
    numPoints?: number | "unlimited";
    startCoords?: readonly Coord[];
}

interface PolygonGraphOptions {
    type: "polygon";
    match?: string;
    numSides?: number | "unlimited";
    startCoords?: readonly Coord[];
}

interface QuadraticGraphOptions {
    type: "quadratic";
    startCoords?: readonly [Coord, Coord, Coord];
}

interface RayGraphOptions {
    type: "ray";
    startCoords?: CollinearTuple;
}

interface SegmentGraphOptions {
    type: "segment";
    numSegments?: number;
    startCoords?: CollinearTuple[];
}

interface SinusoidGraphOptions {
    type: "sinusoid";
    startCoords?: readonly Coord[];
}

interface AbsoluteValueGraphOptions {
    type: "absolute-value";
    startCoords?: readonly [Coord, Coord];
}

interface TangentGraphOptions {
    type: "tangent";
    startCoords?: readonly Coord[];
}

interface ExponentialGraphOptions {
    type: "exponential";
    startCoords?: {coords: readonly [Coord, Coord]; asymptote: number};
}

interface LogarithmGraphOptions {
    type: "logarithm";
    startCoords?: {coords: readonly [Coord, Coord]; asymptote: number};
}

interface VectorGraphOptions {
    type: "vector";
    startCoords?: CollinearTuple;
}

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
    | LogarithmGraphOptions
    | VectorGraphOptions;

interface AngleUserInput {
    coords?: readonly [Coord, Coord, Coord];
    angleOffsetDegrees?: number | null;
}

interface CircleUserInput {
    center?: Coord;
    radius?: number;
}

interface LinearUserInput {
    coords?: CollinearTuple;
}

interface LinearSystemInput {
    coords?: readonly CollinearTuple[] | null;
}

interface PointUserInput {
    coords?: readonly Coord[] | null;
}

interface PolygonUserInput {
    coords?: readonly Coord[] | null;
}

interface QuadraticUserInput {
    coords?: readonly [Coord, Coord, Coord] | null;
}

interface RayUserInput {
    coords?: CollinearTuple | null;
}

interface SegmentUserInput {
    coords?: readonly CollinearTuple[] | null;
}

interface SinusoidUserInput {
    coords?: readonly Coord[] | null;
}

interface AbsoluteValueUserInput {
    coords?: readonly [Coord, Coord] | null;
}

interface ExponentialUserInput {
    coords?: readonly Coord[] | null;
    asymptote?: number | null;
}

interface LogarithmUserInput {
    coords?: readonly Coord[] | null;
    asymptote?: number | null;
}

interface TangentUserInput {
    // TODO(LEMS-4033): change to a more self-explanatory format. These points
    //  are special (one is at the midline of the graph, the other determines
    //  the period and vertical scaling) but I am not sure of their exact
    //  mathematical significance.
    coords?: readonly Coord[] | null;
}

interface VectorUserInput {
    coords?: CollinearTuple | null;
}

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
    | LogarithmUserInput
    | VectorUserInput;

/**
 * JSON describing an interactive graph widget. Intended for consumption by AI tools.
 * An interactive graph plots equations and draws geometric figures on a
 * Cartesian plane. The user can move and reshape these elements by dragging
 * control points.
 */
export interface InteractiveGraphPromptJSON {
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
    };
    userInput: UserInput;
}

export const getPromptJSON = (
    props: React.ComponentProps<typeof interactiveGraph.widget>,
    userInput: PerseusGraphType,
): InteractiveGraphPromptJSON | UnsupportedWidgetPromptJSON => {
    return {
        type: "interactive-graph",
        options: {
            graph: getGraphOptionsForProps(props),
            backgroundImageUrl: props.options.backgroundImage?.url,
            range: props.options.range,
            labels: props.options.labels,
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
