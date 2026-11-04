import {pixelsToVectors, pointToPixel} from "../graphs/use-transform";
import {X, Y} from "../math";

import type {GraphDimensions} from "../types";
import type {
    Coord,
    LockedPointType,
    MarkingsType,
    ShowAxisTicks,
} from "@khanacademy/perseus-core";
import type {vec} from "mafs";

/**
 * Distance, in pixels, from a point's center to the nearest corner of its
 * label. This is a visual distance rather than a distance in graph units: a
 * fixed number of graph units would read as a different gap on every range and
 * aspect ratio, whereas the label should always sit the same distance from its
 * point on screen.
 *
 * The label is anchored by the edge facing its point (see `LabelAnchor`), so
 * this is clearance from the point rather than a distance to the label's
 * center — it doesn't grow with the width of the text. Part of it is taken up
 * by the point's own radius, leaving a visible gap of a few pixels.
 */
const labelOffsetPx = 10;

/**
 * A rectangle in pixel space, used for the label's own box and for the
 * keep-out zones around the axis tick labels.
 */
type Rect = {
    left: number;
    top: number;
    right: number;
    bottom: number;
};

/** The rendered size of a label, in pixels. */
export type LabelSize = {
    width: number;
    height: number;
};

/**
 * Height, in pixels, of a rendered label. Used until a real measurement is
 * available; labels vary far less in height than in width, so this stays close
 * even for unmeasured labels.
 */
const labelHeightPx = 19;

/**
 * Size assumed for a label that hasn't been measured yet. Placement runs
 * before the label's text has been typeset, so it starts from this and is
 * recomputed once a real measurement arrives.
 */
const assumedLabelSize: LabelSize = {width: 24, height: labelHeightPx};

function rectsOverlap(a: Rect, b: Rect): boolean {
    return (
        a.right > b.left &&
        a.left < b.right &&
        a.bottom > b.top &&
        a.top < b.bottom
    );
}

/**
 * The box a label would occupy, given where its anchored corner sits and which
 * corner that is. The box extends away from the point in both axes, matching
 * how the CSS anchors the element.
 */
function getLabelRect(
    cornerPx: [number, number],
    anchorX: LabelAnchorX,
    anchorY: LabelAnchorY,
    size: LabelSize,
): Rect {
    const left = anchorX === "left" ? cornerPx[X] - size.width : cornerPx[X];
    const top = anchorY === "above" ? cornerPx[Y] - size.height : cornerPx[Y];

    return {
        left,
        top,
        right: left + size.width,
        bottom: top + size.height,
    };
}

/**
 * Where the conceptual line through each point starts.
 *
 * The origin is the natural center of a graph that shows it, so labels radiate
 * away from it and away from the axes that cross there. A graph whose range
 * excludes the origin — or puts it right on an edge — has no such center, so
 * the middle of the visible area stands in for it.
 */
function getReferencePointInPixels(
    graphInfo: AutoLabelGraphInfo,
): [number, number] {
    const [[xMin, xMax], [yMin, yMax]] = graphInfo.range;

    const originIsVisible =
        xMin < 0 && xMax > 0 && yMin < 0 && yMax > 0;

    if (originIsVisible) {
        return pointToPixel([0, 0], graphInfo);
    }

    return [graphInfo.width / 2, graphInfo.height / 2];
}

/**
 * Offset, in pixels, from a point to the nearest corner of its label.
 *
 * The label is placed along the conceptual line running from the graph's
 * reference point (see `getReferencePointInPixels`) out through the point, so
 * it reads as belonging to that point and sits away from the middle of the
 * graph. The offset is a fixed distance along that line, which works because
 * the label is anchored by the edge facing its point: clearance doesn't depend
 * on how wide the text turns out to be once the TeX is typeset.
 *
 * A point sitting exactly on the reference has no direction to follow. It gets
 * pushed up and to the right, which is clear of the tick numbers on both axes
 * when the reference is the origin.
 */
function getLabelOffsetInPixels(
    pointPx: [number, number],
    referencePx: [number, number],
): [number, number] {
    const dx = pointPx[X] - referencePx[X];
    const dy = pointPx[Y] - referencePx[Y];

    const distance = Math.hypot(dx, dy);
    if (distance === 0) {
        // Pixel y grows downward, so a negative offset places the label above.
        const diagonal = labelOffsetPx / Math.SQRT2;
        return [diagonal, -diagonal];
    }

    return [
        (dx / distance) * labelOffsetPx,
        (dy / distance) * labelOffsetPx,
    ];
}

