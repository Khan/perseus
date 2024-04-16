import {useTransformContext, vec} from "mafs";
import React from "react";

import useGraphState from "./reducer/use-graph-state";
import {Arrowhead} from "./graphs/components/arrowhead";

export default function AxisArrows() {
    const {state} = useGraphState();

    const range = state.range;
    const [xMin, xMax] = range[0];
    const [yMin, yMax] = range[1];

    return (
        <>
            <Arrowhead x={xMax} y={0} rotate={0} />
            <Arrowhead x={0} y={yMin} rotate={90} />
            <Arrowhead x={xMin} y={0} rotate={180} />
            <Arrowhead x={0} y={yMax} rotate={270} />
        </>
    );
}
