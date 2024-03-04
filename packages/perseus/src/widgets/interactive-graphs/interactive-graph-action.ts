import type {vec} from "mafs";

export type InteractiveGraphAction = MoveControlPoint | MoveSegment;

export const MOVE_CONTROL_POINT = "move-control-point";
export interface MoveControlPoint {
    type: typeof MOVE_CONTROL_POINT;
    objectIndex: number;
    pointIndex: number;
    destination: Point;
}
export function moveControlPoint(
    objectIndex: number,
    pointIndex: number,
    destination: Point,
): MoveControlPoint {
    return {
        type: MOVE_CONTROL_POINT,
        objectIndex,
        pointIndex,
        destination,
    };
}

export const MOVE_SEGMENT = "move-segment";
export interface MoveSegment {
    type: typeof MOVE_SEGMENT;
    segmentIndex: number;
    delta: vec.Vector2;
}
export function moveSegment(
    segmentIndex: number,
    delta: vec.Vector2,
): MoveSegment {
    return {
        type: MOVE_SEGMENT,
        segmentIndex,
        delta,
    };
}

type Point = vec.Vector2;
