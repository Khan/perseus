import React from "react";

import {Arrowhead} from "./graphs/components/arrowhead";
import useGraphConfig from "./reducer/use-graph-config";

export default function AxisArrows() {
    const {
        range: [[xMin, xMax], [yMin, yMax]],
    } = useGraphConfig();

    const axisColor = "var(--mafs-fg)";

    return (
        <>
            <Arrowhead color={axisColor} x={xMax} y={0} angle={0} />
            <Arrowhead color={axisColor} x={0} y={yMin} angle={270} />
            <Arrowhead color={axisColor} x={xMin} y={0} angle={180} />
            <Arrowhead color={axisColor} x={0} y={yMax} angle={90} />
        </>
    );
}
