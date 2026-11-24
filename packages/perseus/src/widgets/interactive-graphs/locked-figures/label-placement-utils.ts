import {vec} from "mafs";

import {pointToPixel} from "../graphs/use-transform";
import {
    boxToCircleGap,
    boxToPointDistance,
    inset,
    overlapArea,
    segmentToBoxDistance,
    X,
    Y,
} from "../math";

import type {Box, Segment} from "../math";
import type {GraphDimensions} from "../types";
import type {
    Coord,
    MarkingsType,
    ShowAxisTicks,
} from "@khanacademy/perseus-core";

/**
 * Distance, in pixels, from a point's center to the nearest corner of its
 * label. This is a visual distance rather than a distance in graph units: a
 * fixed number of graph units would read as a different gap on every range and
 * aspect ratio, whereas the label should always sit the same distance from its
 * point on screen.
 *
 * The label is anchored by the corner facing its point (see `getLabelRect`),
 * so this is clearance from the point rather than a distance to the label's
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

/** How much room a label demands around itself, as half its diagonal. */
function labelClearance(size: LabelSize): number {
    return Math.hypot(size.width, size.height) / 2;
}

// A label's box as a `Box`, so it can be measured against the shared geometry
// in `math/`. Note the box is in pixel space, where y grows downward — so its
// y interval runs [top, bottom], and `yMin` is the box's *top* edge.
function rectToBox(rect: Rect): Box {
    return [
        [rect.left, rect.right],
        [rect.top, rect.bottom],
    ];
}

// The unit vector at right angles to a segment. A zero-length segment has no
// direction to turn from, so it reports straight up.
function perpendicularTo([a, b]: Segment): [number, number] {
    const dx = b[X] - a[X];
    const dy = b[Y] - a[Y];
    const length = Math.hypot(dx, dy);

    if (length === 0) {
        return [0, -1];
    }
    return [-dy / length, dx / length];
}

/**
 * The box a label would occupy when offset from its point by `offsetPx`.
 *
 * The offset lands on the box's corner nearest the point, and the box extends
 * away from there — so a negative offset on an axis puts the box on the
 * negative side, growing further in that direction.
 */
function getLabelRect(
    pointPx: [number, number],
    offsetPx: [number, number],
    size: LabelSize,
): Rect {
    const cornerX = pointPx[X] + offsetPx[X];
    const cornerY = pointPx[Y] + offsetPx[Y];

    const left = offsetPx[X] < 0 ? cornerX - size.width : cornerX;
    const top = offsetPx[Y] < 0 ? cornerY - size.height : cornerY;

    return {
        left,
        top,
        right: left + size.width,
        bottom: top + size.height,
    };
}

/**
 * Where the ideal line through each point starts.
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

    const originIsVisible = xMin < 0 && xMax > 0 && yMin < 0 && yMax > 0;

    if (originIsVisible) {
        return pointToPixel([0, 0], graphInfo);
    }

    return [graphInfo.width / 2, graphInfo.height / 2];
}

/**
 * Offset, in pixels, from a point to the nearest corner of its label.
 *
 * The label is placed along the ideal line running from the graph's
 * reference point (see `getReferencePointInPixels`) out through the point, so
 * it reads as belonging to that point and sits away from the middle of the
 * graph. The offset is a fixed distance along that line. The label is anchored
 * by the corner facing its point, so clearance doesn't depend on how wide the
 * text turns out to be once the TeX is typeset.
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

    return [(dx / distance) * labelOffsetPx, (dy / distance) * labelOffsetPx];
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
 * Adjusts a label's offset so the label stays within the graph, moving it to
 * the other side of its point depending upon which graph edge is breached.
 *
 * Growing the box back from its existing corner isn't enough: that corner
 * sits only `labelOffsetPx` from its point, so the box would cover the point
 * itself. Mirroring the offset instead puts the label on the opposite side
 * with the same gap, which keeps it clear of the point and still on the
 * ideal line through it.
 *
 * Each axis is handled separately, and only when mirroring actually helps —
 * for a label too large to fit on either side, the original placement stands.
 * Uses the label's real dimensions, so it reacts to how wide the text renders
 * rather than guessing from the point's coordinate.
 */
