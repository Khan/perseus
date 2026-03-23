import * as React from "react";

import useGraphConfig from "../../reducer/use-graph-config";

import type {vec} from "mafs";

// The handle is a rounded-rectangle pill. The major dimension is the long axis
// of the pill (22px active, 16px inactive) and the minor dimension is the
// short axis (12px active, 6px inactive). For horizontal orientation the major
// axis is width; for vertical it is height.
const ACTIVE_MAJOR = 22;
const ACTIVE_MINOR = 12;
const INACTIVE_MAJOR = 16;
const INACTIVE_MINOR = 6;

// Spacing constants shared between orientations
const RING_PAD = 2;
const HALO_PAD = 3;
const FOCUS_RING_PAD = 2;

// Grip dot offsets: 3 dots along the major axis, 2 along the minor axis
const GRIP_DOT_MAJOR_OFFSETS = [-3, 0, 3];
const GRIP_DOT_MINOR_OFFSETS = [-2, 2];

type Props = {
    /** Pixel-space center of the handle (already transformed from graph coordinates). */
    center: vec.Vector2;
    active: boolean;
    focused: boolean;
    /**
     * "horizontal" — wide pill with a 3×2 grip dot grid (exponential asymptote)
     * "vertical"   — tall pill with a 2×3 grip dot grid (logarithm asymptote)
     */
    orientation: "horizontal" | "vertical";
};

export function AsymptoteDragHandle(props: Props) {
    const {center, active, focused, orientation} = props;
    const [x, y] = center;
    const {interactiveColor} = useGraphConfig();
    const isHorizontal = orientation === "horizontal";

    const majorSize = active ? ACTIVE_MAJOR : INACTIVE_MAJOR;
    const minorSize = active ? ACTIVE_MINOR : INACTIVE_MINOR;

    const centerW = isHorizontal ? majorSize : minorSize;
    const centerH = isHorizontal ? minorSize : majorSize;

    const haloW = centerW + (RING_PAD + HALO_PAD) * 2;
    const haloH = centerH + (RING_PAD + HALO_PAD) * 2;
    const ringW = centerW + RING_PAD * 2;
    const ringH = centerH + RING_PAD * 2;
    const focusRingW = haloW + FOCUS_RING_PAD * 2;
    const focusRingH = haloH + FOCUS_RING_PAD * 2;

    // Pill border radius is half the minor dimension so it forms a true pill
    const pillRadius = (isHorizontal ? centerH : centerW) / 2;
    const haloRadius = (isHorizontal ? haloH : haloW) / 2;
    const ringRadius = (isHorizontal ? ringH : ringW) / 2;
    const focusRingRadius = (isHorizontal ? focusRingH : focusRingW) / 2;

    // Grip dots: 3 along major axis × 2 along minor axis
    const dotXOffsets = isHorizontal
        ? GRIP_DOT_MAJOR_OFFSETS
        : GRIP_DOT_MINOR_OFFSETS;
    const dotYOffsets = isHorizontal
        ? GRIP_DOT_MINOR_OFFSETS
        : GRIP_DOT_MAJOR_OFFSETS;

    return (
        <g aria-hidden={true} style={{pointerEvents: "none"}}>
            {focused && (
                <rect
                    className="movable-asymptote-handle-focus-ring"
                    data-testid="asymptote-handle-focus-ring"
                    x={x - focusRingW / 2}
                    y={y - focusRingH / 2}
                    width={focusRingW}
                    height={focusRingH}
                    rx={focusRingRadius}
                    ry={focusRingRadius}
                    stroke={interactiveColor}
                />
            )}
            {/* Halo */}
            <rect
                className="movable-asymptote-handle-halo"
                x={x - haloW / 2}
                y={y - haloH / 2}
                width={haloW}
                height={haloH}
                rx={haloRadius}
                ry={haloRadius}
                fill={interactiveColor}
            />
            {/* Ring — white background */}
            <rect
                className="movable-asymptote-handle-ring"
                x={x - ringW / 2}
                y={y - ringH / 2}
                width={ringW}
                height={ringH}
                rx={ringRadius}
                ry={ringRadius}
            />
            {/* Center — filled with interactive color */}
            <rect
                className="movable-asymptote-handle"
                data-testid="asymptote-handle-pill"
                x={x - centerW / 2}
                y={y - centerH / 2}
                width={centerW}
                height={centerH}
                rx={pillRadius}
                ry={pillRadius}
                fill={interactiveColor}
            />
            {/* Grip dots: 3 along major axis × 2 along minor axis */}
            {active &&
                dotYOffsets.map((dy) =>
                    dotXOffsets.map((dx) => (
                        <circle
                            className="movable-asymptote-handle-dot"
                            data-testid="asymptote-handle-dot"
                            key={`${dx},${dy}`}
                            cx={x + dx}
                            cy={y + dy}
                        />
                    )),
                )}
        </g>
    );
}
