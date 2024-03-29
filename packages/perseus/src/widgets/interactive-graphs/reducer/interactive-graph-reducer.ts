import {vector as kvector} from "@khanacademy/kmath";
import {UnreachableCaseError} from "@khanacademy/wonder-stuff-core";
import {vec} from "mafs";

import {
    type InteractiveGraphAction,
    MOVE_ALL,
    MOVE_CONTROL_POINT,
    MOVE_LINE,
    MOVE_POINT,
    MOVE_CIRCLE,
} from "./interactive-graph-action";

import type {CollinearTuple} from "../../../perseus-types";
import type {CircleGraphState, InteractiveGraphState} from "../types";
import type {Interval} from "mafs";

/** Determine if coords is type CollinearTuple[] */
const isCollinearTuples = (
    coords: readonly CollinearTuple[] | readonly vec.Vector2[],
): coords is readonly CollinearTuple[] => Array.isArray(coords[0][0]);

// Generic type makes returned state match input state
export function interactiveGraphReducer<
    GraphState extends InteractiveGraphState,
>(state: Readonly<GraphState>, action: InteractiveGraphAction): GraphState {
    const {snapStep, range} = state;
    if (!state.coords) {
        throw new Error("Graph state must have been initialized with coords");
    }
    switch (action.type) {
        case MOVE_CONTROL_POINT: {
            const newCoords =
                action.itemIndex !== undefined &&
                state.coords &&
                isCollinearTuples(state.coords)
                    ? updateAtIndex({
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
                      })
                    : setAtIndex({
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
        case MOVE_LINE: {
            if (!isCollinearTuples(state.coords)) {
                throw new Error(
                    "Cannot call this action unless coords is array of CollinearTuple.",
                );
            }
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

            const newLine: CollinearTuple = [
                snap({
                    snapStep,
                    point: vec.add(currentLine[0], change),
                }),
                snap({
                    snapStep,
                    point: vec.add(currentLine[1], change),
                }),
            ];

            const newCoords = setAtIndex<
                CollinearTuple,
                readonly CollinearTuple[]
            >({
                array: state.coords,
                index: action.itemIndex,
                newValue: newLine,
            });

            return {
                ...state,
                hasBeenInteractedWith: true,
                coords: newCoords,
            };
        }
        case MOVE_ALL: {
            if (isCollinearTuples(state.coords)) {
                throw new Error(
                    "Cannot call this action unless coords is array of vectors.",
                );
            }

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
        case MOVE_POINT:
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
        case MOVE_CIRCLE:
            const newCoords = snap({
                snapStep,
                point: vec.add(state.center, action.delta),
            });

            return {
                ...state,
                hasBeenInteractedWith: true,
                center: newCoords,
            };
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
