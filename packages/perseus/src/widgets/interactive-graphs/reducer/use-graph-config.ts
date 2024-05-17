import React, {createContext} from "react";

import type {Interval, vec} from "mafs";

export type GraphConfig = {
    range: [Interval, Interval];
    tickStep: vec.Vector2;
    gridStep: vec.Vector2;
    snapStep: vec.Vector2;
    markings: "graph" | "grid" | "none";
    showTooltips: boolean;
    graphDimensionsInPixels: vec.Vector2;
    width: number; // pixels
    height: number; // pixels
    labels: readonly string[];
};

const defaultGraphConfig: GraphConfig = {
    range: [
        [0, 1],
        [0, 1],
    ],
    tickStep: [1, 1],
    gridStep: [1, 1],
    snapStep: [1, 1],
    markings: "none",
    showTooltips: false,
    graphDimensionsInPixels: [1, 1],
    width: 0,
    height: 0,
    labels: [],
};

export const GraphConfigContext =
    createContext<GraphConfig>(defaultGraphConfig);

export default function useGraphConfig(): GraphConfig {
    return React.useContext(GraphConfigContext);
}
