import {vector as kvector} from "@khanacademy/kmath";
import {UnreachableCaseError} from "@khanacademy/wonder-stuff-core";
import {vec} from "mafs";

import {
    type InteractiveGraphAction,
    MOVE_ALL,
    MOVE_CONTROL_POINT,
    MOVE_LINE,
    MOVE_POINT, MoveAll, MoveControlPoint, MoveLine, MovePoint,
} from "./interactive-graph-action";

import type {CollinearTuple} from "../../../perseus-types";
import type {InteractiveGraphState, PairOfPoints} from "../types";
import type {Interval} from "mafs";

/** Determine if coords is type CollinearTuple[] */
const isCollinearTuples = (
    coords: readonly CollinearTuple[] | readonly vec.Vector2[],
): coords is readonly CollinearTuple[] => Array.isArray(coords[0][0]);

function doMoveControlPoint(state: InteractiveGraphState, action: MoveControlPoint): InteractiveGraphState {
    const {snapStep, range} = state;
    switch (state.type) {
        case "segment":
        case "linear":
        case "linear-system":
        case "ray": {
            if (action.itemIndex == null) {
                throw new Error("MoveControlPoint.itemIndex cannot be null when moving a point on a line")
            }
            const newCoords = updateAtIndex({
                array: state.coords,
                index: action.itemIndex,
                update: (tuple) =>
                    setAtIndex({
                        array: tuple,
                        index: action.pointIndex,
                        newValue: snap({
                            snapStep,
                            point: bound({
                                snapStep,
                                range,
                                point: action.destination,
                            }),
                        }),
                    }),
            });

            // Cannot type narrow both conditions within function parameters,
            // so this may seem redundant, but it's necessary for type safety.
            const coordsToCheck =
                isCollinearTuples(newCoords) && action.itemIndex !== undefined
                    ? newCoords[action.itemIndex]
                    : newCoords;
            if (
                !isCollinearTuples(coordsToCheck) &&
                coordsOverlap(coordsToCheck)
            ) {
                return state;
            }
            return {
                ...state,
                hasBeenInteractedWith: true,
                coords: newCoords,
            };
        }
        case "polygon":
        case "point": {
            const newCoords = setAtIndex({
                array: state.coords,
                index: action.pointIndex,
                newValue: snap({
                    snapStep,
                    point: bound({
                        snapStep,
                        range,
                        point: action.destination,
                    }),
                }),
            });
            return {
                ...state,
                hasBeenInteractedWith: true,
                coords: newCoords,
            };
        }
        case "circle":
            throw "FIXME implement circle reducer"
        default:
            throw new UnreachableCaseError(state)
    }
}

function doMoveLine(state: InteractiveGraphState, action: MoveLine): InteractiveGraphState {
    const {snapStep, range} = state;
    switch (state.type) {
        case "segment":
        case "linear":
        case "linear-system":
        case "ray": {
            if (action.itemIndex === undefined) {
                throw new Error("Please provide index of line to move");
            }
            const currentLine = state.coords[action.itemIndex];
            if (!currentLine) {
                throw new Error("No line to move");
            }
            const change = getChange(currentLine, action.delta, {
                snapStep,
                range,
            });

            const newLine: PairOfPoints = [
                snap({
                    snapStep,
                    point: vec.add(currentLine[0], change),
                }),
                snap({
                    snapStep,
                    point: vec.add(currentLine[1], change),
                }),
            ];

            const newCoords = setAtIndex({
                array: state.coords,
                index: action.itemIndex,
                newValue: newLine,
            });

            return {
                ...state,
                type: state.type,
                hasBeenInteractedWith: true,
                coords: newCoords,
            };
        }
        default:
            // The MoveLine action doesn't make sense for other graph types;
            // ignore it if it somehow happens
            return state;
    }
}

function doMoveAll(state: InteractiveGraphState, action: MoveAll): InteractiveGraphState {
    const {snapStep, range} = state;
    switch (state.type) {
        case "polygon": {
            const change = getChange(state.coords, action.delta, {
                snapStep,
                range,
            });

            const newCoords = state.coords.map((point: vec.Vector2) =>
                snap({snapStep, point: vec.add(point, change)}),
            );

            return {
                ...state,
                hasBeenInteractedWith: true,
                coords: newCoords,
            };
        }
        default:
            // MoveAll is not supported for other state types; just ignore it.
            return state;
    }
}

