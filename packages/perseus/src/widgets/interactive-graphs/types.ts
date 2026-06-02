import type {InteractiveGraphAction} from "./reducer/interactive-graph-action";
import type {Coord} from "../../interactive2/types";
import type {WidgetProps} from "../../types";
import type {QuadraticCoords} from "@khanacademy/kmath";
import type {
    PerseusInteractiveGraphUserInput,
    PerseusInteractiveGraphWidgetOptions,
} from "@khanacademy/perseus-core";
import type {Interval, vec} from "mafs";
import type {ReactNode} from "react";

export type InteractiveGraphProps = WidgetProps<
    PerseusInteractiveGraphWidgetOptions,
    PerseusInteractiveGraphUserInput
>;

export type Dispatch = (action: InteractiveGraphAction) => unknown;

export type MafsGraphProps<T extends InteractiveGraphState> = {
    graphState: T;
    dispatch: Dispatch;
};

// InteractiveGraphElementSuite contains parts of the graph UI which need to
// end up in different sections of the DOM.
export type InteractiveGraphElementSuite = {
    graph: ReactNode;
    interactiveElementsDescription: ReactNode;
};

export type InteractiveGraphState =
    | AbsoluteValueGraphState
    | AngleGraphState
    | SegmentGraphState
    | LinearSystemGraphState
    | LinearGraphState
    | RayGraphState
    | NoneGraphState
    | PolygonGraphState
    | PointGraphState
    | CircleGraphState
    | QuadraticGraphState
    | SinusoidGraphState
    | ExponentialGraphState
    | TangentGraphState
    | LogarithmGraphState
    | VectorGraphState;

export type UnlimitedGraphState = PointGraphState | PolygonGraphState;

type MovePointAnnouncement = {
    type: "move-point";
    pointLabel: string;
    x: number;
    y: number;
};

type MoveRadiusPointAnnouncement = {
    type: "move-radius-point";
    x: number;
    y: number;
    centerX: number;
    radius: number;
};

type MoveCenterAnnouncement = {
    type: "move-center";
    x: number;
    y: number;
};

// Sinusoid graph: peak (index 1) reads as max/min/flat depending on
// its y vs the root's y. We pass otherY so the screen reader text can
// pick the right label without recomputing it from the reducer.
type MoveSinusoidPointAnnouncement = {
    type: "move-sinusoid-point";
    pointIndex: number;
    pointLabel: string | number;
    x: number;
    y: number;
    otherY: number;
};

// Whole-polygon keyboard drag (doMoveAll). Carries every vertex so the
// announcement can list each point's new coordinates, plus any author-supplied
// custom labels so each vertex is announced by its label when one is set.
type MovePolygonAnnouncement = {
    type: "move-polygon";
    coords: ReadonlyArray<Coord>;
    pointLabels?: ReadonlyArray<string>;
};

export type InteractiveGraphStateAnnouncement =
    | MovePointAnnouncement
    | MoveRadiusPointAnnouncement
    | MoveCenterAnnouncement
    | MoveSinusoidPointAnnouncement
    | MovePolygonAnnouncement;

export interface InteractiveGraphStateCommon {
    hasBeenInteractedWith: boolean;
    // Custom screen-reader labels for each interactive point. When present,
    // pointLabels[i] replaces the default numeric "Point {i+1}" announcement.
    pointLabels?: string[];
    // range = [[xMin, xMax], [yMin, yMax]] in Cartesian units
    range: [xRange: Interval, yRange: Interval];
    // snapStep = [xStep, yStep] in Cartesian units
    snapStep: vec.Vector2;
    // Raw data describing the most recent state change, used to build
    // screen reader announcements in the component. Absent means no announcement.
    stateAnnouncement?: InteractiveGraphStateAnnouncement;
}

export interface SegmentGraphState extends InteractiveGraphStateCommon {
    type: "segment";
    coords: PairOfPoints[];
}

export interface LinearGraphState extends InteractiveGraphStateCommon {
    type: "linear";
    coords: PairOfPoints;
}

export interface LinearSystemGraphState extends InteractiveGraphStateCommon {
    type: "linear-system";
    coords: PairOfPoints[];
}

export type InteractionMode = "mouse" | "keyboard";

export interface NoneGraphState extends InteractiveGraphStateCommon {
    type: "none";
}

export interface PointGraphState extends InteractiveGraphStateCommon {
    type: "point";
    coords: Coord[];
    numPoints?: number | "unlimited";
    focusedPointIndex: number | null;
    showRemovePointButton: boolean;
    interactionMode: InteractionMode;
    showKeyboardInteractionInvitation: boolean;
}

export interface RayGraphState extends InteractiveGraphStateCommon {
    type: "ray";
    coords: PairOfPoints;
}

export interface VectorGraphState extends InteractiveGraphStateCommon {
    type: "vector";
    coords: PairOfPoints;
}

export interface PolygonGraphState extends InteractiveGraphStateCommon {
    type: "polygon";
    showAngles: boolean;
    showSides: boolean;
    snapTo: SnapTo;
    coords: Coord[];
    numSides?: number | "unlimited";
    focusedPointIndex: number | null;
    showRemovePointButton: boolean;
    interactionMode: InteractionMode;
    showKeyboardInteractionInvitation: boolean;
    closedPolygon: boolean;
}

export interface CircleGraphState extends InteractiveGraphStateCommon {
    type: "circle";
    center: Coord;
    radiusPoint: Coord;
}

export interface QuadraticGraphState extends InteractiveGraphStateCommon {
    type: "quadratic";
    coords: QuadraticCoords;
}

export interface SinusoidGraphState extends InteractiveGraphStateCommon {
    type: "sinusoid";
    coords: [vec.Vector2, vec.Vector2];
}

export interface ExponentialGraphState extends InteractiveGraphStateCommon {
    type: "exponential";
    coords: [vec.Vector2, vec.Vector2];
    /** The y-value of the horizontal asymptote (y = asymptote). */
    asymptote: number;
}

export interface AbsoluteValueGraphState extends InteractiveGraphStateCommon {
    type: "absolute-value";
    coords: [vec.Vector2, vec.Vector2];
}

export interface TangentGraphState extends InteractiveGraphStateCommon {
    type: "tangent";
    coords: [vec.Vector2, vec.Vector2];
}

export interface LogarithmGraphState extends InteractiveGraphStateCommon {
    type: "logarithm";
    coords: [vec.Vector2, vec.Vector2];
    /** The x-value of the vertical asymptote (x = asymptote). */
    asymptote: number;
}

export interface AngleGraphState extends InteractiveGraphStateCommon {
    type: "angle";
    // Whether to show the angle measurements.  default: false
    showAngles?: boolean;
    // Allow Reflex Angles if an "angle" type.  default: false
    allowReflexAngles?: boolean;
    // The angle offset in degrees if an "angle" type. default: 0
    angleOffsetDeg?: number | null;
    // Snap to degree increments if an "angle" type. default: 1
    snapDegrees?: number;
    // must have 3 coords - ie [Coord, Coord, Coord]
    coords: [Coord, Coord, Coord];
}

export type PairOfPoints = [Coord, Coord];

export type GraphDimensions = {
    range: [Interval, Interval];
    width: number; // pixels
    height: number; // pixels
};

export type AriaLive = "off" | "assertive" | "polite" | undefined;

export type SnapTo = "grid" | "angles" | "sides";
