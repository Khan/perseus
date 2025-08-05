import React from "react";

import {Arrowhead} from "../graphs/components/arrowhead";
import useGraphConfig from "../reducer/use-graph-config";

import type {ShowAxisArrows} from "@khanacademy/perseus-core";

export default function AxisArrows() {
    const {
        range: [[xMin, xMax], [yMin, yMax]],
        showAxisArrows,
    } = useGraphConfig();

    const axisColor = "var(--mafs-fg)";

    // Arrow defaults to true if not specified.
    const arrows: ShowAxisArrows =
        showAxisArrows === undefined
            ? {
                  xMin: true,
                  xMax: true,
                  yMin: true,
                  yMax: true,
              }
            : showAxisArrows;

    // Only render the arrows if the axis is within the visible range
    // as otherwise the arrows will be rendered outside the graph
    return (
        <>
            {!(yMin > 0 || yMax < 0) && (
                <>
                    {arrows.xMin && (
                        <Arrowhead
                            color={axisColor}
                            tip={[xMin, 0]}
                            angle={180}
                        />
                    )}
                    {arrows.xMax && (
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
                    {arrows.yMin && (
                        <Arrowhead
                            color={axisColor}
                            tip={[0, yMin]}
                            angle={90}
                        />
                    )}
                    {arrows.yMax && (
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
