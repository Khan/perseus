import {vec} from "mafs";

export type ActionV2 = MoveControlPoint;

export const MOVE_CONTROL_POINT = "move-control-point";
export interface MoveControlPoint {
    type: typeof MOVE_CONTROL_POINT;
    objectIndex: number;
    pointIndex: number;
    destination: vec.Vector2;
}
export function moveControlPoint(
    pointIndex: number,
    destination: vec.Vector2,
    objectIndex: number,
): MoveControlPoint {
    return {
        type: MOVE_CONTROL_POINT,
        objectIndex,
        pointIndex,
        destination,
    };
}
