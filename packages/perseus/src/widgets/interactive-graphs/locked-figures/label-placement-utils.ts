import {pixelsToVectors, pointToPixel} from "../graphs/use-transform";
import {X, Y} from "../math";

import type {GraphDimensions} from "../types";
import type {
    Coord,
    LockedPointType,
    MarkingsType,
    ShowAxisTicks,
} from "@khanacademy/perseus-core";

/**
 * Gap, in pixels, between a point and its label. This is a visual distance
 * rather than a distance in graph units: a fixed number of graph units would
 * read as a different gap on every range and aspect ratio, whereas the label
 * should always sit about the same distance from its point on screen.
 */
const labelGapPx = 24;

/**
 * Fraction of the graph's width or height that counts as "near the edge".
 * Within this band the label flips to the other side of the point so it
 * doesn't get clipped by, or crowd, that edge of the graph.
 */
const edgeThreshold = 0.125;

/**
 * Whether a value sits within `edgeThreshold` of either end of its axis, and
 * which end. Near an edge the label is placed on the inward side of the point
 * so it isn't clipped by, or crowded against, that edge of the graph.
 */
function getEdgeProximity(
    value: number,
    min: number,
    max: number,
): "near-min" | "near-max" | "interior" {
    const edgeBand = (max - min) * edgeThreshold;

    const nearMax = value >= max - edgeBand;
    const nearMin = value <= min + edgeBand;

    // A range short enough for both bands to overlap has no good answer, so
    // treat the point as interior and leave the direction alone.
    if (nearMax && !nearMin) {
        return "near-max";
    }
    if (nearMin && !nearMax) {
        return "near-min";
    }
    return "interior";
}

/**
 * Offset, in pixels, from a point to where its label should sit.
 *
 * The label is placed along the conceptual line running from the graph's
 * visual center out through the point, so it reads as belonging to that point
 * and sits away from the middle of the graph. Vertical distance is held at
 * `labelGapPx` and the horizontal distance is sheared to land on that line,
 * rather than using a constant radius: a label needs vertical clearance to
 * avoid its point, and holding that constant keeps wide labels from colliding.
 *
 * As the line flattens the shear would grow without bound (and divide by zero
 * for a point level with the center), so directions shallower than 45 degrees
 * are clamped to the 45-degree diagonal. Horizontal offset therefore never
 * exceeds `labelGapPx` either.
 */
function getLabelOffsetInPixels(
    pointPx: [number, number],
    centerPx: [number, number],
): [number, number] {
    const dx = pointPx[X] - centerPx[X];
    // Pixel y grows downward while graph y grows upward, so negate to reason
    // about direction in the same orientation as the graph.
    const dy = -(pointPx[Y] - centerPx[Y]);

    // A point at the center has no direction to follow, and a point level with
    // the center is flatter than the 45-degree clamp. Both place the label on
    // the downward diagonal, matching where lower points go.
    if (dy === 0) {
        const horizontal = dx === 0 ? 0 : Math.sign(dx) * labelGapPx;
        return [horizontal, labelGapPx];
    }

    const verticalSign = Math.sign(dy);
    // Shear onto the line: how far sideways to travel while rising one
    // vertical gap. Clamped so the direction never falls below 45 degrees.
    const slope = dx / dy;
    const clampedSlope = Math.max(-1, Math.min(1, slope));

    return [
        clampedSlope * verticalSign * labelGapPx,
        // Negated back into pixel space, where y grows downward.
        -verticalSign * labelGapPx,
    ];
}

/**
 * Whether the graph is currently showing labelled ticks along the x-axis.
 * Those labels sit just below the axis, and locked labels have to stay clear
 * of them.
 *
 * Ticks only render when the markings include axes, and then only for the
 * axes `showAxisTicks` enables.
 */
function hasXAxisTickLabels(graphInfo: AutoLabelGraphInfo): boolean {
    const {markings, showAxisTicks} = graphInfo;
    const marksAxes = markings === "graph" || markings === "axes";
    return marksAxes && !!showAxisTicks?.x;
}

/**
 * Approximate height, in pixels, of a rendered label. Labels are small enough
 * that their height barely varies with size or content — unlike their width,
 * which depends on the typeset TeX — so a single estimate based on the medium
 * size is close enough to decide whether a label reaches the tick row.
 */
const estimatedLabelHeightPx = 20;

