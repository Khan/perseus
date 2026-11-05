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
export const assumedLabelSize: LabelSize = {width: 24, height: labelHeightPx};

function rectsOverlap(a: Rect, b: Rect): boolean {
    return (
        a.right > b.left &&
        a.left < b.right &&
        a.bottom > b.top &&
        a.top < b.bottom
    );
}

/** Half the diagonal of a label, the clearance it demands around itself. */
function halfDiagonal(size: LabelSize): number {
    return Math.hypot(size.width, size.height) / 2;
}

function inflateRect(rect: Rect, by: number): Rect {
    return {
        left: rect.left - by,
        top: rect.top - by,
        right: rect.right + by,
        bottom: rect.bottom + by,
    };
}

/** Area the two rectangles share; zero when they don't overlap. */
function overlapArea(a: Rect, b: Rect): number {
    const width = Math.min(a.right, b.right) - Math.max(a.left, b.left);
    const height = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);

    if (width <= 0 || height <= 0) {
        return 0;
    }
    return width * height;
}

/**
 * Distance from a rectangle to a circle: positive when they're clear of each
 * other, negative when they overlap (the depth of the overlap).
 */
function rectToCircleGap(
    rect: Rect,
    centerPx: [number, number],
    radius: number,
): number {
    // Distance from the circle's center to the nearest point of the rect,
    // zero on an axis where the center lies within the rect's span.
    const dx = Math.max(rect.left - centerPx[X], 0, centerPx[X] - rect.right);
    const dy = Math.max(rect.top - centerPx[Y], 0, centerPx[Y] - rect.bottom);

    return Math.hypot(dx, dy) - radius;
}

/** Shortest distance from a line segment to a point. */
function segmentToPointDistance(
    a: [number, number],
    b: [number, number],
    point: [number, number],
): number {
    return pointToSegmentDistance(point, a, b);
}

/** Shortest distance from a point to a line segment. */
function pointToSegmentDistance(
    point: [number, number],
    a: [number, number],
    b: [number, number],
): number {
    const vx = b[X] - a[X];
    const vy = b[Y] - a[Y];
    const lengthSquared = vx * vx + vy * vy;

    // How far along the segment the nearest point lies, clamped to its ends so
    // a degenerate (zero-length) segment just measures to its single point.
    const t =
        lengthSquared === 0
            ? 0
            : Math.max(
                  0,
                  Math.min(
                      1,
                      ((point[X] - a[X]) * vx + (point[Y] - a[Y]) * vy) /
                          lengthSquared,
                  ),
              );

    return Math.hypot(point[X] - (a[X] + t * vx), point[Y] - (a[Y] + t * vy));
}

/** Whether two line segments cross. */
function segmentsIntersect(
    a: [number, number],
    b: [number, number],
    c: [number, number],
    d: [number, number],
): boolean {
    const cross = (
        o: [number, number],
        p: [number, number],
        q: [number, number],
    ) => (p[X] - o[X]) * (q[Y] - o[Y]) - (p[Y] - o[Y]) * (q[X] - o[X]);

    const d1 = cross(c, d, a);
    const d2 = cross(c, d, b);
    const d3 = cross(a, b, c);
    const d4 = cross(a, b, d);

    // Each segment must straddle the other's infinite line.
    return (
        ((d1 > 0 && d2 < 0) || (d1 < 0 && d2 > 0)) &&
        ((d3 > 0 && d4 < 0) || (d3 < 0 && d4 > 0))
    );
}

/**
 * Shortest distance from a line segment to a rectangle; zero when they touch.
 *
 * A line is the only obstacle here that isn't axis-aligned, so its bounding
 * box is a poor stand-in: for a 45-degree segment the box reaches far past the
 * stroke, and a label comfortably clear of the line would read as overlapping
 * it. This measures the segment itself.
 */
