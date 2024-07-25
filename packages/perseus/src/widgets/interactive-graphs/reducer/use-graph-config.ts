import React, {createContext} from "react";

import type {Interval, vec} from "mafs";

export type GraphConfig = {
    range: [Interval, Interval];
    tickStep: vec.Vector2;
    gridStep: vec.Vector2;
    snapStep: vec.Vector2;
    markings: "graph" | "grid" | "none";
    showTooltips: boolean;
    // TODO(benchristel): it seems like graphDimensionsInPixels duplicates
    // width and height. Can we remove one or the other?
    graphDimensionsInPixels: vec.Vector2;
    width: number; // pixels
    height: number; // pixels
    labels: readonly string[];
    hintMode?: boolean;
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
    hintMode: false,
};

export const GraphConfigContext =
    createContext<GraphConfig>(defaultGraphConfig);

export default function useGraphConfig(): GraphConfig {
    return React.useContext(GraphConfigContext);
}
