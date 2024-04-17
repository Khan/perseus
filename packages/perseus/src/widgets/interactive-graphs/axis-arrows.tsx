import React from "react";

import {Arrowhead} from "./graphs/components/arrowhead";
import useGraphModel from "./reducer/use-graph-model";

export default function AxisArrows() {
    const {range: [[xMin, xMax], [yMin, yMax]]} = useGraphModel();

    return (
        <>
            <Arrowhead x={xMax} y={0} angle={0} />
            <Arrowhead x={0} y={yMin} angle={90} />
            <Arrowhead x={xMin} y={0} angle={180} />
            <Arrowhead x={0} y={yMax} angle={270} />
        </>
    );
}
