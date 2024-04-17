import type {CollinearTuple} from "../../../perseus-types";
import type {Interval, vec} from "mafs";

export interface InteractiveLineProps {
    collinearPair: Readonly<CollinearTuple>;
    onMovePoint: (endpointIndex: number, destination: vec.Vector2) => unknown;
    onMoveLine: (delta: vec.Vector2) => unknown;
}
