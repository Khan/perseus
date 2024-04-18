import type {vec} from "mafs";

export interface InteractiveLineProps {
    points: Readonly<[vec.Vector2, vec.Vector2]>;
    onMovePoint: (endpointIndex: number, destination: vec.Vector2) => unknown;
    onMoveLine: (delta: vec.Vector2) => unknown;
}
