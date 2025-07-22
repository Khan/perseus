import type {InteractiveGraphAction} from "./reducer/interactive-graph-action";
import type {Coord} from "../../interactive2/types";
import type {WidgetProps} from "../../types";
import type {QuadraticCoords} from "@khanacademy/kmath";
import type {
    PerseusInteractiveGraphUserInput,
    PerseusInteractiveGraphWidgetOptions,
    ShowAxisArrows,
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
    // TODO(benchristel): add actionBar controls here
};

export type InteractiveGraphState =
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
    | SinusoidGraphState;

export type UnlimitedGraphState = PointGraphState | PolygonGraphState;

export interface InteractiveGraphStateCommon {
    hasBeenInteractedWith: boolean;
    // range = [[xMin, xMax], [yMin, yMax]] in Cartesian units
    range: [xRange: Interval, yRange: Interval];
    showAxisArrows: ShowAxisArrows;
    // snapStep = [xStep, yStep] in Cartesian units
    snapStep: vec.Vector2;
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

export interface AngleGraphState extends InteractiveGraphStateCommon {
    type: "angle";
    // Whether to show the angle measurements.  default: false
    showAngles?: boolean;
    // Allow Reflex Angles if an "angle" type.  default: false
    allowReflexAngles?: boolean;
    // The angle offset in degrees if an "angle" type. default: 0
    angleOffsetDeg?: number;
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
