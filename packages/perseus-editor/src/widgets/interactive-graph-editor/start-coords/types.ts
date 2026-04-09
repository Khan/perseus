import type {PerseusGraphType} from "@khanacademy/perseus-core";

type GraphTypesThatHaveStartCoords =
    | {type: "absolute-value"}
    | {type: "angle"}
    | {type: "circle"}
    | {type: "linear"}
    | {type: "linear-system"}
    | {type: "point"}
    | {type: "polygon"}
    | {type: "quadratic"}
    | {type: "ray"}
    | {type: "segment"}
    | {type: "sinusoid"}
    | {type: "exponential"}
    | {type: "logarithm"}
    | {type: "tangent"};

export type StartCoords = Extract<
    PerseusGraphType,
    GraphTypesThatHaveStartCoords
>["startCoords"];
