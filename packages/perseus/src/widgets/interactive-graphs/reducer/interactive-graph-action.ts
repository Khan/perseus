import type {InitializeGraphStateParams} from "./initialize-graph-state";
import type {InteractionMode} from "../types";
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
    | ChangeRange
    | AddPoint
    | RemovePoint
    | FocusPoint
    | BlurPoint
    | DeleteIntent
    | ClickPoint
    | ClosePolygon
    | OpenPolygon
    | ChangeInteractionMode
    | ChangeKeyboardInvitationVisibility;

export const actions = {
    global: {
        deleteIntent,
        changeInteractionMode,
        changeKeyboardInvitationVisibility,
    },
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
        addPoint,
        removePoint,
        focusPoint,
        blurPoint,
        clickPoint,
    },
    polygon: {
        movePoint,
        moveAll,
        addPoint,
        removePoint,
        focusPoint,
        blurPoint,
        clickPoint,
        closePolygon,
        openPolygon,
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

export const DELETE_INTENT = "delete-intent";
export interface DeleteIntent {
    type: typeof DELETE_INTENT;
}
function deleteIntent(): DeleteIntent {
    return {
        type: DELETE_INTENT,
    };
}

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

export const ADD_POINT = "add-point";
export interface AddPoint {
    type: typeof ADD_POINT;
    location: vec.Vector2;
}
function addPoint(location: vec.Vector2): AddPoint {
    return {
        type: ADD_POINT,
        location,
    };
}

export const REMOVE_POINT = "remove-point";
export interface RemovePoint {
    type: typeof REMOVE_POINT;
    index: number;
}
function removePoint(index: number): RemovePoint {
    return {
        type: REMOVE_POINT,
        index,
    };
}

export const FOCUS_POINT = "focus-point";
export interface FocusPoint {
    type: typeof FOCUS_POINT;
    index: number;
}
function focusPoint(index: number): FocusPoint {
    return {
        type: FOCUS_POINT,
        index,
    };
}

export const BLUR_POINT = "blur-point";
export interface BlurPoint {
    type: typeof BLUR_POINT;
}
function blurPoint(): BlurPoint {
    return {
        type: BLUR_POINT,
    };
}

export const CLICK_POINT = "click-point";

export interface ClickPoint {
    type: typeof CLICK_POINT;
    index: number;
}
function clickPoint(index: number): ClickPoint {
    return {
        type: CLICK_POINT,
        index,
    };
}

export const CHANGE_INTERACTION_MODE = "point-change-interaction-mode";

export interface ChangeInteractionMode {
    type: typeof CHANGE_INTERACTION_MODE;
    mode: InteractionMode;
}
function changeInteractionMode(mode: InteractionMode): ChangeInteractionMode {
    return {
        type: CHANGE_INTERACTION_MODE,
        mode,
    };
}

export const CHANGE_KEYBOARD_INVITATION_VISIBILITY =
    "change-keyboard-interaction-invitation-visibility";

export interface ChangeKeyboardInvitationVisibility {
    type: typeof CHANGE_KEYBOARD_INVITATION_VISIBILITY;
    shouldShow: boolean;
}
function changeKeyboardInvitationVisibility(
    shouldShow: boolean,
): ChangeKeyboardInvitationVisibility {
    return {
        type: CHANGE_KEYBOARD_INVITATION_VISIBILITY,
        shouldShow,
    };
}

export const CLOSE_POLYGON = "close-polygon";
interface ClosePolygon {
    type: typeof CLOSE_POLYGON;
}
function closePolygon(): ClosePolygon {
    return {
        type: CLOSE_POLYGON,
    };
}

export const OPEN_POLYGON = "open-polygon";
interface OpenPolygon {
    type: typeof OPEN_POLYGON;
}
function openPolygon(): OpenPolygon {
    return {
        type: OPEN_POLYGON,
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
interface Reinitialize {
    type: typeof REINITIALIZE;
    params: InitializeGraphStateParams;
}
export function reinitialize(params: InitializeGraphStateParams): Reinitialize {
    return {
        type: REINITIALIZE,
        params,
    };
}
