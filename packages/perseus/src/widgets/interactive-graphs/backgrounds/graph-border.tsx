import * as React from "react";

import useGraphConfig from "../reducer/use-graph-config";
import {calculateNestedSVGCoords} from "../utils";

/**
 * Draws a 1px border at the exact graph bounds.
 *
 * Previously the frame was just the outermost grid line, which is clipped to
 * the bounds and so lost the outer half of its stroke (~0.5px). An explicit
 * rect gives a full 1px on all four sides regardless of range or `gridStep`.
 * Kept outside `<ClipToGraphBounds>` so its stroke isn't halved.
 */
export const GraphBorder = () => {
    const {range, graphDimensionsInPixels, markings} = useGraphConfig();
    const [width, height] = graphDimensionsInPixels;

    // Only frame where grid lines were shown; "axes" and "none" get no frame.
    if (markings !== "graph" && markings !== "grid") {
        return null;
    }

    const {viewboxX, viewboxY} = calculateNestedSVGCoords(range, width, height);

    return (
        <rect
            className="mafs-graph-border"
            x={viewboxX}
            y={viewboxY}
            width={width}
            height={height}
        />
    );
};
