import * as React from "react";

import {calculateNestedSVGCoords} from "../utils";

import type {GraphRange, MarkingsType} from "@khanacademy/perseus-core";

interface Props {
    range: GraphRange;
    width: number;
    height: number;
    markings: MarkingsType;
}

/**
 * Draws a 1px border at the exact graph bounds to match the design.
 *
 * A dedicated rect is needed because the old frame (the outermost grid line)
 * is clipped to the bounds, losing the outer half of its stroke (~0.5px). Kept
 * on top of the grid so the full stroke renders crisply.
 */
export const GraphBorder = ({range, width, height, markings}: Props) => {
    if (markings !== "graph" && markings !== "grid") {
        return null;
    }

    const {viewboxX, viewboxY} = calculateNestedSVGCoords(range, width, height);

    return (
        <rect
            className="mafs-graph-border"
            data-testid="graph-border"
            x={viewboxX}
            y={viewboxY}
            width={width}
            height={height}
        />
    );
};
