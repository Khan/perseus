import {vector as kvector} from "@khanacademy/kmath";
import {UnreachableCaseError} from "@khanacademy/wonder-stuff-core";
import {vec} from "mafs";

import type {InteractiveGraphAction} from "./interactive-graph-action";
import type {
    InteractiveGraphState,
    Point,
    Segment,
} from "./interactive-graph-state";

export function interactiveGraphReducer(
    state: Readonly<InteractiveGraphState>,
    action: InteractiveGraphAction,
): InteractiveGraphState {
    switch (action.type) {
        case "move-control-point": {
            const newSegments = updateAtIndex(
                state.segments,
                action.objectIndex,
                (segment) =>
                    setAtIndex(
                        segment,
                        action.pointIndex,
                        snap(state, bound(state, action.destination)),
                    ),
            );
            if (!validSegments(newSegments)) {
                return state;
            }
            return {
                ...state,
                hasBeenInteractedWith: true,
                segments: newSegments,
            };
        }
        case "move-segment": {
            const oldSegment = state.segments[action.segmentIndex];
            const maxMoves = oldSegment.map((point) => maxMove(state, point));
            const minMoves = oldSegment.map((point) => minMove(state, point));
            const maxXMove = Math.min(...maxMoves.map((move) => move[0]));
            const maxYMove = Math.min(...maxMoves.map((move) => move[1]));
            const minXMove = Math.max(...minMoves.map((move) => move[0]));
            const minYMove = Math.max(...minMoves.map((move) => move[1]));
            const dx = clamp(action.delta[0], minXMove, maxXMove);
            const dy = clamp(action.delta[1], minYMove, maxYMove);
            const newSegment = oldSegment.map((point) =>
                snap(state, kvector.add(point, [dx, dy])),
            ) as Segment;

            const newSegments = setAtIndex(
                state.segments,
                action.segmentIndex,
                newSegment,
            );

            return {...state, segments: newSegments};
        }
        default:
            throw new UnreachableCaseError(action);
    }
}

function snap(state: Readonly<InteractiveGraphState>, point: Point): Point {
    const [requestedX, requestedY] = point;
    const [snapX, snapY] = state.snapStep;
    return [
        Math.round(requestedX / snapX) * snapX,
        Math.round(requestedY / snapY) * snapY,
    ];
}

// Returns the closest point to the given `point` that is within the graph
// bounds given in `state`.
function bound(state: Readonly<InteractiveGraphState>, point: Point): Point {
    const [requestedX, requestedY] = point;
    const [snapX, snapY] = state.snapStep;
    const [[minX, maxX], [minY, maxY]] = state.range;
    return [
        clamp(requestedX, minX + snapX, maxX - snapX),
        clamp(requestedY, minY + snapY, maxY - snapY),
    ];
}

// Returns the vector from the given point to the top-right corner of the graph
function maxMove(
    state: Readonly<InteractiveGraphState>,
    point: Point,
): vec.Vector2 {
    const topRight = bound(state, [Infinity, Infinity]);
    return vec.sub(topRight, point);
}

// Returns the vector from the given point to the bottom-left corner of the
// graph
function minMove(
    state: Readonly<InteractiveGraphState>,
    point: Point,
): vec.Vector2 {
    const bottomLeft = bound(state, [-Infinity, -Infinity]);
    return vec.sub(bottomLeft, point);
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
    return segments.every(([start, end]) => !kvector.equal(start, end));
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
