import React, {createContext} from "react";

import type {InteractiveGraphAction} from "./interactive-graph-action";
import type {InteractiveGraphState} from "../types";

export const GraphStateContext = createContext<{
    state: InteractiveGraphState;
    dispatch: React.Dispatch<InteractiveGraphAction>;
    graphOptions: {
        [key: string]: any;
    };
}>({
    state: {} as any,
    dispatch: () => {},
    graphOptions: {},
});

export default function useGraphState() {
    return React.useContext(GraphStateContext);
}
