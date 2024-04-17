import React from "react";

import {Arrowhead} from "./graphs/components/arrowhead";
import useGraphConfig from "./reducer/use-graph-config";

export default function AxisArrows() {
    const {range: [[xMin, xMax], [yMin, yMax]]} = useGraphConfig();

    return (
        <>
            <Arrowhead x={xMax} y={0} angle={0} />
            <Arrowhead x={0} y={yMin} angle={90} />
            <Arrowhead x={xMin} y={0} angle={180} />
            <Arrowhead x={0} y={yMax} angle={270} />
        </>
    );
}
