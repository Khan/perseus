import React from "react";

import {Arrowhead} from "./graphs/components/arrowhead";
import useGraphState from "./reducer/use-graph-state";

export default function AxisArrows() {
    const {state} = useGraphState();

    const range = state.range;
    const [xMin, xMax] = range[0];
    const [yMin, yMax] = range[1];

    return (
        <>
            <Arrowhead x={xMax} y={0} angle={0} />
            <Arrowhead x={0} y={yMin} angle={90} />
            <Arrowhead x={xMin} y={0} angle={180} />
            <Arrowhead x={0} y={yMax} angle={270} />
        </>
    );
}
