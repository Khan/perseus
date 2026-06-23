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
//
// `expand` grows the clip region outward (in pixels) on the given sides,
// while preserving the identity mapping between the nested SVG's coordinates
// and the parent's. Use it for content that sits exactly on the graph
// boundary and would otherwise have the outer half of its stroke clipped away
// (e.g. an axis line sitting on the edge). Only the side the stroke spills
// over is expanded, so the perpendicular ends of the content stay clipped to
// the graph bounds.
type Insets = {top?: number; right?: number; bottom?: number; left?: number};

export function ClipToGraphBounds({
    children,
    expand,
}: {
    children: React.ReactNode;
    expand?: Insets;
}) {
    const {range, graphDimensionsInPixels} = useGraphConfig();
    const [pixelWidth, pixelHeight] = graphDimensionsInPixels;
    const {viewboxX, viewboxY} = calculateNestedSVGCoords(
        range,
        pixelWidth,
        pixelHeight,
    );
    const {top = 0, right = 0, bottom = 0, left = 0} = expand ?? {};
    const x = viewboxX - left;
    const y = viewboxY - top;
    const clipWidth = pixelWidth + left + right;
    const clipHeight = pixelHeight + top + bottom;
    return (
        <svg
            width={clipWidth}
            height={clipHeight}
            viewBox={`${x} ${y} ${clipWidth} ${clipHeight}`}
            preserveAspectRatio="xMidYMin"
            x={x}
            y={y}
        >
            {children}
        </svg>
    );
}
