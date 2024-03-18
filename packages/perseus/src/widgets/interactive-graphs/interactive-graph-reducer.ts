import {vector as kvector} from "@khanacademy/kmath";
import {UnreachableCaseError} from "@khanacademy/wonder-stuff-core";
import {vec} from "mafs";

import {
    MOVE_CONTROL_POINT,
    type InteractiveGraphAction,
    MOVE_LINE,
} from "./interactive-graph-action";

import type {InteractiveGraphState} from "./types";
import type {CollinearTuple} from "../../perseus-types";

export function interactiveGraphReducer(
    state: Readonly<InteractiveGraphState>,
    action: InteractiveGraphAction,
): InteractiveGraphState {
    switch (action.type) {
        case MOVE_CONTROL_POINT: {
            const newCoords = updateAtIndex({
                array: state.coords,
                index: action.objectIndex,
                update: (tuple) =>
                    setAtIndex({
                        array: tuple,
                        index: action.pointIndex,
                        newValue: snap(state, bound(state, action.destination)),
                    }),
            });
            if (!validSegments(newCoords)) {
                return state;
            }
            return {
                ...state,
                hasBeenInteractedWith: true,
                coords: newCoords,
            };
        }
        case MOVE_LINE: {
            const currentLine = state.coords?.[action.lineIndex];
            if (!currentLine) {
                throw new Error("No line to move");
            }
            const maxMoves = currentLine.map((point: vec.Vector2) =>
                maxMove(state, point),
            );
            const minMoves = currentLine.map((point: vec.Vector2) =>
                minMove(state, point),
            );
            const maxXMove = Math.min(...maxMoves.map((move) => move[0]));
            const maxYMove = Math.min(...maxMoves.map((move) => move[1]));
            const minXMove = Math.max(...minMoves.map((move) => move[0]));
            const minYMove = Math.max(...minMoves.map((move) => move[1]));
            const dx = clamp(action.delta[0], minXMove, maxXMove);
            const dy = clamp(action.delta[1], minYMove, maxYMove);

            const newValue: CollinearTuple = [
                snap(state, vec.add(currentLine[0], [dx, dy])),
                snap(state, vec.add(currentLine[1], [dx, dy])),
            ];

            const newLine = setAtIndex({
                array: state.coords,
                index: action.lineIndex,
                newValue,
            });

            return {
                ...state,
                hasBeenInteractedWith: true,
                coords: newLine,
            };
        }
        default:
            throw new UnreachableCaseError(action);
    }
}

function snap(
    state: Readonly<InteractiveGraphState>,
    point: vec.Vector2,
): vec.Vector2 {
    const [requestedX, requestedY] = point;
    const [snapX, snapY] = state.snapStep;
    return [
        Math.round(requestedX / snapX) * snapX,
        Math.round(requestedY / snapY) * snapY,
    ];
}

// Returns the closest point to the given `point` that is within the graph
// bounds given in `state`.
function bound(
    state: Readonly<InteractiveGraphState>,
    point: vec.Vector2,
): vec.Vector2 {
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
    point: vec.Vector2,
): vec.Vector2 {
    const topRight = bound(state, [Infinity, Infinity]);
    return vec.sub(topRight, point);
}

// Returns the vector from the given point to the bottom-left corner of the
// graph
function minMove(
    state: Readonly<InteractiveGraphState>,
    point: vec.Vector2,
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

function validSegments(segments: readonly CollinearTuple[]): boolean {
    return segments.every(([start, end]) => !kvector.equal(start, end));
}

function updateAtIndex<T>(args: {
    array?: readonly T[];
    index: number;
    update: (elem: T) => T;
}): readonly T[] {
    const {array = [], index, update} = args;
    const newValue = update(array[index]);
    return setAtIndex({array, index, newValue});
}

function setAtIndex<T, A extends readonly T[]>(args: {
    array?: A;
    index: number;
    newValue: A[number];
}): A {
    const {array = [], index, newValue} = args;
    const copy: T[] = [...array];
    copy[index] = newValue;
    // restoring readonly to array
    return copy as unknown as A;
}
