import type {InteractiveGraphAction} from "./reducer/interactive-graph-action";
import type {
    PerseusGraphType,
    PerseusInteractiveGraphWidgetOptions,
} from "../../perseus-types";
import type {WidgetProps} from "../../types";
import type {Coord} from "@khanacademy/perseus";
import type {Interval, vec} from "mafs";

export type InteractiveGraphProps = WidgetProps<
    PerseusInteractiveGraphWidgetOptions,
    PerseusInteractiveGraphWidgetOptions
>;

export type MafsGraphProps<T extends InteractiveGraphState> = {
    graphState: T;
    dispatch: (action: InteractiveGraphAction) => unknown;
};

export interface InitializeGraphStateParams<T extends PerseusGraphType> {
    graph: T;
    range: [Interval, Interval];
    step: vec.Vector2;
}

export type InteractiveGraphState =
    | SegmentGraphState
    | LinearGraphState
    | RayGraphState
    | PolygonGraphState
    | PointGraphState
    | CircleGraphState;

export interface InteractiveGraphStateCommon {
    hasBeenInteractedWith: boolean;
    // range = [[xMin, xMax], [yMin, yMax]] in Cartesian units
    range: [Interval, Interval];
    // snapStep = [xStep, yStep] in Cartesian units
    snapStep: vec.Vector2;
}

export interface SegmentGraphState extends InteractiveGraphStateCommon {
    type: "segment";
    coords: PairOfPoints[];
}

export interface LinearGraphState extends InteractiveGraphStateCommon {
    type: "linear" | "linear-system";
    coords: PairOfPoints[];
}

export interface PointGraphState extends InteractiveGraphStateCommon {
    type: "point";
    coords: Coord[];
}

export interface RayGraphState extends InteractiveGraphStateCommon {
    type: "ray";
    coords: PairOfPoints[];
}

export interface PolygonGraphState extends InteractiveGraphStateCommon {
    type: "polygon";
    showAngles: boolean;
    showSides: boolean;
    coords: Coord[];
}

export interface CircleGraphState extends InteractiveGraphStateCommon {
    type: "circle";
    center: Coord;
    radius: number;
}

export type PairOfPoints = [Coord, Coord];
