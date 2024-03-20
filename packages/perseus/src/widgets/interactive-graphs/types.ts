import type {InteractiveGraphAction} from "./reducer/interactive-graph-action";
import type {
    CollinearTuple,
    PerseusGraphType,
    PerseusGraphTypeLinearSystem,
    PerseusGraphTypePolygon,
    PerseusGraphTypeRay,
    PerseusGraphTypeSegment,
    PerseusInteractiveGraphWidgetOptions,
} from "../../perseus-types";
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

export interface InitializeGraphStateParams<T extends PerseusGraphType> {
    graph: T;
    range: [Interval, Interval];
    step: vec.Vector2;
}

export type InteractiveGraphState =
    | SegmentGraphState
    | LinearGraphState
    | RayGraphState
    | PolygonGraphState;

export interface InteractiveGraphStateCommon {
    hasBeenInteractedWith: boolean;
    // range = [[xMin, xMax], [yMin, yMax]] in Cartesian units
    range: [Interval, Interval];
    // snapStep = [xStep, yStep] in Cartesian units
    snapStep: vec.Vector2;
}

export type SegmentGraphState = InteractiveGraphStateCommon &
    Omit<PerseusGraphTypeSegment, "numSegments">;

export type LinearGraphState = InteractiveGraphStateCommon &
    Omit<PerseusGraphTypeLinearSystem, "type"> & {
        type: "linear" | "linear-system";
    };

export type RayGraphState = InteractiveGraphStateCommon &
    Omit<PerseusGraphTypeRay, "coords"> & {
        coords: readonly CollinearTuple[];
    };

export type PolygonGraphState = InteractiveGraphStateCommon &
    PerseusGraphTypePolygon;