/**
 * Whether the graph is showing labelled ticks along the given axis. Ticks only
 * render when the markings include axes, and then only for the axes
 * `showAxisTicks` enables.
 */
function hasTickLabels(
    graphInfo: AutoLabelGraphInfo,
    axis: "x" | "y",
): boolean {
    const {markings, showAxisTicks} = graphInfo;
    const marksAxes = markings === "graph" || markings === "axes";
    return marksAxes && !!showAxisTicks?.[axis];
}

/**
 * Half the length of a tick mark. Ticks are centered on their axis, so they
 * stick out by this much on the far side of the axis line, and the keep-out
 * zones start there rather than at the axis itself.
 */
const tickOverhangPx = 5;

/**
 * Depth, in pixels, of the zone below the x-axis: the tick marks plus the
 * numbers beneath them, measured from the tick marks' outer edge.
 */
const xTickZoneDepthPx = 30;

/**
 * Width, in pixels, of the zone beside the y-axis, measured from the tick
 * marks' outer edge. Unlike the x-axis zone the width varies with the numbers
 * shown, since they're right-aligned against the axis and extend away from it.
 *
 * Derived from measurements of the rendered ticks: a positive single digit
 * occupies 27px, each additional digit adds 6px, and a minus sign adds 5px.
 */
const yTickZoneBaseWidthPx = 27;
const yTickZoneDigitWidthPx = 6;
const yTickZoneMinusWidthPx = 5;

/**
 * Width of the widest tick label on the y-axis, which sets how far its
 * keep-out zone extends from the axis.
 *
 * The tick values are known from the range and step, so the widest can be
 * worked out arithmetically — no text measurement needed.
 */
function getYTickZoneWidth(graphInfo: AutoLabelGraphInfo): number {
    const [, [yMin, yMax]] = graphInfo.range;
    const step = graphInfo.tickStep?.[Y];

    // Without a step there's no way to know which values are drawn; assume the
    // range's own bounds are the widest labels.
    const candidates = [yMin, yMax];
    if (step && step > 0) {
        // The extremes of the range produce the longest numbers, so the
        // widest label is at one end or the other.
        candidates.push(Math.floor(yMax / step) * step);
        candidates.push(Math.ceil(yMin / step) * step);
    }

    const widest = candidates.reduce((max, value) => {
        const digits = Math.max(
            1,
            Math.floor(Math.abs(value)).toString().length,
        );
        const width =
            yTickZoneBaseWidthPx +
            (digits - 1) * yTickZoneDigitWidthPx +
            (value < 0 ? yTickZoneMinusWidthPx : 0);
        return Math.max(max, width);
    }, yTickZoneBaseWidthPx);

    return widest;
}

/**
 * The keep-out zones around the axis tick labels, in pixel space.
 *
 * Each is a rectangle running the full extent of the graph along its axis: the
 * x-axis zone is a horizontal band below the axis, the y-axis zone a vertical
 * strip to its left. Both start at the outer edge of the tick marks, which
 * overhang the axis line itself.
 */
function getTickZones(graphInfo: AutoLabelGraphInfo): Rect[] {
    const zones: Rect[] = [];
    const originPx = pointToPixel([0, 0], graphInfo);

    if (hasTickLabels(graphInfo, "x")) {
        // Pixel y grows downward, so the numbers sit below the axis.
        const top = originPx[Y] - tickOverhangPx;
        zones.push({
            left: 0,
            right: graphInfo.width,
            top,
            bottom: top + xTickZoneDepthPx,
        });
    }

    if (hasTickLabels(graphInfo, "y")) {
        // The numbers are right-aligned against the axis, extending leftward.
        const right = originPx[X] + tickOverhangPx;
        zones.push({
            left: right - getYTickZoneWidth(graphInfo),
            right,
            top: 0,
            bottom: graphInfo.height,
        });
    }

    return zones;
}

/**
 * Which side of its point a label sits on, given its offset in pixels. Pixel y
 * grows downward, so a negative vertical offset places the label above its
 * point.
 */
function getAnchorY(verticalOffsetPx: number): LabelAnchorY {
    return verticalOffsetPx < 0 ? "above" : "below";
}

function getAnchorX(horizontalOffsetPx: number): LabelAnchorX {
    // A label directly above or below its point still has to pick a side; it
    // reads the same either way, so default to extending rightward.
    return horizontalOffsetPx < 0 ? "left" : "right";
}