function segmentToRectDistance(
    a: [number, number],
    b: [number, number],
    rect: Rect,
): number {
    const isInside = (p: [number, number]) =>
        p[X] >= rect.left &&
        p[X] <= rect.right &&
        p[Y] >= rect.top &&
        p[Y] <= rect.bottom;

    if (isInside(a) || isInside(b)) {
        return 0;
    }

    const corners: Array<[number, number]> = [
        [rect.left, rect.top],
        [rect.right, rect.top],
        [rect.right, rect.bottom],
        [rect.left, rect.bottom],
    ];
    const edges = corners.map(
        (corner, i): [[number, number], [number, number]] => [
            corner,
            corners[(i + 1) % corners.length],
        ],
    );

    for (const [c, d] of edges) {
        if (segmentsIntersect(a, b, c, d)) {
            return 0;
        }
    }

    // Disjoint, so the closest approach is between an endpoint of one and the
    // body of the other.
    let shortest = Infinity;
    for (const [c, d] of edges) {
        shortest = Math.min(
            shortest,
            pointToSegmentDistance(c, a, b),
            pointToSegmentDistance(d, a, b),
            pointToSegmentDistance(a, c, d),
            pointToSegmentDistance(b, c, d),
        );
    }
    return shortest;
}

/** Which horizontal edge of the label sits on the placement coordinate. */
type LabelAnchorX = "left" | "right";

/** Which vertical edge of the label sits on the placement coordinate. */
type LabelAnchorY = "above" | "below";

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
 * enough of the markings config to know whether axis tick labels are on
 * screen. The marking fields are optional so callers that only have a
 * `GraphDimensions` can still place labels.
 */
export type AutoLabelGraphInfo = GraphDimensions & {
    markings?: MarkingsType;
    showAxisTicks?: ShowAxisTicks;
    tickStep?: vec.Vector2;
};

/**
 * Radius, in pixels, of a rendered locked point: mafs draws the circle at 6px
 * and Perseus strokes it at 2px, half of which falls outside.
 */
const pointRadiusPx = 7;

/**
 * Multiples of `labelOffsetPx` to try when the ideal position is blocked.
 * Each step trades proximity for room, so a label only travels as far as it
 * needs to.
 */
const candidateRadiusScales = [1, 1.5, 2, 3];

/**
 * Fractions along a segment to try when a label can't sit at its midpoint.
 */
const slidePositions = [0.3, 0.7];

/**
 * Below this on-screen length, sliding a label along its segment lands the
 * positions within a label's width of each other — near-duplicates that cost
 * scoring time without opening up a real alternative.
 */
const slideMinSegmentLengthPx = 75;

/**
 * How much each kind of problem counts against a candidate position.
 *
 * Collisions outrank distance: a label that sits a long way from its point
 * still reads correctly, whereas one overlapping a point or another label does
 * not. `deviation` tops out around 4 (the furthest candidate), so any real
 * overlap outweighs every distance difference.
 *
 * Within the collisions: running off the graph is worst, since the label is
 * then partly unreadable. Covering a point destroys the figure's meaning,
 * while clipping a tick number is merely untidy.
 *
 * These are the knob for tuning how tightly labels pack.
 */
const weightDeviation = 1;
const weightLabelOverlap = 60;
const weightPointOverlap = 40;
const weightTickOverlap = 25;
const weightOutOfBounds = 100;
// A line is as much a part of a figure as a point is, and a label lying across
// either one destroys what it was drawn to show, so they count the same.
const weightSegmentOverlap = 40;

/** A label to place, and the point it belongs to. */
export type LabelPlacementItem = {
    /** Identifies this label in the returned map. */
    key: string;
    /** The owning point, in graph units. */
    anchorCoord: Coord;
    /** Measured size, or `assumedLabelSize` if it hasn't been measured yet. */
    size: LabelSize;
    /**
     * The line this label belongs to, when it labels a line rather than a
     * point. Such a label sits beside its line rather than radiating from the
     * middle of the graph, and is exempt from this one segment's clearance.
     *
     * Matched by reference, so this has to be the same object the caller puts
     * in the obstacle list — two different lines can share endpoints.
     */
    ownerSegment?: SegmentObstacle;
};

/** A drawn point that labels have to stay clear of. */
export type PointObstacleInput = {
    /** Where the point sits, in graph units. */
    coord: Coord;
    /**
     * Keys of the labels belonging to this point, if any. A label doesn't have
     * to clear the point it labels.
     */
    ownerKeys?: ReadonlyArray<string>;
};

/** A drawn line that labels have to stay clear of. */
export type SegmentObstacle = {
    /** The segment's ends, in graph units. */
    from: Coord;
    to: Coord;
    /** Stroke width in pixels; the stroke straddles the segment. */
    strokeWidth: number;
};

/** Where to draw a label: the top-left corner of its box, in pixels. */
export type LabelPlacement = {
    cornerPx: [number, number];
};

/** A position being considered for a label, with the box it would occupy. */
type Candidate = {
    rect: Rect;
};

