import React, {createContext} from "react";

import type {InteractiveGraphAction} from "./interactive-graph-action";
import type {InteractiveGraphState} from "../types";

type GraphContext = {
    state: InteractiveGraphState;
    dispatch: React.Dispatch<InteractiveGraphAction>;
    width: number; // pixels
    height: number; // pixels
    labels: readonly string[];
};

export const GraphStateContext = createContext<GraphContext>({
    state: {} as any,
    dispatch: () => {},
    labels: [],
    width: 0,
    height: 0,
});

export default function useGraphState() {
    return React.useContext(GraphStateContext);
}
