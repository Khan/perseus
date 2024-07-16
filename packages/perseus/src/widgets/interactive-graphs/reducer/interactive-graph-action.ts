import type {InitializeGraphStateParams} from "./initialize-graph-state";
import type {Interval, vec} from "mafs";

export type InteractiveGraphAction =
    | Reinitialize
    | MovePointInFigure
    | MoveLine
    | MoveAll
    | MovePoint
    | MoveCenter
    | MoveRadiusPoint
    | ChangeSnapStep
    | ChangeRange;

export const actions = {
    angle: {
        movePoint,
    },
    circle: {
        moveCenter,
        moveRadiusPoint,
    },
    linear: {
        moveLine: (delta: vec.Vector2) => moveLine(0, delta),
        movePoint: (pointIndex, destination) =>
            movePointInFigure(0, pointIndex, destination),
    },
    linearSystem: {
        moveLine,
        movePointInFigure,
    },
    pointGraph: {
        movePoint,
    },
    polygon: {
        movePoint,
        moveAll,
    },
    quadratic: {
        movePoint,
    },
    ray: {
        moveRay: (delta: vec.Vector2) => moveLine(0, delta),
        movePoint: (pointIndex, destination) =>
            movePointInFigure(0, pointIndex, destination),
    },
    segment: {
        movePointInFigure,
        moveLine,
    },
    sinusoid: {
        movePoint,
    },
};

export const MOVE_LINE = "move-line";
export interface MoveLine {
    type: typeof MOVE_LINE;
    itemIndex: number;
    delta: vec.Vector2;
}
function moveLine(itemIndex: number, delta: vec.Vector2): MoveLine {
    return {
        type: MOVE_LINE,
        itemIndex,
        delta,
    };
}

export const MOVE_ALL = "move-all";
export interface MoveAll {
    type: typeof MOVE_ALL;
    delta: vec.Vector2;
}
function moveAll(delta: vec.Vector2): MoveAll {
    return {
        type: MOVE_ALL,
        delta,
    };
}

export const MOVE_POINT = "move-point";
export interface MovePoint {
    type: typeof MOVE_POINT;
    index: number;
    destination: vec.Vector2;
}
function movePoint(index: number, destination: vec.Vector2): MovePoint {
    return {
        type: MOVE_POINT,
        index,
        destination,
    };
}

export const MOVE_POINT_IN_FIGURE = "move-point-in-figure";
export interface MovePointInFigure {
    type: typeof MOVE_POINT_IN_FIGURE;
    figureIndex: number;
    pointIndex: number;
    destination: vec.Vector2;
}
function movePointInFigure(
    figureIndex: number,
    pointIndex: number,
    destination: vec.Vector2,
): MovePointInFigure {
    return {
        type: MOVE_POINT_IN_FIGURE,
        figureIndex,
        pointIndex,
        destination,
    };
}

export const MOVE_CENTER = "move-center";
export interface MoveCenter {
    type: typeof MOVE_CENTER;
    destination: vec.Vector2;
}
function moveCenter(destination: vec.Vector2): MoveCenter {
    return {
        type: MOVE_CENTER,
        destination,
    };
}

export const MOVE_RADIUS_POINT = "MOVE_RADIUS_POINT";
export interface MoveRadiusPoint {
    type: typeof MOVE_RADIUS_POINT;
    destination: vec.Vector2;
}
function moveRadiusPoint(destination: vec.Vector2): MoveRadiusPoint {
    return {
        type: MOVE_RADIUS_POINT,
        destination,
    };
}

export const CHANGE_SNAP_STEP = "change-snap-step";
export interface ChangeSnapStep {
    type: typeof CHANGE_SNAP_STEP;
    snapStep: [x: number, y: number];
}
export function changeSnapStep(
    snapStep: [x: number, y: number],
): ChangeSnapStep {
    return {
        type: CHANGE_SNAP_STEP,
        snapStep,
    };
}

export const CHANGE_RANGE = "change-range";
export interface ChangeRange {
    type: typeof CHANGE_RANGE;
    range: [x: Interval, y: Interval];
}
export function changeRange(range: [x: Interval, y: Interval]): ChangeRange {
    return {
        type: CHANGE_RANGE,
        range,
    };
}

export const REINITIALIZE = "reinitialize";
export interface Reinitialize {
    type: typeof REINITIALIZE;
    params: InitializeGraphStateParams;
}
export function reinitialize(params: InitializeGraphStateParams): Reinitialize {
    return {
        type: REINITIALIZE,
        params,
    };
}
