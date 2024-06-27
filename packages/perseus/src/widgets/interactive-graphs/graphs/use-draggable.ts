import {useMovable} from "mafs";

import type {vec} from "mafs";
import type {RefObject} from "react";

type Params = {
    gestureTarget: RefObject<Element>;
    onMove: (point: vec.Vector2) => unknown;
    point: vec.Vector2;
    constrain: (point: vec.Vector2) => vec.Vector2;
};

type DragState = {
    dragging: boolean;
};

export function useDraggable(params: Params): DragState {
    return useMovable(params);
}
