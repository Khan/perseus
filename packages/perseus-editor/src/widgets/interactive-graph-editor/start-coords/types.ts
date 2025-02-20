import type {PerseusGraphType} from "@khanacademy/perseus-core";

type GraphTypesThatHaveStartCoords =
    | {type: "angle"}
    | {type: "circle"}
    | {type: "linear"}
    | {type: "linear-system"}
    | {type: "point"}
    | {type: "polygon"}
    | {type: "quadratic"}
    | {type: "ray"}
    | {type: "segment"}
    | {type: "sinusoid"};

export type StartCoords = Extract<
    PerseusGraphType,
    GraphTypesThatHaveStartCoords
>["startCoords"];
