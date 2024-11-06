import {getUnsupportedPromptJSON} from "../unsupported-widget";

import type {PerseusGraphType} from "../../perseus-types";
import type interactiveGraph from "../../widgets/interactive-graph";
import type {UnsupportedWidgetPromptJSON} from "../unsupported-widget";
import type React from "react";

type Coord = [x: number, y: number];
type CollinearTuple = [Coord, Coord];

type BaseGraphOptions = {
    type: string;
};

type AngleGraphOptions = BaseGraphOptions & {
    angleOffsetDegrees: number;
    startCoords?: [Coord, Coord, Coord];
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
    startCoords?: CollinearTuple[];
};

type PointGraphOptions = BaseGraphOptions & {
    numPoints?: number | "unlimited";
    startCoords?: Coord[];
};

type PolygonGraphOptions = BaseGraphOptions & {
    match?: string;
    numSides?: number | "unlimited";
    startCoords?: Coord[];
};

type QuadraticGraphOptions = BaseGraphOptions & {
    startCoords?: [Coord, Coord, Coord];
};

type RayGraphOptions = BaseGraphOptions & {
    startCoords?: CollinearTuple;
};

type SegmentGraphOptions = BaseGraphOptions & {
    numSegments?: number;
    startCoords?: CollinearTuple;
};

type SinusoidGraphOptions = BaseGraphOptions & {
    startCoords?: Coord[];
};

type GraphOptions =
    | AngleGraphOptions
    | CircleGraphOptions
    | LinearGraphOptions
    | LinearSystemGraphOptions
    | PointGraphOptions
    | PolygonGraphOptions
    | QuadraticGraphOptions
    | RayGraphOptions
    | SegmentGraphOptions
    | SinusoidGraphOptions;

type AngleUserInput = {
    coords: [Coord, Coord, Coord];
    angleOffsetDegrees?: number;
};

type CircleUserInput = {
    center: Coord;
    radius: number;
};

type LinearUserInput = {
    coords: CollinearTuple;
};

type LinearSystemInput = {
    coords?: CollinearTuple[] | null;
};

type PointUserInput = {
    coords?: Coord[] | null;
};

type PolygonUserInput = {
    coords: Coord[] | null;
};

type QuadraticUserInput = {
    coords: [Coord, Coord, Coord] | null;
};

type RayUserInput = {
    coords: CollinearTuple | null;
};

type SegmentUserInput = {
    coords: CollinearTuple[] | null;
};

type SinusoidUserInput = {
    coords: Coord[] | null;
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
        graph: {
            type: string;
        };
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
    let input: UserInput;
    let graphOptions: GraphOptions;

    switch (props.graph.type) {
        case "angle":
            graphOptions = {
                type: props.graph.type,
                angleOffsetDegrees: props.graph.angleOffsetDeg,
                startCoords: props.graph.startCoords,
            } as AngleGraphOptions;
            break;
        case "circle":
            graphOptions = {
                type: props.graph.type,
                startParams: {
                    center: props.graph.startCoords?.center,
                    radius: props.graph.startCoords?.radius,
                },
            } as CircleGraphOptions;
            break;
        case "linear":
            graphOptions = {
                type: props.graph.type,
                startCoords: props.graph.startCoords,
            } as LinearGraphOptions;
            break;
        case "linear-system":
            graphOptions = {
                type: props.graph.type,
                startCoords: props.graph.startCoords,
            } as LinearSystemGraphOptions;
            break;
        case "point":
            graphOptions = {
                type: props.graph.type,
                numPoints: props.graph.numPoints,
                startCoords: props.graph.startCoords,
            } as PointGraphOptions;
            break;
        case "polygon":
            graphOptions = {
                type: props.graph.type,
                match: props.graph.match,
                numSides: props.graph.numSides,
                startCoords: props.graph.startCoords,
            } as PolygonGraphOptions;
            break;
        case "quadratic":
            graphOptions = {
                type: props.graph.type,
                startCoords: props.graph.startCoords,
            } as QuadraticGraphOptions;
            break;
        case "ray":
            graphOptions = {
                type: props.graph.type,
                startCoords: props.graph.startCoords,
            } as RayGraphOptions;
            break;
        case "segment":
            graphOptions = {
                type: props.graph.type,
                numSegments: props.graph.numSegments,
                startCoords: props.graph.startCoords,
            } as SegmentGraphOptions;
            break;
        case "sinusoid":
            graphOptions = {
                type: props.graph.type,
                startCoords: props.graph.startCoords,
            } as SinusoidGraphOptions;
            break;
        default:
            return getUnsupportedPromptJSON(
                "interactive-graph-unsupported",
                `The graph type ${props.graph.type} is not supported.`,
            );
    }

    switch (userInput.type) {
        case "angle":
            input = {
                coords: userInput.coords,
                angleOffsetDegrees: userInput.angleOffsetDeg,
            } as AngleUserInput;
            break;
        case "circle":
            input = {
                center: userInput.center,
                radius: userInput.radius,
            } as CircleUserInput;
            break;
        case "linear":
            input = {
                coords: userInput.coords,
            } as LinearUserInput;
            break;
        case "linear-system":
            input = {
                coords: userInput.coords,
            } as LinearSystemInput;
            break;
        case "point":
            input = {
                coords: userInput.coords,
            } as PointUserInput;
            break;
        case "polygon":
            input = {
                coords: userInput.coords,
            } as PolygonUserInput;
            break;
        case "quadratic":
            input = {
                coords: userInput.coords,
            } as QuadraticUserInput;
            break;
        case "ray":
            input = {
                coords: userInput.coords,
            } as RayUserInput;
            break;
        case "segment":
            input = {
                coords: userInput.coords,
            } as SegmentUserInput;
            break;
        case "sinusoid":
            input = {
                coords: userInput.coords,
            } as SinusoidUserInput;
            break;
        default:
            return getUnsupportedPromptJSON(
                "interactive-graph-unsupported",
                `The graph type ${props.graph.type} is not supported.`,
            );
    }

    return {
        type: "interactive-graph",
        options: {
            graph: graphOptions,
            backgroundImageUrl: props.backgroundImage?.url,
            range: props.range,
            labels: props.labels,
        },
        userInput: input,
    };
};