/** A drawn line in pixel space, ready to measure against. */
type PixelSegment = {
    a: [number, number];
    b: [number, number];
    strokeWidth: number;
    /** The obstacle this came from, so a label can recognise its own line. */
    owner?: SegmentObstacle;
};

/** A point that labels have to stay clear of. */
type PointObstacle = {
    centerPx: [number, number];
    /** Which label owns this point, so it can skip its own. */
    ownerKeys: ReadonlySet<string>;
};

/**
 * Positions to consider for a label: its ideal spot on the conceptual line
 * first, then the eight compass directions at increasing distances.
 *
 * The ideal comes first so that an exact tie in scoring resolves towards the
 * conceptual line, which keeps placement stable and predictable.
 */
function getPerpendicularCandidate(
    segmentPx: PixelSegment,
    t: number,
    side: 1 | -1,
    size: LabelSize,
    graphInfo: AutoLabelGraphInfo,
): Candidate {
    const {a, b, strokeWidth} = segmentPx;
    const dx = b[X] - a[X];
    const dy = b[Y] - a[Y];
    const length = Math.hypot(dx, dy);

    const anchorPx: [number, number] = [a[X] + dx * t, a[Y] + dy * t];
    // A degenerate segment has no perpendicular; fall back to straight up so
    // the candidate is still well-formed.
    const perpendicular: [number, number] =
        length === 0
            ? [0, -side]
            : [(-dy / length) * side, (dx / length) * side];

    // The anchors put the label's near corner at the offset position and let
    // the box extend away from the line, so this is the visible gap between
    // the two. It's the same gap a point label keeps from its point, and a
    // flat distance rather than one scaled to the label: the box approaches
    // the line along a known direction, so its width says nothing about how
    // far away it needs to sit.
    const distance = labelOffsetPx + strokeWidth / 2;

    const placed = keepLabelInBounds(
        anchorPx,
        [perpendicular[X] * distance, perpendicular[Y] * distance],
        size,
        graphInfo,
    );

    return {
        rect: getLabelRect(placed.cornerPx, placed.anchorX, placed.anchorY, size),
    };
}

function getCandidates(
    item: LabelPlacementItem,
    pointPx: [number, number],
    referencePx: [number, number],
    graphInfo: AutoLabelGraphInfo,
    ownerSegmentPx: PixelSegment | undefined,
): Candidate[] {
    const {size} = item;
    const toCandidate = (offsetPx: [number, number]): Candidate => {
        // Run every candidate through the bounds check, so a position that
        // would hang off an edge is moved to the point's other side first.
        const placed = keepLabelInBounds(pointPx, offsetPx, size, graphInfo);
        return {
            rect: getLabelRect(
                placed.cornerPx,
                placed.anchorX,
                placed.anchorY,
                size,
            ),
        };
    };

    const candidates: Candidate[] = [];

    if (ownerSegmentPx) {
        // A line label belongs beside its line, so perpendicular positions
        // come first; the radial ones below are the fallback when those are
        // taken. Prefer the side facing away from the middle of the graph.
        const {a, b} = ownerSegmentPx;
        const midpoint: [number, number] = [
            (a[X] + b[X]) / 2,
            (a[Y] + b[Y]) / 2,
        ];
        const segmentLengthForSide = Math.hypot(b[X] - a[X], b[Y] - a[Y]);
        const unitPerpendicular: [number, number] =
            segmentLengthForSide === 0
                ? [0, -1]
                : [
                      -(b[Y] - a[Y]) / segmentLengthForSide,
                      (b[X] - a[X]) / segmentLengthForSide,
                  ];
        // Which way the perpendicular leans relative to the middle of the
        // graph. A segment pointing straight away from the reference gives no
        // preference either way, and either side reads equally well.
        const outward: 1 | -1 =
            unitPerpendicular[X] * (midpoint[X] - referencePx[X]) +
                unitPerpendicular[Y] * (midpoint[Y] - referencePx[Y]) >=
            0
                ? 1
                : -1;
        const sides: Array<1 | -1> = [outward, outward === 1 ? -1 : 1];

        for (const side of sides) {
            candidates.push(
                getPerpendicularCandidate(
                    ownerSegmentPx,
                    0.5,
                    side,
                    size,
                    graphInfo,
                ),
            );
        }

        const segmentLength = Math.hypot(b[X] - a[X], b[Y] - a[Y]);
        if (segmentLength > slideMinSegmentLengthPx) {
            for (const t of slidePositions) {
                for (const side of sides) {
                    candidates.push(
                        getPerpendicularCandidate(
                            ownerSegmentPx,
                            t,
                            side,
                            size,
                            graphInfo,
                        ),
                    );
                }
            }
        }
    } else {
        candidates.push(
            toCandidate(getLabelOffsetInPixels(pointPx, referencePx)),
        );
    }

    for (const scale of candidateRadiusScales) {
        const distance = labelOffsetPx * scale;

        for (const dx of [-1, 0, 1]) {
            for (const dy of [-1, 0, 1]) {
                if (dx === 0 && dy === 0) {
                    continue;
                }
                const length = Math.hypot(dx, dy);
                candidates.push(
                    toCandidate([
                        (dx / length) * distance,
                        (dy / length) * distance,
                    ]),
                );
            }
        }
    }

    return candidates;
}

