import {UnreachableCaseError} from "@khanacademy/wonder-stuff-core";

import type {PerseusGraphType} from "../../perseus-types";
import type interactiveGraph from "../../widgets/interactive-graph";
import type {UnsupportedWidgetPromptJSON} from "../unsupported-widget";
import type React from "react";

type Coord = [x: number, y: number];
type CollinearTuple = readonly [Coord, Coord];

type BaseGraphOptions = {
    type: string;
};

type AngleGraphOptions = BaseGraphOptions & {
    angleOffsetDegrees: number;
    startCoords?: readonly [Coord, Coord, Coord];
};

type CircleGraphOptions = BaseGraphOptions & {
    startParams: {
        center?: Coord;
        radius?: number;
    };
};

type LinearGraphOptions = BaseGraphOptions & {
    startCoords?: CollinearTuple;
};

type LinearSystemGraphOptions = BaseGraphOptions & {
    startCoords?: readonly CollinearTuple[];
};

type PointGraphOptions = BaseGraphOptions & {
    numPoints?: number | "unlimited";
    startCoords?: readonly Coord[];
};

type PolygonGraphOptions = BaseGraphOptions & {
    match?: string;
    numSides?: number | "unlimited";
    startCoords?: readonly Coord[];
};

type QuadraticGraphOptions = BaseGraphOptions & {
    startCoords?: readonly [Coord, Coord, Coord];
};

type RayGraphOptions = BaseGraphOptions & {
    startCoords?: CollinearTuple;
};

type SegmentGraphOptions = BaseGraphOptions & {
    numSegments?: number;
    startCoords?: CollinearTuple;
};

type SinusoidGraphOptions = BaseGraphOptions & {
    startCoords?: readonly Coord[];
};

type NoneGraphOptions = Record<string, never>;

type GraphOptions =
    | AngleGraphOptions
    | CircleGraphOptions
    | LinearGraphOptions
    | LinearSystemGraphOptions
    | NoneGraphOptions
    | PointGraphOptions
    | PolygonGraphOptions
    | QuadraticGraphOptions
    | RayGraphOptions
    | SegmentGraphOptions
    | SinusoidGraphOptions;

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

type UserInput =
    | AngleUserInput
    | CircleUserInput
    | LinearUserInput
    | LinearSystemInput
    | PointUserInput
    | PolygonUserInput
    | QuadraticUserInput
    | RayUserInput
    | SegmentUserInput
    | SinusoidUserInput;

export type InteractiveGraphPromptJSON = {
    type: "interactive-graph";
    options: {
        graph: GraphOptions;
        backgroundImageUrl: string | null | undefined;
        range: [min: number, max: number][];
        labels: ReadonlyArray<string>;
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
    const type = props.graph.type;

    switch (type) {
        case "angle":
            return {
                type: props.graph.type,
                angleOffsetDegrees: props.graph.angleOffsetDeg,
                startCoords: props.graph.startCoords,
            };
        case "circle":
            return {
                type: props.graph.type,
                startParams: {
                    center: props.graph.startCoords?.center,
                    radius: props.graph.startCoords?.radius,
                },
            };
        case "linear":
            return {
                type: props.graph.type,
                startCoords: props.graph.startCoords,
            };
        case "linear-system":
            return {
                type: props.graph.type,
                startCoords: props.graph.startCoords,
            };
        case "point":
            return {
                type: props.graph.type,
                numPoints: props.graph.numPoints,
                startCoords: props.graph.startCoords,
            };
        case "polygon":
            return {
                type: props.graph.type,
                match: props.graph.match,
                numSides: props.graph.numSides,
                startCoords: props.graph.startCoords,
            };
        case "quadratic":
            return {
                type: props.graph.type,
                startCoords: props.graph.startCoords,
            };
        case "ray":
            return {
                type: props.graph.type,
                startCoords: props.graph.startCoords,
            };
        case "segment":
            return {
                type: props.graph.type,
                numSegments: props.graph.numSegments,
                startCoords: props.graph.startCoords,
            };
        case "sinusoid":
            return {
                type: props.graph.type,
                startCoords: props.graph.startCoords,
            };
        case "none":
            return {};
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
        case "none":
            return {};
        default:
            throw new UnreachableCaseError(type);
    }
};