/**
 * Pushes a label out of the tick zones it overlaps, perpendicular to each.
 *
 * Both axes are resolved in one step rather than one after the other: a label
 * near the origin can sit inside both zones at once, and since each zone runs
 * the full extent of the graph, escaping one by moving along it never leaves
 * the other. Moving away from both at once clears the corner they form.
 *
 * Returns the adjusted corner position.
 */
function nudgeOutOfTickZones(
    cornerPx: [number, number],
    anchorX: LabelAnchorX,
    anchorY: LabelAnchorY,
    size: LabelSize,
    zones: Rect[],
): [number, number] {
    const labelRect = getLabelRect(cornerPx, anchorX, anchorY, size);

    let shiftX = 0;
    let shiftY = 0;

    for (const zone of zones) {
        if (!rectsOverlap(labelRect, zone)) {
            continue;
        }

        // A zone spanning the full width blocks vertically; one spanning the
        // full height blocks horizontally. Escape perpendicular to the zone,
        // in whichever direction is shorter.
        const spansWidth = zone.left <= 0 && zone.right >= labelRect.right;
        if (spansWidth) {
            const up = zone.top - labelRect.bottom;
            const down = zone.bottom - labelRect.top;
            shiftY = Math.abs(up) <= Math.abs(down) ? up : down;
        } else {
            const left = zone.left - labelRect.right;
            const right = zone.right - labelRect.left;
            shiftX = Math.abs(left) <= Math.abs(right) ? left : right;
        }
    }

    return [cornerPx[X] + shiftX, cornerPx[Y] + shiftY];
}

/**
 * Moves a label to the other side of its point on whichever axes would
 * otherwise run past a graph edge.
 *
 * Re-anchoring alone isn't enough: the label's corner sits only
 * `labelOffsetPx` from its point, so growing the box back from that corner
 * would cover the point itself. Mirroring the offset instead puts the label on
 * the opposite side with the same gap, which keeps it clear of the point and
 * still on the conceptual line through it.
 *
 * Each axis is handled separately, and only when mirroring actually helps —
 * for a label too large to fit on either side, the original placement stands.
 * Uses the label's real dimensions, so it reacts to how wide the text renders
 * rather than guessing from the point's coordinate.
 */
function keepLabelInBounds(
    pointPx: [number, number],
    offsetPx: [number, number],
    size: LabelSize,
    graphInfo: AutoLabelGraphInfo,
): {cornerPx: [number, number]; anchorX: LabelAnchorX; anchorY: LabelAnchorY} {
    let horizontalOffset = offsetPx[X];
    let verticalOffset = offsetPx[Y];

    const fitsHorizontally = (offset: number) => {
        const corner = pointPx[X] + offset;
        const left = offset < 0 ? corner - size.width : corner;
        return left >= 0 && left + size.width <= graphInfo.width;
    };

    const fitsVertically = (offset: number) => {
        const corner = pointPx[Y] + offset;
        const top = offset < 0 ? corner - size.height : corner;
        return top >= 0 && top + size.height <= graphInfo.height;
    };

    if (!fitsHorizontally(horizontalOffset) && fitsHorizontally(-horizontalOffset)) {
        horizontalOffset = -horizontalOffset;
    }
    if (!fitsVertically(verticalOffset) && fitsVertically(-verticalOffset)) {
        verticalOffset = -verticalOffset;
    }

    return {
        cornerPx: [pointPx[X] + horizontalOffset, pointPx[Y] + verticalOffset],
        anchorX: getAnchorX(horizontalOffset),
        anchorY: getAnchorY(verticalOffset),
    };
}

/**
 * The graph information label placement needs: its range and pixel size, plus
 * enough of the markings config to know whether x-axis tick labels are on
 * screen. The marking fields are optional so callers that only have a
 * `GraphDimensions` can still place labels.
 */
export type AutoLabelGraphInfo = GraphDimensions & {
    markings?: MarkingsType;
    showAxisTicks?: ShowAxisTicks;
    tickStep?: vec.Vector2;
};

/** Which horizontal edge of the label sits on the placement coordinate. */
export type LabelAnchorX = "left" | "right";

/** Which vertical edge of the label sits on the placement coordinate. */
export type LabelAnchorY = "above" | "below";

