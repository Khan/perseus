import React from "react";

import {Arrowhead} from "../graphs/components/arrowhead";
import {X, Y} from "../math";
import useGraphConfig from "../reducer/use-graph-config";

export default function AxisArrows() {
    const {
        range: [[xMin, xMax], [yMin, yMax]],
        boundedSides,
    } = useGraphConfig();

    const axisColor = "var(--mafs-fg)";

    // Only render the arrows if the axis is within the visible range
    // as otherwise the arrows will be rendered outside the graph
    return (
        <>
            {!(yMin > 0 || yMax < 0) && (
                <>
                    {!boundedSides?.[X][0] && (
                        <Arrowhead
                            color={axisColor}
                            tip={[xMin, 0]}
                            angle={180}
                        />
                    )}
                    {!boundedSides?.[X][1] && (
                        <Arrowhead
                            color={axisColor}
                            tip={[xMax, 0]}
                            angle={0}
                        />
                    )}
                </>
            )}
            {!(xMin > 0 || xMax < 0) && (
                <>
                    {!boundedSides?.[Y][0] && (
                        <Arrowhead
                            color={axisColor}
                            tip={[0, yMin]}
                            angle={90}
                        />
                    )}
                    {!boundedSides?.[Y][1] && (
                        <Arrowhead
                            color={axisColor}
                            tip={[0, yMax]}
                            angle={270}
                        />
                    )}
                </>
            )}
        </>
    );
}
