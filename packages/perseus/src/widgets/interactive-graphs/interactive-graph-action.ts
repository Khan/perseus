import type {vec} from "mafs";

export type InteractiveGraphAction = MoveControlPoint;

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

type Point = vec.Vector2;