/**
 * The band of pixels, below the x-axis, occupied by its tick labels. Measured
 * from the axis itself down past the tick label's baseline, so a label
 * overlapping this range would collide with the numbers along the axis.
 *
 * These constants mirror `XGridTick` in `backgrounds/axis-ticks.tsx`, which
 * draws tick labels at `fontSize: 14`, offset `14 * 1.75` below the axis.
 */
const tickLabelFontSizePx = 14;
const tickLabelOffsetPx = tickLabelFontSizePx * 1.75;

/**
 * Whether a label centered at `labelCenterPx` would overlap the row of tick
 * labels running below the x-axis.
 *
 * Both the label and the tick row are treated as vertical spans; they collide
 * when those spans intersect. Only vertical extent is considered: the tick row
 * spans the whole width of the graph, so a label at any x overlaps it if it
 * reaches the right height.
 */
function overlapsXAxisTickLabels(
    labelCenterPy: number,
    axisPy: number,
): boolean {
    const labelTop = labelCenterPy - estimatedLabelHeightPx / 2;
    const labelBottom = labelCenterPy + estimatedLabelHeightPx / 2;

    // Pixel y grows downward, so the tick row runs from the axis downward.
    const tickTop = axisPy;
    const tickBottom = axisPy + tickLabelOffsetPx + tickLabelFontSizePx / 2;

    return labelBottom > tickTop && labelTop < tickBottom;
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
};

/**
 * Picks a coordinate for a point's label, placing it along the line from the
 * graph's visual center through the point, `labelGapPx` away vertically. When
 * the point is near an edge of the graph the offset is reversed, moving the
 * label inward along that same line.
 *
 * The row of tick labels below the x-axis is treated as an obstacle: when the
 * graph shows them and the label would land on that row, it is mirrored to the
 * other side of its point. This catches points sitting on the axis and points
 * near enough that the label reaches back across it, which happens often when
 * the range puts the graph's center far from the origin.
 *
 * The returned coordinate marks where the label's *center* should sit, so the
 * label element has to be centered on it (see `locked-label.module.css`).
 */
export function getAutoLabelCoordinates(
    lockedFigure: LockedPointType,
    graphInfo: AutoLabelGraphInfo,
): Coord {
    const coord = lockedFigure.coord;
    const [[xMin, xMax], [yMin, yMax]] = graphInfo.range;

    // Without a measured graph there's no meaningful pixel distance to offset
    // by; leave the label on its point until layout gives the graph a size.
    if (!graphInfo.width || !graphInfo.height) {
        return coord;
    }

    // The direction has to be worked out in pixel space: the graph isn't drawn
    // with a preserved aspect ratio, so the on-screen angle from the center
    // differs from the angle in graph units.
    const pointPx = pointToPixel(coord, graphInfo);
    // The graph's visual center, which is not the origin when the range isn't
    // centered on it (e.g. a range of [[0, 20], [0, 10]] puts the origin in a
    // corner). Labels should radiate out of the middle of the graph either
    // way, so measure direction from there.
    const centerPx: [number, number] = [
        graphInfo.width / 2,
        graphInfo.height / 2,
    ];

    let offsetPx = getLabelOffsetInPixels(pointPx, centerPx);

    // Near an edge the outward direction would push the label off the graph,
    // so reverse it and place the label inward along the same line.
    const nearEdge =
        getEdgeProximity(coord[X], xMin, xMax) !== "interior" ||
        getEdgeProximity(coord[Y], yMin, yMax) !== "interior";
    if (nearEdge) {
        offsetPx = [-offsetPx[X], -offsetPx[Y]];
    }

    // The label may land on the row of tick labels below the x-axis — either
    // because its point sits on the axis, or because the point is near enough
    // that the label reaches back across. Mirror it to the other side of the
    // point, but only when that actually clears the row: for a point inside
    // the row itself neither side is clear, so leave the original placement
    // rather than moving the label for nothing. This runs after the edge flip
    // so that staying clear of the ticks wins over moving inward.
    if (hasXAxisTickLabels(graphInfo)) {
        const axisPy = pointToPixel([0, 0], graphInfo)[Y];
        const labelPy = pointPx[Y] + offsetPx[Y];

        if (overlapsXAxisTickLabels(labelPy, axisPy)) {
            const mirroredPy = pointPx[Y] - offsetPx[Y];
            if (!overlapsXAxisTickLabels(mirroredPy, axisPy)) {
                offsetPx = [offsetPx[X], -offsetPx[Y]];
            }
        }
    }

    const labelPx: [number, number] = [
        pointPx[X] + offsetPx[X],
        pointPx[Y] + offsetPx[Y],
    ];

    return pixelsToVectors([labelPx], graphInfo)[0];
}
