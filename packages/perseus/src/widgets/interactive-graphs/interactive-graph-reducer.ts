import {vector as kvector} from "@khanacademy/kmath"
import type {InteractiveGraphAction} from "./interactive-graph-action";
import type {
    InteractiveGraphState,
    Point,
    Segment
} from "./interactive-graph-state";

export function interactiveGraphReducer(
    state: Readonly<InteractiveGraphState>,
    action: InteractiveGraphAction,
): InteractiveGraphState {
    const newSegments = updateAtIndex(state.segments, action.objectIndex, (segment) =>
        setAtIndex(segment, action.pointIndex, snap(bound(action.destination, state), state)),
    )
    if (!validSegments(newSegments)) {
        return state
    }
    return {
        ...state,
        hasBeenInteractedWith: true,
        segments: newSegments
    };
}

function snap(point: Point, state: Readonly<InteractiveGraphState>): Point {
    const [requestedX, requestedY] = point;
    const [snapX, snapY] = state.snapStep;
    return [
        Math.round(requestedX / snapX) * snapX,
        Math.round(requestedY / snapY) * snapY,
    ]
}

function bound(point: Point, state: Readonly<InteractiveGraphState>): Point {
    const [requestedX, requestedY] = point;
    const [snapX, snapY] = state.snapStep;
    const [[minX, maxX], [minY, maxY]] = state.range;
    return [clamp(requestedX, minX + snapX, maxX - snapX), clamp(requestedY, minY + snapY, maxY - snapY)]
}

function clamp(value: number, min: number, max: number) {
    if (value < min) {
        return min;
    }
    if (value > max) {
        return max;
    }
    return value;
}

function validSegments(segments: Segment[]): boolean {
    return segments.every(([start, end]) => !kvector.equal(start, end))
}

function updateAtIndex<A extends readonly any[]>(
    array: A,
    index: number,
    update: (elem: A[number]) => A[number],
): A {
    return setAtIndex(array, index, update(array[index]));
}

function setAtIndex<A extends readonly any[]>(
    array: A,
    index: number,
    newValue: A[number],
): A {
    const copy = [...array] as any;
    copy[index] = newValue;
    return copy;
}
