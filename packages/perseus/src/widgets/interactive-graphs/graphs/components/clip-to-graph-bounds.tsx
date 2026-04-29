import * as React from "react";

import useGraphConfig from "../../reducer/use-graph-config";
import {calculateNestedSVGCoords} from "../../utils";

// Clips its children to the graph's visible bounds via a nested <svg>
// sized to the graph range (default SVG overflow:hidden does the
// clipping). Wrap any rendering that could extend past the graph if
// left unclipped — continuous curves (Plot.OfX), shapes that can grow
// beyond their control points (the circle's ellipse), the protractor
// image, locked figures, etc. Don't wrap interactive handles that are
// expected to remain visible when sitting on the graph boundary.
//
// React context from Mafs and the --mafs-view-transform CSS variable
// both survive the nested SVG, so Mafs primitives continue to render
// correctly inside it.
export function ClipToGraphBounds({children}: {children: React.ReactNode}) {
    const {range, graphDimensionsInPixels} = useGraphConfig();
    const [pixelWidth, pixelHeight] = graphDimensionsInPixels;
    const {viewboxX, viewboxY} = calculateNestedSVGCoords(
        range,
        pixelWidth,
        pixelHeight,
    );
    return (
        <svg
            width={pixelWidth}
            height={pixelHeight}
            viewBox={`${viewboxX} ${viewboxY} ${pixelWidth} ${pixelHeight}`}
            preserveAspectRatio="xMidYMin"
            x={viewboxX}
            y={viewboxY}
        >
            {children}
        </svg>
    );
}