/**
 * How poor a position is for a label — lower is better.
 *
 * Distance from the ideal position is measured in offset-steps so that it
 * stays on a comparable scale to the overlap terms, all of which are
 * normalized by the same area.
 */
function scoreCandidate(
    candidate: Candidate,
    item: LabelPlacementItem,
    anchorPx: [number, number],
    idealRect: Rect,
    placed: ReadonlyArray<{rect: Rect; size: LabelSize}>,
    points: ReadonlyArray<PointObstacle>,
    tickZones: ReadonlyArray<Rect>,
    segments: ReadonlyArray<PixelSegment>,
    graphInfo: AutoLabelGraphInfo,
): number {
    const {rect} = candidate;
    const normalizeArea = labelOffsetPx * labelOffsetPx;
    const ownHalfDiagonal = halfDiagonal(item.size);

    const centerOf = (r: Rect) => [
        (r.left + r.right) / 2,
        (r.top + r.bottom) / 2,
    ];
    const [cx, cy] = centerOf(rect);
    const [idealX, idealY] = centerOf(idealRect);
    const deviation = Math.hypot(cx - idealX, cy - idealY) / labelOffsetPx;

    let labelPenalty = 0;
    for (const other of placed) {
        // The gap the pair needs is set by whichever label is larger. Only
        // this candidate is inflated — inflating both would double the gap.
        const required = Math.max(
            halfDiagonal(item.size),
            halfDiagonal(other.size),
        );
        labelPenalty +=
            overlapArea(inflateRect(rect, required), other.rect) /
            normalizeArea;
    }

    let pointPenalty = 0;
    for (const point of points) {
        // A label sits close to its own point by design, so it only has to
        // clear the others.
        if (point.ownerKeys.has(item.key)) {
            continue;
        }
        const gap = rectToCircleGap(
            inflateRect(rect, ownHalfDiagonal),
            point.centerPx,
            pointRadiusPx,
        );
        if (gap < 0) {
            // Penetration depth rather than area: it pushes the label out
            // along the shortest way clear.
            pointPenalty += -gap / labelOffsetPx;
        }
    }

    let tickPenalty = 0;
    for (const zone of tickZones) {
        tickPenalty += overlapArea(rect, zone) / normalizeArea;
    }

    let segmentPenalty = 0;
    for (const segment of segments) {
        // A label whose own anchor lies on a line — its midpoint label, or one
        // belonging to an endpoint — is meant to sit beside that line, so it
        // doesn't keep the full clearance from it. It must still not lie
        // across the stroke. Every other line gets the full treatment, just as
        // a point label clears every point but its own.
        const anchorIsOnSegment =
            (segment.owner != null && segment.owner === item.ownerSegment) ||
            segmentToPointDistance(segment.a, segment.b, anchorPx) <=
                segment.strokeWidth / 2 + 1;
        const required = anchorIsOnSegment
            ? segment.strokeWidth / 2
            : ownHalfDiagonal + segment.strokeWidth / 2;
        const distance = segmentToRectDistance(segment.a, segment.b, rect);
        if (distance < required) {
            segmentPenalty += (required - distance) / labelOffsetPx;
        }
    }

    const graphRect: Rect = {
        left: 0,
        top: 0,
        right: graphInfo.width,
        bottom: graphInfo.height,
    };
    const rectArea =
        (rect.right - rect.left) * (rect.bottom - rect.top);
    const outOfBounds =
        (rectArea - overlapArea(rect, graphRect)) / normalizeArea;

    return (
        weightDeviation * deviation +
        weightLabelOverlap * labelPenalty +
        weightPointOverlap * pointPenalty +
        weightTickOverlap * tickPenalty +
        weightSegmentOverlap * segmentPenalty +
        weightOutOfBounds * outOfBounds
    );
}

