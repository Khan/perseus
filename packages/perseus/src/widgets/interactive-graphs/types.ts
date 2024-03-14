import type {InteractiveGraphAction} from "./interactive-graph-action";
import type {
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

export type Segment = [vec.Vector2, vec.Vector2];

export type InteractiveGraphState = SegmentGraphState;

export interface InteractiveGraphStateCommon {
    hasBeenInteractedWith: boolean;
    // range = [[xMin, xMax], [yMin, yMax]] in Cartesian units
    range: [Interval, Interval];
    // snapStep = [xStep, yStep] in Cartesian units
    snapStep: vec.Vector2;
}

export type SegmentGraphState = InteractiveGraphStateCommon &
    Pick<PerseusGraphTypeSegment, "type"> & {
        segments: PerseusGraphTypeSegment["coords"];
    };
