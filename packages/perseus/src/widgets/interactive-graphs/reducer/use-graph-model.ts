import React, {createContext} from "react";

import {Interval, vec} from "mafs";

type GraphModel = {
    range: [Interval, Interval];
    snapStep: vec.Vector2;
    markings: "graph" | "grid" | "none";
};

const defaultGraphModel: GraphModel = {
    range: [[0, 1], [0, 1]],
    snapStep: [1, 1],
    markings: "none",
};

export const GraphModelContext = createContext<GraphModel>(defaultGraphModel);

export default function useGraphModel(): GraphModel {
    return React.useContext(GraphModelContext);
}
