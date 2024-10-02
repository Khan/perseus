import type {InteractiveGraphAction} from "./reducer/interactive-graph-action";
import type {Coord} from "../../interactive2/types";
import type {PerseusInteractiveGraphWidgetOptions} from "../../perseus-types";
import type {WidgetProps} from "../../types";
import type {Interval, vec} from "mafs";

export type InteractiveGraphProps = WidgetProps<
    PerseusInteractiveGraphWidgetOptions,
    PerseusInteractiveGraphWidgetOptions
>;

export type MafsGraphProps<T extends InteractiveGraphState> = {
    graphState: T;
    dispatch: (action: InteractiveGraphAction) => unknown;
};

export type InteractiveGraphName =
    | "angle"
    | "segment"
    | "linear-system"
    | "linear"
    | "ray"
    | "none"
    | "polygon"
    | "point"
    | "circle"
    | "quadratic"
    | "sinusoid";

export type InteractiveGraphEnum =
    | "ANGLE"
    | "SEGMENT"
    | "LINEAR_SYSTEM"
    | "LINEAR"
    | "RAY"
    | "NONE"
    | "POLYGON"
    | "POINT"
    | "CIRCLE"
    | "QUADRATIC"
    | "SINUSOID";

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

const interactiveGraphNameToEnum: Record<
    InteractiveGraphName,
    InteractiveGraphEnum
> = {
    angle: "ANGLE",
    segment: "SEGMENT",
    "linear-system": "LINEAR_SYSTEM",
    linear: "LINEAR",
    ray: "RAY",
    none: "NONE",
    polygon: "POLYGON",
    point: "POINT",
    circle: "CIRCLE",
    quadratic: "QUADRATIC",
    sinusoid: "SINUSOID",
};

export function convertInteractiveGraphNameToEnum(
    name: string,
): InteractiveGraphEnum {
    const graphEnum = interactiveGraphNameToEnum[name];

    if (!graphEnum) {
        throw new Error(`Unknown interactive graph name: ${name}`);
    }

    return graphEnum;
}

export interface InteractiveGraphStateCommon {
    hasBeenInteractedWith: boolean;
    // range = [[xMin, xMax], [yMin, yMax]] in Cartesian units
    range: [xRange: Interval, yRange: Interval];
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
    snapTo: "grid" | "angles" | "sides";
    coords: Coord[];
}

export interface CircleGraphState extends InteractiveGraphStateCommon {
    type: "circle";
    center: Coord;
    radiusPoint: Coord;
}

export interface QuadraticGraphState extends InteractiveGraphStateCommon {
    type: "quadratic";
    coords: [Coord, Coord, Coord];
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
