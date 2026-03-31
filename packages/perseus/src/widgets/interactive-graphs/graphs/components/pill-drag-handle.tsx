import * as React from "react";

import useGraphConfig from "../../reducer/use-graph-config";

import type {vec} from "mafs";

// The handle is a rounded-rectangle pill. The major dimension is the long axis
// of the pill (22px active, 16px inactive) and the minor dimension is the
// short axis (12px active, 6px inactive).
const ACTIVE_MAJOR = 22;
const ACTIVE_MINOR = 12;
const INACTIVE_MAJOR = 16;
const INACTIVE_MINOR = 6;

// Spacing constants
const RING_PAD = 2;
const HALO_PAD = 3;
const FOCUS_RING_PAD = 2;

// Grip dot offsets: 3 dots along the major axis, 2 along the minor axis
const GRIP_DOT_MAJOR_OFFSETS = [-3, 0, 3];
const GRIP_DOT_MINOR_OFFSETS = [-2, 2];

type Props = {
    /** Pixel-space center of the handle (already transformed from graph coordinates). */
    center: vec.Vector2;
    /** Whether the handle is in active state (shows grip dots, uses larger dimensions). */
    active: boolean;
    /** Whether the handle has keyboard focus (shows focus ring). */
    focused: boolean;
    /**
     * Rotation angle in degrees. 0 = horizontal pill, 90 = vertical pill.
     * Arbitrary angles are supported (e.g. for vector alignment).
     * @default 0
     */
    rotation?: number;
};

/**
 * Shared pill-shaped drag handle used by vector and asymptote graph elements.
 * Renders a rounded-rectangle pill with a halo, ring, focus ring, and grip dots.
 */
export function PillDragHandle(props: Props) {
    const {center, active, focused, rotation = 0} = props;
    const [cx, cy] = center;
    const {interactiveColor} = useGraphConfig();

    const majorSize = active ? ACTIVE_MAJOR : INACTIVE_MAJOR;
    const minorSize = active ? ACTIVE_MINOR : INACTIVE_MINOR;

    // Pill dimensions: major axis = width, minor axis = height (before rotation)
    const pillW = majorSize;
    const pillH = minorSize;
    const pillRadius = pillH / 2;

    const haloW = pillW + (RING_PAD + HALO_PAD) * 2;
    const haloH = pillH + (RING_PAD + HALO_PAD) * 2;
    const haloRadius = haloH / 2;

    const ringW = pillW + RING_PAD * 2;
    const ringH = pillH + RING_PAD * 2;
    const ringRadius = ringH / 2;

    const focusRingW = haloW + FOCUS_RING_PAD * 2;
    const focusRingH = haloH + FOCUS_RING_PAD * 2;
    const focusRingRadius = focusRingH / 2;

    return (
        <g
            aria-hidden={true}
            style={{pointerEvents: "none"}}
            transform={`translate(${cx} ${cy}) rotate(${rotation})`}
            data-testid="pill-drag-handle"
        >
            {focused && (
                <rect
                    className="pill-drag-handle-focus-ring"
                    data-testid="pill-drag-handle-focus-ring"
                    x={-focusRingW / 2}
                    y={-focusRingH / 2}
                    width={focusRingW}
                    height={focusRingH}
                    rx={focusRingRadius}
                    ry={focusRingRadius}
                    stroke={interactiveColor}
                />
            )}
            {/* Halo */}
            <rect
                className="pill-drag-handle-halo"
                x={-haloW / 2}
                y={-haloH / 2}
                width={haloW}
                height={haloH}
                rx={haloRadius}
                ry={haloRadius}
                fill={interactiveColor}
            />
            {/* Ring — white background */}
            <rect
                className="pill-drag-handle-ring"
                x={-ringW / 2}
                y={-ringH / 2}
                width={ringW}
                height={ringH}
                rx={ringRadius}
                ry={ringRadius}
            />
            {/* Center pill */}
            <rect
                className="pill-drag-handle"
                data-testid="pill-drag-handle-pill"
                x={-pillW / 2}
                y={-pillH / 2}
                width={pillW}
                height={pillH}
                rx={pillRadius}
                ry={pillRadius}
                fill={interactiveColor}
            />
            {/* Grip dots: 3 along major axis × 2 along minor axis */}
            {active &&
                GRIP_DOT_MINOR_OFFSETS.map((dy) =>
                    GRIP_DOT_MAJOR_OFFSETS.map((dx) => (
                        <circle
                            className="pill-drag-handle-dot"
                            data-testid="pill-drag-handle-dot"
                            key={`${dx},${dy}`}
                            cx={dx}
                            cy={dy}
                        />
                    )),
                )}
        </g>
    );
}
