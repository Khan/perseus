import type {GraphObject, Segment} from "./types";

export function isSegment(obj: GraphObject): obj is Segment {
    return obj.type === "segment";
}
