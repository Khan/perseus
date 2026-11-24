import type {GraphDimensions} from "../types";
import type {
    Coord,
    MarkingsType,
    ShowAxisTicks,
} from "@khanacademy/perseus-core";
import type {vec} from "mafs";

/**
 * A rectangle in pixel space, used for the label's own box and for the
 * keep-out zones around the axis tick labels.
 */
export type Rect = {
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

/** A label to place, and the point it belongs to. */
export type LabelPlacementItem = {
    /** Identifies this label in the returned map. */
    key: string;
    /** The owning point, in graph units. */
    anchorCoord: Coord;
    /** The rendered size, or an assumed one before measurement. */
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
export type Candidate = {
    rect: Rect;
};

/** A drawn line in pixel space, ready to measure against. */
export type PixelSegment = {
    a: [number, number];
    b: [number, number];
    strokeWidth: number;
    /** The obstacle this came from, so a label can recognise its own line. */
    owner?: SegmentObstacle;
};

/** The label being scored, reduced to what scoring reads. */
export type LabelInfo = {
    /** Identifies this label, so it can skip the point it names. */
    key: string;
    /** The rendered size, or an assumed one before measurement. */
    size: LabelSize;
    /**
     * The line this label belongs to, if any. Matched by reference against a
     * segment's `owner`, so this has to stay the caller's own object.
     */
    ownerSegment?: SegmentObstacle;
    /** The point this label names, in pixels. */
    anchorPx: [number, number];
};

/** A point that labels have to stay clear of. */
export type PointObstacle = {
    centerPx: [number, number];
    radiusPx: number;
    /** Which labels own this point, so each can skip its own. */
    ownerKeys: Set<string>;
};

/** Everything a candidate position has to avoid. */
export type Obstacles = {
    /** Labels already positioned, with the sizes that set their gaps. */
    placedLabels: ReadonlyArray<{rect: Rect; size: LabelSize}>;
    points: ReadonlyArray<PointObstacle>;
    tickZones: ReadonlyArray<Rect>;
    segments: ReadonlyArray<PixelSegment>;
};