/**
 * Where to draw a label: the coordinate to position it at, and which of its
 * own corners that coordinate refers to.
 *
 * The coordinate is a point on the conceptual line out from the graph's
 * center, and the anchors say which corner of the label to pin there — the
 * corner facing its point. Anchoring by a corner rather than the label's
 * center keeps the gap between point and label the same no matter how wide
 * the text renders, which can't be known ahead of time because labels may
 * contain TeX.
 *
 * `anchorX` of "right" means the label extends rightward from the coordinate
 * (its left edge is pinned); "left" means it extends leftward. Likewise
 * `anchorY` of "below" extends downward and "above" extends upward.
 */
export type LabelPlacement = {
    coord: Coord;
    anchorX: LabelAnchorX;
    anchorY: LabelAnchorY;
};

/**
 * Picks where to draw a point's label: `labelOffsetPx` along the line running
 * from the graph's reference point — the origin when it's visible, otherwise
 * the middle of the graph — out through the point.
 *
 * Three adjustments then apply, in order:
 *
 * 1. The anchors flip if the label's box would extend past a graph edge, so it
 *    grows inward instead. This keeps the label on its conceptual line rather
 *    than moving it.
 * 2. If the label would land on the tick numbers along either axis, it is
 *    mirrored to the other side of its point — which usually clears them while
 *    keeping the label on the same line.
 * 3. If mirroring isn't enough, the label is nudged perpendicular to whichever
 *    zones it still overlaps until it is clear.
 *
 * `labelSize` is the label's measured dimensions. Placement runs before the
 * text has been typeset, so it falls back to an assumed size and is recomputed
 * once a measurement arrives.
 *
 * The returned coordinate is a corner of the label rather than its center; the
 * anchors say which one, and the label element has to be positioned to match
 * (see `locked-label.module.css`).
 */
export function getAutoLabelCoordinates(
    lockedFigure: LockedPointType,
    graphInfo: AutoLabelGraphInfo,
    labelSize: LabelSize = assumedLabelSize,
): LabelPlacement {
    const coord = lockedFigure.coord;

    // Without a measured graph there's no meaningful pixel distance to offset
    // by; leave the label on its point until layout gives the graph a size.
    if (!graphInfo.width || !graphInfo.height) {
        return {coord, anchorX: "right", anchorY: "below"};
    }

    // The direction has to be worked out in pixel space: the graph isn't drawn
    // with a preserved aspect ratio, so the on-screen angle from the reference
    // differs from the angle in graph units.
    const pointPx = pointToPixel(coord, graphInfo);
    const referencePx = getReferencePointInPixels(graphInfo);

    const offsetPx = getLabelOffsetInPixels(pointPx, referencePx);

    // Keep the label inside the graph, moving it to the other side of its
    // point rather than letting it grow back across the point.
    const placed = keepLabelInBounds(pointPx, offsetPx, labelSize, graphInfo);
    let cornerPx = placed.cornerPx;
    let {anchorX, anchorY} = placed;

    const zones = getTickZones(graphInfo);
    const overlapsZones = (
        corner: [number, number],
        ax: LabelAnchorX,
        ay: LabelAnchorY,
    ) => {
        const rect = getLabelRect(corner, ax, ay, labelSize);
        return zones.some((zone) => rectsOverlap(rect, zone));
    };

    if (zones.length > 0 && overlapsZones(cornerPx, anchorX, anchorY)) {
        // Mirroring across the point keeps the label on its conceptual line,
        // so try that before moving it off the line. Run it back through the
        // bounds check, since the other side may not fit either.
        const mirrored = keepLabelInBounds(
            pointPx,
            [-offsetPx[X], -offsetPx[Y]],
            labelSize,
            graphInfo,
        );

        const flipped: LabelAnchorY = anchorY === "above" ? "below" : "above";

        if (
            !overlapsZones(
                mirrored.cornerPx,
                mirrored.anchorX,
                mirrored.anchorY,
            )
        ) {
            cornerPx = mirrored.cornerPx;
            anchorX = mirrored.anchorX;
            anchorY = mirrored.anchorY;
        } else if (!overlapsZones(cornerPx, anchorX, flipped)) {
            // A label level with its reference has a flat offset, so mirroring
            // lands in the same place. Growing the box the other way from that
            // position can still clear the zone — which is what puts a label
            // on the x-axis above the numbers rather than among them.
            anchorY = flipped;
        } else {
            // Still blocked every way, so push the label out of the zone.
            cornerPx = nudgeOutOfTickZones(
                cornerPx,
                anchorX,
                anchorY,
                labelSize,
                zones,
            );
        }
    }

    return {
        coord: pixelsToVectors([cornerPx], graphInfo)[0],
        anchorX,
        anchorY,
    };
}