function doMovePoint(state: InteractiveGraphState, action: MovePoint): InteractiveGraphState {
    switch (state.type) {
        case "point": {
            return {
                ...state,
                hasBeenInteractedWith: true,
                coords: setAtIndex({
                    array: state.coords,
                    index: action.index,
                    newValue: snap({
                        snapStep: state.snapStep,
                        point: bound({
                            point: action.destination,
                            range: state.range,
                            snapStep: state.snapStep,
                        }),
                    }),
                }),
            };
        }
        default:
            return state;
    }
}

// Generic type makes returned state match input state
export function interactiveGraphReducer(state: InteractiveGraphState, action: InteractiveGraphAction): InteractiveGraphState {
    const {snapStep, range} = state;
    switch (action.type) {
        case MOVE_CONTROL_POINT:
            return doMoveControlPoint(state, action);
        case MOVE_LINE:
            return doMoveLine(state, action);
        case MOVE_ALL:
            return doMoveAll(state, action);
        case MOVE_POINT:
            return doMovePoint(state, action);
        default:
            throw new UnreachableCaseError(action);
    }
}

const getChange = (
    coords: readonly vec.Vector2[],
    delta: vec.Vector2,
    constraintOpts: Omit<ConstraintArgs, "point">,
): vec.Vector2 => {
    const [deltaX, deltaY] = delta;
    const maxMoves = coords.map((point: vec.Vector2) =>
        maxMove({...constraintOpts, point}),
    );
    const minMoves = coords.map((point: vec.Vector2) =>
        minMove({...constraintOpts, point}),
    );
    const maxXMove = Math.min(...maxMoves.map((move) => move[0]));
    const maxYMove = Math.min(...maxMoves.map((move) => move[1]));
    const minXMove = Math.max(...minMoves.map((move) => move[0]));
    const minYMove = Math.max(...minMoves.map((move) => move[1]));
    const dx = clamp(deltaX, minXMove, maxXMove);
    const dy = clamp(deltaY, minYMove, maxYMove);
    return [dx, dy];
};

interface ConstraintArgs {
    snapStep: vec.Vector2;
    range: [Interval, Interval];
    point: vec.Vector2;
}

function snap({snapStep, point}: Omit<ConstraintArgs, "range">): vec.Vector2 {
    const [requestedX, requestedY] = point;
    const [snapX, snapY] = snapStep;
    return [
        Math.round(requestedX / snapX) * snapX,
        Math.round(requestedY / snapY) * snapY,
    ];
}

// Returns the closest point to the given `point` that is within the graph
// bounds given in `state`.
function bound({snapStep, range, point}: ConstraintArgs): vec.Vector2 {
    const [requestedX, requestedY] = point;
    const [snapX, snapY] = snapStep;
    const [[minX, maxX], [minY, maxY]] = range;
    return [
        clamp(requestedX, minX + snapX, maxX - snapX),
        clamp(requestedY, minY + snapY, maxY - snapY),
    ];
}

// Returns the vector from the given point to the top-right corner of the graph
function maxMove({snapStep, range, point}: ConstraintArgs): vec.Vector2 {
    const topRight = bound({snapStep, range, point: [Infinity, Infinity]});
    return vec.sub(topRight, point);
}

// Returns the vector from the given point to the bottom-left corner of the
// graph
function minMove({snapStep, range, point}: ConstraintArgs): vec.Vector2 {
    const bottomLeft = bound({snapStep, range, point: [-Infinity, -Infinity]});
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

const coordsOverlap = (coords: readonly vec.Vector2[]): boolean =>
    coords.some((coord, i) =>
        coords.some((c, j) => i !== j && kvector.equal(coord, c)),
    );

function updateAtIndex<A extends any[]>(args: {
    array: A;
    index: number;
    update: (elem: A[number]) => A[number];
}): A {
    const {array, index, update} = args;
    const newValue = update(array[index]);
    return setAtIndex({array, index, newValue});
}

function setAtIndex<A extends any[]>(args: {
    array: A;
    index: number;
    newValue: A[number];
}): A {
    const {array, index, newValue} = args;
    const copy: A = [...array] as A;
    copy[index] = newValue;
    return copy;
}
