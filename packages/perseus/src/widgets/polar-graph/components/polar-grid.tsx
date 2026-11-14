import {PolarMath} from "@khanacademy/perseus-core";
import * as React from "react";

import {TextLabel} from "../../interactive-graphs/graphs/components/text-label";
import {
    dimensionsToPixels,
    vectorsToPixels,
} from "../../interactive-graphs/graphs/use-transform";
import useGraphConfig from "../../interactive-graphs/reducer/use-graph-config";

import type {PolarAngleUnit} from "@khanacademy/perseus-core";

type Props = {
    settings: PolarMath.PolarGridSettings;
    angleUnit: PolarAngleUnit;
};

// Angle labels sit this far beyond the outer circle, as a share of maxRadius.
const ANGLE_LABEL_OFFSET = 0.1;
// Radius labels are nudged this far below and right of the axis crossing.
const RADIUS_LABEL_OFFSET_PX = 4;
const RADIUS_LABEL_FONT_SIZE_PX = 14;

function stepsBetween(start: number, end: number, step: number): number[] {
    const values: number[] = [];
    for (let i = 0; start + i * step <= end + 1e-9; i++) {
        values.push(start + i * step);
    }
    return values;
}

/**
 * Concentric circles every `radiusStep`, spokes every `angleStepDegrees`,
 * the two axes, and labels. Mafs ships a polar grid, but its spokes are
 * fixed at 15 degrees, so this one is drawn by hand. Inside <Mafs>, SVG
 * (0, 0) is the graph origin and units are pixels.
 */
export function PolarGrid({settings, angleUnit}: Props) {
    const {maxRadius, radiusStep, angleStepDegrees} = settings;
    const graphConfig = useGraphConfig();

    const circleRadii = stepsBetween(radiusStep, maxRadius, radiusStep);
    const spokeAngles = stepsBetween(
        0,
        360 - angleStepDegrees,
        angleStepDegrees,
    );
    // Label every spoke when they are at least 30° apart. Closer spokes are
    // labeled only at multiples of the first step that reaches 30°, so 5°,
    // 10° and 15° grids are labeled every 30° and a 20° grid every 40°.
    const labelEvery = Math.ceil(30 / angleStepDegrees) * angleStepDegrees;

    const toPixels = (r: number, thetaDegrees: number) =>
        vectorsToPixels([PolarMath.fromPolar(r, thetaDegrees)], graphConfig)[0];
    const [maxRadiusPx] = dimensionsToPixels(
        [[maxRadius, maxRadius]],
        graphConfig,
    )[0];

    return (
        <g fill="none">
            <g stroke="var(--grid-line-subdivision-color)">
                {spokeAngles.map((theta) => {
                    const [x2, y2] = toPixels(maxRadius, theta);
                    return <line key={theta} x1={0} y1={0} x2={x2} y2={y2} />;
                })}
            </g>
            <g stroke="var(--mafs-line-color)">
                {circleRadii.map((r) => (
                    <circle
                        key={r}
                        cx={0}
                        cy={0}
                        r={dimensionsToPixels([[r, r]], graphConfig)[0][0]}
                    />
                ))}
            </g>
            <g
                stroke="var(--mafs-origin-color)"
                strokeWidth="var(--mafs-axis-stroke-width)"
            >
                <line x1={-maxRadiusPx} y1={0} x2={maxRadiusPx} y2={0} />
                <line x1={0} y1={-maxRadiusPx} x2={0} y2={maxRadiusPx} />
            </g>
            {/* Radius labels sit just below and right of where each circle
                crosses the polar axis, drawn the way Mafs draws its own axis
                labels: a halo stroke instead of a background box, so the
                axis line stays visible. */}
            <g className="mafs-shadow" fill="var(--mafs-fg)">
                {circleRadii.map((r) => (
                    <text
                        key={`r-${r}`}
                        x={toPixels(r, 0)[0] + RADIUS_LABEL_OFFSET_PX}
                        y={RADIUS_LABEL_OFFSET_PX}
                        fontSize={RADIUS_LABEL_FONT_SIZE_PX}
                        dominantBaseline="hanging"
                    >
                        {r}
                    </text>
                ))}
            </g>
            {spokeAngles
                .filter((theta) => theta % labelEvery === 0)
                .map((theta) => {
                    const [x, y] = PolarMath.fromPolar(
                        maxRadius * (1 + ANGLE_LABEL_OFFSET),
                        theta,
                    );
                    return (
                        <TextLabel key={`theta-${theta}`} x={x} y={y}>
                            {PolarMath.formatAngleLabel(theta, angleUnit)}
                        </TextLabel>
                    );
                })}
        </g>
    );
}
