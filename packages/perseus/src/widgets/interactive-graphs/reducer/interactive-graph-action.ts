import type {vec} from "mafs";

export type InteractiveGraphAction = MoveControlPoint | MoveSegment;

export const MOVE_CONTROL_POINT = "move-control-point";
export interface MoveControlPointForLine {
    type: typeof MOVE_CONTROL_POINT;
    /* Only necessary if there is an array of objects that contain points, such as collinear tuples (segments, lines). */
    objectIndex?: number;
    pointIndex: number;
    destination: vec.Vector2;
}
export interface MoveControlPoint {
    type: typeof MOVE_CONTROL_POINT;
    /* Only necessary if there is an array of objects that contain points, such as collinear tuples (segments, lines). */
    objectIndex?: number;
    pointIndex: number;
    destination: vec.Vector2;
}
export function moveControlPoint(
    pointIndex: number,
    destination: vec.Vector2,
    objectIndex?: number,
): MoveControlPoint {
    return {
        type: MOVE_CONTROL_POINT,
        objectIndex,
        pointIndex,
        destination,
    };
}

export const MOVE_LINE = "move-line";
export interface MoveSegment {
    type: typeof MOVE_LINE;
    lineIndex: number;
    delta: vec.Vector2;
}
export function moveSegment(
    lineIndex: number,
    delta: vec.Vector2,
): MoveSegment {
    return {
        type: MOVE_LINE,
        lineIndex,
        delta,
    };
}
