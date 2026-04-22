import * as React from "react";

import useGraphConfig from "../../reducer/use-graph-config";
import {calculateNestedSVGCoords} from "../../utils";

// A nested <svg> sized to the graph's visible bounds. Its default
// overflow:hidden clips the children to the graph range, which lets
// graph components allow edge placement (overflow:visible on the outer
// interactive layer) without curve/shape rendering sprawling past the
// graph boundary. React context from Mafs and the --mafs-view-transform
// CSS variable both survive the nested SVG, so Mafs primitives (like
// Plot.OfX) continue to render correctly inside it.
export function GraphBoundsSvg({children}: {children: React.ReactNode}) {
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
