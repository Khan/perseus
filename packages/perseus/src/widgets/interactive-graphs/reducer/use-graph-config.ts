import React, {createContext} from "react";

import type {
    AxisLabelLocation,
    ShowAxisArrows,
    MarkingsType,
} from "@khanacademy/perseus-core";
import type {Interval, vec} from "mafs";

export type GraphConfig = {
    range: [Interval, Interval];
    tickStep: vec.Vector2;
    gridStep: vec.Vector2;
    snapStep: vec.Vector2;
    markings: MarkingsType;
    showTooltips: boolean;
    graphDimensionsInPixels: vec.Vector2;
    width: number; // in graph units
    height: number; // in graph units
    labels: readonly string[];
    labelLocation?: AxisLabelLocation;
    disableKeyboardInteraction?: boolean;
    interactiveColor?: string;
    showAxisArrows?: ShowAxisArrows;
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
    labelLocation: "onAxis",
    disableKeyboardInteraction: false,
    interactiveColor: "var(--mafs-blue)",
};

export const GraphConfigContext =
    createContext<GraphConfig>(defaultGraphConfig);

export default function useGraphConfig(): GraphConfig {
    return React.useContext(GraphConfigContext);
}
