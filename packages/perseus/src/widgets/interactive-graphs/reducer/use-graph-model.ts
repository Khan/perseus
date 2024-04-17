import React, {createContext} from "react";

import type {InteractiveGraphState} from "../types";

type GraphModel = {
    state: InteractiveGraphState;
};

const defaultGraphModel = {
    state: {} as any,
};

export const GraphModelContext = createContext<GraphModel>(defaultGraphModel);

export default function useGraphModel() {
    return React.useContext(GraphModelContext);
}
