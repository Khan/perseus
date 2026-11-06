import {lockedFigureFillStyles} from "@khanacademy/perseus-core";
import {semanticColor} from "@khanacademy/wonder-blocks-tokens";
import * as React from "react";

import {vectorsToPixels} from "../../interactive-graphs/graphs/use-transform";
import useGraphConfig from "../../interactive-graphs/reducer/use-graph-config";

import type {
    Coord,
    LockedFigureFillType,
    LockedFigureStrokeStyle,
} from "@khanacademy/perseus-core";

type Props = {
    /** The curve at parameter t, in graph units. */
    xy: (t: number) => Coord;
    /** The parameter range that traces the curve once, in degrees. */
    domain: [number, number];
    /** Falls back to the current SVG color when unset. */
    color?: string;
    strokeStyle?: LockedFigureStrokeStyle;
    /** Stroke width in pixels. */
    weight: number;
    fillStyle?: LockedFigureFillType;
};

// Enough that the tightest rose petal still looks smooth.
const SAMPLES_PER_DEGREE = 2;

/**
 * A closed curve drawn as one SVG path so it can be filled, with the same
 * fill styles as interactive graph's locked ellipse. Mafs draws parametric
 * curves as open paths, which is why this does not use Plot.Parametric.
 */
export function ClosedPolarCurve({
    xy,
    domain,
    color,
    strokeStyle = "solid",
    weight,
    fillStyle = "none",
}: Props) {
    const graphConfig = useGraphConfig();
    const [start, end] = domain;
    const count = Math.max(2, Math.round((end - start) * SAMPLES_PER_DEGREE));
    // Inside Mafs's SVG the pole already sits at (0, 0), so the points only
    // need scaling, not the top-left shift an HTML overlay would need.
    const samples = Array.from({length: count + 1}, (_, i) =>
        xy(start + ((end - start) * i) / count),
    );
    const d =
        vectorsToPixels(samples, graphConfig)
            .map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x} ${y}`)
            .join(" ") + " Z";
    return (
        <path
            d={d}
            style={{
                fill:
                    fillStyle === "white"
                        ? semanticColor.core.background.base.default
                        : color,
                fillOpacity: lockedFigureFillStyles[fillStyle],
                stroke: strokeStyle === "none" ? "none" : color,
                strokeWidth: weight,
                strokeLinejoin: "round",
                strokeDasharray:
                    strokeStyle === "dashed"
                        ? "var(--mafs-line-stroke-dash-style, 4, 3)"
                        : undefined,
            }}
            aria-hidden={true}
            data-testid="polar-graph__closed-curve"
        />
    );
}
