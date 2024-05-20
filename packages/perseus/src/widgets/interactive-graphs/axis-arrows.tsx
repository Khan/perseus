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
            <Arrowhead color={axisColor} tip={[xMin, 0]} angle={180} />
            <Arrowhead color={axisColor} tip={[xMax, 0]} angle={0} />
            <Arrowhead color={axisColor} tip={[0, yMin]} angle={90} />
            <Arrowhead color={axisColor} tip={[0, yMax]} angle={270} />
        </>
    );
}
