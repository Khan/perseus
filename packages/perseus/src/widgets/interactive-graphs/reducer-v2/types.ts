import {Interval, vec} from "mafs";

export interface InteractiveGraphStateV2 {
    hasBeenInteractedWith: boolean;
    // range = [[xMin, xMax], [yMin, yMax]] in Cartesian units
    range: [Interval, Interval];
    // snapStep = [xStep, yStep] in Cartesian units
    snapStep: vec.Vector2;
    objects: GraphObject[]
    // previously: coords: [vec.Vector2, vec.Vector2][]
}

export type GraphObject = Segment // Line | Point | Ray | Polygon

// TODO(benchristel): remove readonly from this type?
export type Segment = {type: "segment", points: [vec.Vector2, vec.Vector2]}

// type Line = {type: "line", points: [vec.Vector2, vec.Vector2]}
//
// type Point = {type: "point", coords: vec.Vector2}
//
// // TODO: naming - what are the parts of a ray?
// type Ray = {type: "ray", endpoint: vec.Vector2, extension: vec.Vector2}
//
// type Polygon = {type: "polygon", points: vec.Vector2[]}
//
// TODO: implement circle
// type Circle = {type: "circle", center: vec.Vector2, radius: number};
