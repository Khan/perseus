import type {vec} from "mafs";

// FIXME: this type can probably be removed after the current refactoring
export interface InteractiveLineProps {
    points: Readonly<[vec.Vector2, vec.Vector2]>;
    onMovePoint: (endpointIndex: number, destination: vec.Vector2) => unknown;
    onMoveLine: (delta: vec.Vector2) => unknown;
}
