import React from "react";

import {Arrowhead} from "./graphs/components/arrowhead";
import useGraphConfig from "./reducer/use-graph-config";

export default function AxisArrows() {
    const {
        range: [[xMin, xMax], [yMin, yMax]],
    } = useGraphConfig();

    return (
        <>
            <Arrowhead tip={[xMax, 0]} angle={0} />
            <Arrowhead tip={[0, yMin]} angle={90} />
            <Arrowhead tip={[xMin, 0]} angle={180} />
            <Arrowhead tip={[0, yMax]} angle={270} />
        </>
    );
}
