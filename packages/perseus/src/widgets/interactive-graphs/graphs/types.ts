import type {CollinearTuple} from "../../../perseus-types";
import type {vec} from "mafs";

export interface InteractiveLineProps {
    collinearPair: Readonly<CollinearTuple>;
    snaps: [number, number];
    range: [[number, number], [number, number]];
    onMovePoint: (endpointIndex: number, destination: vec.Vector2) => unknown;
    onMoveLine: (delta: vec.Vector2) => unknown;
}