function fitOffsetWithinGraph(
    pointPx: [number, number],
    offsetPx: [number, number],
    size: LabelSize,
    graphInfo: AutoLabelGraphInfo,
): [number, number] {
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

    if (
        !fitsHorizontally(horizontalOffset) &&
        fitsHorizontally(-horizontalOffset)
    ) {
        horizontalOffset = -horizontalOffset;
    }
    if (!fitsVertically(verticalOffset) && fitsVertically(-verticalOffset)) {
        verticalOffset = -verticalOffset;
    }

    return [horizontalOffset, verticalOffset];
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
 * How far a vector's arrowhead reaches from the tip it sits on, in pixels.
 *
 * The arrowhead path spans 5.6px either side of the line and 5.7px back from
 * the tip (see `graphs/components/arrowhead.tsx`), so its furthest corner is
 * hypot(5.6, 5.7) ≈ 8px away. Plus half the stroke, which straddles the path.
 *
 * Treating it as a circle over-reserves a little to the sides, where the
 * arrowhead is narrower than it is long.
 */
export function getArrowheadRadiusPx(strokeWidth: number): number {
    return 8 + strokeWidth / 2;
}

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
     * The line this label belongs to — either because it labels the line
     * itself, or because it labels one of its endpoints. Such a label is
     * exempt from that one segment's clearance near its own anchor; it is
     * meant to sit beside the line, not be pushed away from it.
     *
     * Matched by reference, so this has to be the same object the caller puts
     * in the obstacle list — two different lines can share endpoints.
     */
    ownerSegment?: SegmentObstacle;
    /**
     * Whether this label names the line itself rather than one of its points.
     * A line's own label is placed beside the line; an endpoint's label still
     * radiates from its point like any other.
     */
    labelsTheLine?: boolean;
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
    /**
     * How much space the drawn mark takes up, in pixels. Defaults to a locked
     * point's own radius; a vector's arrowhead, for instance, is larger.
     */
    radiusPx?: number;
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

/** The label being scored, reduced to what scoring reads. */
type LabelInfo = {
    /** Identifies this label, so it can skip the point it names. */
    key: string;
    /** Measured size, or `assumedLabelSize` if it has not been measured. */
    size: LabelSize;
    /**
     * The line this label belongs to, if any. Matched by reference against a
     * segment's `owner`, so this has to stay the caller's own object.
     */
    ownerSegment?: SegmentObstacle;
    /** The point this label names, in pixels. */
    anchorPx: [number, number];
};

/** Everything a candidate position has to avoid. */
type Obstacles = {
    /** Labels already positioned, with the sizes that set their gaps. */
    placedLabels: ReadonlyArray<{rect: Rect; size: LabelSize}>;
    points: ReadonlyArray<PointObstacle>;
    tickZones: ReadonlyArray<Rect>;
    segments: ReadonlyArray<PixelSegment>;
};

/**
 * How far a label's box sits from a drawn line, skipping the stretch of that
 * line running through the point the label names.
 *
 * A label is placed `labelOffsetPx` from its own anchor, and that anchor lies
 * on the line — so measuring against the whole line returns that same gap
 * rather than the distance to any stroke the label has to avoid. Skipping the
 * stretch around the anchor makes the measurement reach the rest of the line.
 *
 * The skip only applies where the anchor is an end of the line. An anchor
 * partway along — a ray's second point, or either point defining an infinite
 * line — has stroke running past it on both sides, and that stroke is a real
 * obstacle, so the whole line is measured.
 */
function strokeDistanceIgnoringAnchor(
    segment: PixelSegment,
    box: Box,
    anchorPx: [number, number],
): number {
    const {a, b} = segment;
    const length = vec.dist(a, b);
    const fromA = vec.dist(anchorPx, a);
    const fromB = vec.dist(anchorPx, b);

    const anchorIsAtAnEnd = Math.min(fromA, fromB) <= labelOffsetPx;
    if (length === 0 || labelOffsetPx >= length || !anchorIsAtAnEnd) {
        return segmentToBoxDistance([a, b], box);
    }

    const trimFraction = labelOffsetPx / length;
    const trimmedSegment: Segment =
        fromA <= fromB
            ? [vec.lerp(a, b, trimFraction), b]
            : [a, vec.lerp(b, a, trimFraction)];

    return segmentToBoxDistance(trimmedSegment, box);
}

/** A point that labels have to stay clear of. */
type PointObstacle = {
    centerPx: [number, number];
    radiusPx: number;
    /** Which labels own this point, so each can skip its own. */
    ownerKeys: Set<string>;
};

/**
 * A position beside a line: the given fraction of the way along it, offset
 * perpendicular to it on the given `side`.
 *
 * Used for the label that names a line, which belongs next to the stroke
 * rather than radiating out of the middle of the graph the way a point's label
 * does.
 */
function getPerpendicularCandidate(
    segmentPx: PixelSegment,
    positionAlongSegment: number,
    side: 1 | -1,
    size: LabelSize,
    graphInfo: AutoLabelGraphInfo,
): Candidate {
    const {a, b, strokeWidth} = segmentPx;
    const dx = b[X] - a[X];
    const dy = b[Y] - a[Y];

    const anchorPx: [number, number] = [
        a[X] + dx * positionAlongSegment,
        a[Y] + dy * positionAlongSegment,
    ];

    const distance = labelOffsetPx + strokeWidth / 2;
    const offsetPx = vec.scale(perpendicularTo([a, b]), side * distance);

    const fittedOffset = fitOffsetWithinGraph(
        anchorPx,
        offsetPx,
        size,
        graphInfo,
    );

    return {rect: getLabelRect(anchorPx, fittedOffset, size)};
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
        const fittedOffset = fitOffsetWithinGraph(
            pointPx,
            offsetPx,
            size,
            graphInfo,
        );
        return {rect: getLabelRect(pointPx, fittedOffset, size)};
    };

    const candidates: Candidate[] = [];

    if (ownerSegmentPx) {
        // A line label belongs beside its line, so perpendicular positions
        // come first; the radial ones below are the fallback when those are
        // taken. Prefer the side facing away from the middle of the graph.
        const {a, b} = ownerSegmentPx;
        const midpoint: vec.Vector2 = [(a[X] + b[X]) / 2, (a[Y] + b[Y]) / 2];
        const perpendicular = perpendicularTo([a, b]);
        // Which way the perpendicular leans relative to the middle of the
        // graph. A segment pointing straight away from the reference gives no
        // preference either way, and either side reads equally well.
        const outward: 1 | -1 =
            vec.dot(perpendicular, vec.sub(midpoint, referencePx)) >= 0
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

        const segmentLength = vec.dist(a, b);
        // Minimum on-screen length, in pixels, for sliding to be worthwhile:
        // below it the slide positions land within a label's width of each
        // other. A tuned value, not one derived from the numbers above.
        if (segmentLength > 75) {
            for (const slidePosition of slidePositions) {
                for (const side of sides) {
                    candidates.push(
                        getPerpendicularCandidate(
                            ownerSegmentPx,
                            slidePosition,
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
                    // Not a direction, so there's nothing to normalize.
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
    candidateRect: Rect,
    label: LabelInfo,
    idealRect: Rect,
    obstacles: Obstacles,
    graphSizePx: GraphDimensions,
): number {
    const {anchorPx} = label;
    const normalizeArea = labelOffsetPx * labelOffsetPx;
    const ownClearance = labelClearance(label.size);

    const centerOf = (r: Rect): vec.Vector2 => [
        (r.left + r.right) / 2,
        (r.top + r.bottom) / 2,
    ];
    const deviation =
        vec.dist(centerOf(candidateRect), centerOf(idealRect)) / labelOffsetPx;

    // The shared geometry in `math/` works in boxes, so convert once here.
    const candidateBox = rectToBox(candidateRect);
    // `inset` shrinks a box; a negative amount grows it instead.
    const inflate = (by: number) => inset([-by, -by], candidateBox);

    const labelPenalty = obstacles.placedLabels.reduce(
        (penalty, otherLabel) => {
            // The clearance the pair needs is set by whichever label is larger.
            const required = Math.max(
                ownClearance,
                labelClearance(otherLabel.size),
            );
            const inflatedCandidateBox = inflate(required);
            const otherLabelBox = rectToBox(otherLabel.rect);

            return (
                penalty +
                overlapArea(inflatedCandidateBox, otherLabelBox) / normalizeArea
            );
        },
        0,
    );

    const pointPenalty = obstacles.points.reduce((penalty, point) => {
        // A label sits close to its own point by design, so it only has to
        // clear the others.
        if (point.ownerKeys.has(label.key)) {
            return penalty;
        }

        const gap = boxToCircleGap(
            inflate(ownClearance),
            point.centerPx,
            point.radiusPx,
        );
        // When there is space between the label and the point, there is no
        // additional penalty.
        if (gap >= 0) {
            return penalty;
        }

        // The point has intruded into the label's clearance. Penalize by
        // penetration depth rather than area: depth pushes the label out
        // along the shortest way clear.
        return penalty - gap / labelOffsetPx;
    }, 0);

    const tickPenalty = obstacles.tickZones.reduce(
        (penalty, zone) =>
            penalty +
            overlapArea(candidateBox, rectToBox(zone)) / normalizeArea,
        0,
    );

    const segmentPenalty = obstacles.segments.reduce((penalty, segment) => {
        // Ownership is declared, not derived from position: an unrelated
        // point can sit on a line, and its label is still held the full
        // distance away.
        const isOwnLine =
            segment.owner != null && segment.owner === label.ownerSegment;

        // Ownership is the same for every candidate; proximity is what makes
        // the relief positional.
        const besideOwnLine =
            isOwnLine &&
            boxToPointDistance(candidateBox, anchorPx) <= ownClearance;

        // A label beside its own line only has to clear the stroke.
        const distance = besideOwnLine
            ? strokeDistanceIgnoringAnchor(segment, candidateBox, anchorPx)
            : segmentToBoxDistance([segment.a, segment.b], candidateBox);
        const required = besideOwnLine
            ? labelOffsetPx + segment.strokeWidth / 2
            : ownClearance + segment.strokeWidth / 2;

        if (distance >= required) {
            return penalty;
        }
        return penalty + (required - distance) / labelOffsetPx;
    }, 0);

    // The graph's own bounds, in pixels. Both intervals run from 0 because the
    // origin of pixel space is the graph's top-left corner.
    const graphBox: Box = [
        [0, graphSizePx.width],
        [0, graphSizePx.height],
    ];
    const candidateArea =
        (candidateRect.right - candidateRect.left) *
        (candidateRect.bottom - candidateRect.top);
    const outOfBounds =
        (candidateArea - overlapArea(candidateBox, graphBox)) / normalizeArea;

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
 * Every label still starts on the ideal line out through its point, and
 * only moves when something is in the way.
 *
 * Positions are returned as the top-left corner of the label's box, keyed by
 * `LabelPlacementItem.key`.
 */
export function getAutoLabelPlacements(
    labels: ReadonlyArray<LabelPlacementItem>,
    graphInfo: AutoLabelGraphInfo,
    segments: ReadonlyArray<SegmentObstacle> = [],
    points: ReadonlyArray<PointObstacleInput> = [],
): ReadonlyMap<string, LabelPlacement> {
    // A graph with no range has no pixel geometry to reason about — every
    // coordinate maps to the same place. Leave each label on its point.
    if (graphInfo.width === 0 || graphInfo.height === 0) {
        return new Map(
            labels.map((label) => [
                label.key,
                {cornerPx: pointToPixel(label.anchorCoord, graphInfo)},
            ]),
        );
    }

    const placements = new Map<string, LabelPlacement>();

    const referencePx = getReferencePointInPixels(graphInfo);
    const tickZones = getTickZones(graphInfo);
    const segmentsPx: PixelSegment[] = segments.map((segment) => ({
        a: pointToPixel(segment.from, graphInfo),
        b: pointToPixel(segment.to, graphInfo),
        strokeWidth: segment.strokeWidth,
        owner: segment,
    }));

    // One obstacle per distinct coordinate, since points can coincide.
    const pointsByCoord = new Map<string, PointObstacle>();
    for (const point of points) {
        const coordKey = `${point.coord[X]},${point.coord[Y]}`;
        const existing = pointsByCoord.get(coordKey);
        const owners = existing ? existing.ownerKeys : new Set<string>();

        point.ownerKeys?.forEach((key) => owners.add(key));

        if (existing) {
            // Coinciding marks: keep whichever reserves the most space.
            existing.radiusPx = Math.max(
                existing.radiusPx,
                point.radiusPx ?? pointRadiusPx,
            );
        } else {
            pointsByCoord.set(coordKey, {
                centerPx: pointToPixel(point.coord, graphInfo),
                radiusPx: point.radiusPx ?? pointRadiusPx,
                ownerKeys: owners,
            });
        }
    }
    const pointObstacles = [...pointsByCoord.values()];

    // Outermost first. Ties break on key so the order is total, and placement
    // doesn't shift when figures are reordered.
    const sortedLabels = [...labels].sort((a, b) => {
        const distance = (label: LabelPlacementItem) => {
            const px = pointToPixel(label.anchorCoord, graphInfo);
            return vec.dist(px, referencePx);
        };
        const difference = distance(b) - distance(a);
        return difference === 0 ? a.key.localeCompare(b.key) : difference;
    });

    const placedLabels: Array<{rect: Rect; size: LabelSize}> = [];

    for (const label of sortedLabels) {
        const pointPx = pointToPixel(label.anchorCoord, graphInfo);
        const candidates = getCandidates(
            label,
            pointPx,
            referencePx,
            graphInfo,
            label.labelsTheLine && label.ownerSegment
                ? segmentsPx.find((s) => s.owner === label.ownerSegment)
                : undefined,
        );
        const idealRect = candidates[0].rect;

        const labelInfo: LabelInfo = {
            key: label.key,
            size: label.size,
            ownerSegment: label.ownerSegment,
            anchorPx: pointPx,
        };
        const obstacles: Obstacles = {
            placedLabels,
            points: pointObstacles,
            tickZones,
            segments: segmentsPx,
        };

        const scored = candidates.map((candidate) => ({
            candidate,
            score: scoreCandidate(
                candidate.rect,
                labelInfo,
                idealRect,
                obstacles,
                graphInfo,
            ),
        }));
        // Strictly better, so ties keep the earlier (more ideal) position.
        const bestCandidate = scored.reduce((best, entry) =>
            entry.score < best.score ? entry : best,
        ).candidate;

        placements.set(label.key, {
            cornerPx: [bestCandidate.rect.left, bestCandidate.rect.top],
        });
        placedLabels.push({rect: bestCandidate.rect, size: label.size});
    }

    return placements;
}
