import React, {createContext} from "react";

import type {InteractiveGraphAction} from "./interactive-graph-action";
import type {InteractiveGraphState} from "../types";

type GraphModel = {
    state: InteractiveGraphState;
    dispatch: React.Dispatch<InteractiveGraphAction>;
};

const defaultGraphModel = {
    state: {} as any,
    dispatch: () => {},
};

export const GraphModelContext = createContext<GraphModel>(defaultGraphModel);

export default function useGraphModel() {
    return React.useContext(GraphModelContext);
}
