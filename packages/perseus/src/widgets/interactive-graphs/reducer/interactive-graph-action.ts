import type {Props as MafsGraphProps} from "../mafs-graph";
import type {vec} from "mafs";

export type InteractiveGraphAction =
    | MajorGraphChange
    | MoveControlPoint
    | MoveLine
    | MoveAll
    | MovePoint
    | ChangeSnapStep
    | ChangeRange;

export const MOVE_CONTROL_POINT = "move-control-point";
export interface MoveControlPoint {
    type: typeof MOVE_CONTROL_POINT;
    itemIndex: number;
    pointIndex: number;
    destination: vec.Vector2;
}
export function moveControlPoint(
    pointIndex: number,
    destination: vec.Vector2,
    itemIndex: number,
): MoveControlPoint {
    return {
        type: MOVE_CONTROL_POINT,
        itemIndex,
        pointIndex,
        destination,
    };
}

export const MOVE_ALL = "move-all";
export const MOVE_LINE = "move-line";
interface MoveItem {
    delta: vec.Vector2;
    itemIndex?: number;
}
export interface MoveLine extends MoveItem {
    type: typeof MOVE_LINE;
}
export interface MoveAll extends MoveItem {
    type: typeof MOVE_ALL;
}
/** This action assumes the state.coords holds an array of collinear tuples that define lines */
export function moveLine(itemIndex: number, delta: vec.Vector2): MoveLine {
    return {
        type: MOVE_LINE,
        itemIndex,
        delta,
    };
}
/** This action assumes a flat array of vectors */
export const moveAll = (delta: vec.Vector2): MoveAll => ({
    type: MOVE_ALL,
    delta,
});

export const MOVE_POINT = "move-point";
export interface MovePoint {
    type: typeof MOVE_POINT;
    index: number;
    destination: vec.Vector2;
}
export function movePoint(index: number, destination: vec.Vector2): MovePoint {
    return {
        type: MOVE_POINT,
        index,
        destination,
    };
}

export const MAJOR_GRAPH_CHANGE = "MAJOR_GRAPH_CHANGE";
export interface MajorGraphChange {
    type: typeof MAJOR_GRAPH_CHANGE;
    props: MafsGraphProps;
}
export function majorGraphChange(props: MafsGraphProps): MajorGraphChange {
    return {
        type: MAJOR_GRAPH_CHANGE,
        props,
    };
}

export const CHANGE_SNAP_STEP = "change-snap-step";
export interface ChangeSnapStep {
    type: typeof CHANGE_SNAP_STEP;
    snapStep: MafsGraphProps["snapStep"];
}
export function changeSnapStep(
    snapStep: MafsGraphProps["snapStep"],
): ChangeSnapStep {
    return {
        type: CHANGE_SNAP_STEP,
        snapStep,
    };
}

export const CHANGE_RANGE = "change-range";
export interface ChangeRange {
    type: typeof CHANGE_RANGE;
    range: MafsGraphProps["range"];
}
export function changeRange(range: MafsGraphProps["range"]): ChangeRange {
    return {
        type: CHANGE_RANGE,
        range,
    };
}
