import React, {createContext} from "react";

import type {InteractiveGraphAction} from "./interactive-graph-action";
import type {InteractiveGraphState} from "../types";

export const GraphStateContext = createContext<{
    state: InteractiveGraphState;
    dispatch: React.Dispatch<InteractiveGraphAction>;
}>({
    state: {} as any,
    dispatch: () => {},
});

export default function useGraphState() {
    const {state, dispatch} = React.useContext(GraphStateContext);

    return {state, dispatch};
}
