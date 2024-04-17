import React, {createContext} from "react";

import type {Interval, vec} from "mafs";

type GraphConfig = {
    range: [Interval, Interval];
    snapStep: vec.Vector2;
    markings: "graph" | "grid" | "none";
};

const defaultGraphConfig: GraphConfig = {
    range: [
        [0, 1],
        [0, 1],
    ],
    snapStep: [1, 1],
    markings: "none",
};

export const GraphConfigContext =
    createContext<GraphConfig>(defaultGraphConfig);

export default function useGraphConfig(): GraphConfig {
    return React.useContext(GraphConfigContext);
}
