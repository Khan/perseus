import React, {createContext} from "react";

import type {Interval, vec} from "mafs";

type GraphConfig = {
    range: [Interval, Interval];
    snapStep: vec.Vector2;
    markings: "graph" | "grid" | "none";
    width: number; // pixels
    height: number; // pixels
    labels: readonly string[];
};

const defaultGraphConfig: GraphConfig = {
    range: [
        [0, 1],
        [0, 1],
    ],
    snapStep: [1, 1],
    markings: "none",
    labels: [],
    width: 0,
    height: 0,
};

export const GraphConfigContext =
    createContext<GraphConfig>(defaultGraphConfig);

export default function useGraphConfig(): GraphConfig {
    return React.useContext(GraphConfigContext);
}