/**
 * Picks where to draw every point label on a graph, so that labels avoid each
 * other, the points, the axis tick numbers, and the graph's edges.
 *
 * Each label is placed once, against the labels already placed, so the pass
 * always terminates — there's no settling or iteration to converge. Labels are
 * placed from the outside in: a label near an edge has fewer directions open
 * to it, so it picks first, while labels nearer the middle have room to give
 * way.
 *
 * Every label still starts from its ideal spot on the conceptual line out
 * through its point, and only moves when something is in the way.
 *
 * Positions are returned as the top-left corner of the label's box, keyed by
 * `LabelPlacementItem.key`.
 */
export function getAutoLabelPlacements(
    items: ReadonlyArray<LabelPlacementItem>,
    graphInfo: AutoLabelGraphInfo,
    segments: ReadonlyArray<SegmentObstacle> = [],
    points: ReadonlyArray<PointObstacleInput> = [],
): ReadonlyMap<string, LabelPlacement> {
    const placements = new Map<string, LabelPlacement>();

    // Without a measured graph there's no pixel geometry to reason about, so
    // leave every label on its own point until layout gives the graph a size.
    if (!graphInfo.width || !graphInfo.height) {
        for (const item of items) {
            placements.set(item.key, {
                cornerPx: pointToPixel(item.anchorCoord, graphInfo),
            });
        }
        return placements;
    }

    const referencePx = getReferencePointInPixels(graphInfo);
    const tickZones = getTickZones(graphInfo);
    const segmentsPx: PixelSegment[] = segments.map((segment) => ({
        a: pointToPixel(segment.from, graphInfo),
        b: pointToPixel(segment.to, graphInfo),
        strokeWidth: segment.strokeWidth,
        owner: segment,
    }));

    // Every drawn point repels labels, whether or not it carries one of its
    // own — an unlabelled point is just as much a thing to avoid covering.
    // One obstacle per distinct coordinate, since points can coincide.
    const pointsByCoord = new Map<string, PointObstacle>();
    for (const point of points) {
        const coordKey = `${point.coord[X]},${point.coord[Y]}`;
        const existing = pointsByCoord.get(coordKey);
        const owners = existing
            ? (existing.ownerKeys as Set<string>)
            : new Set<string>();

        for (const key of point.ownerKeys ?? []) {
            owners.add(key);
        }

        if (!existing) {
            pointsByCoord.set(coordKey, {
                centerPx: pointToPixel(point.coord, graphInfo),
                ownerKeys: owners,
            });
        }
    }
    const pointObstacles = [...pointsByCoord.values()];

    // Outermost first. Ties break on key so the order is total, and placement
    // doesn't shift when figures are reordered.
    const ordered = [...items].sort((a, b) => {
        const distance = (item: LabelPlacementItem) => {
            const px = pointToPixel(item.anchorCoord, graphInfo);
            return Math.hypot(px[X] - referencePx[X], px[Y] - referencePx[Y]);
        };
        return distance(b) - distance(a) || a.key.localeCompare(b.key);
    });

    const placed: Array<{rect: Rect; size: LabelSize}> = [];

    for (const item of ordered) {
        const pointPx = pointToPixel(item.anchorCoord, graphInfo);
        const candidates = getCandidates(
            item,
            pointPx,
            referencePx,
            graphInfo,
            item.ownerSegment
                ? segmentsPx.find((s) => s.owner === item.ownerSegment)
                : undefined,
        );
        const idealRect = candidates[0].rect;

        let best = candidates[0];
        let bestScore = scoreCandidate(
            best,
            item,
            pointPx,
            idealRect,
            placed,
            pointObstacles,
            tickZones,
            segmentsPx,
            graphInfo,
        );

        for (const candidate of candidates.slice(1)) {
            const score = scoreCandidate(
                candidate,
                item,
                pointPx,
                idealRect,
                placed,
                pointObstacles,
                tickZones,
                segmentsPx,
                graphInfo,
            );
            // Strictly better, so ties keep the earlier (more ideal) position.
            if (score < bestScore) {
                best = candidate;
                bestScore = score;
            }
        }

        placements.set(item.key, {
            cornerPx: [best.rect.left, best.rect.top],
        });
        placed.push({rect: best.rect, size: item.size});
    }

    return placements;
}
