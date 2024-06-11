import {vector as kvector} from "@khanacademy/kmath";
import {UnreachableCaseError} from "@khanacademy/wonder-stuff-core";
import {vec} from "mafs";
import _ from "underscore";

import Util from "../../../util";
import {
    angleMeasures,
    ccw,
    magnitude,
    polygonSidesIntersect,
    sign,
    vector,
} from "../../../util/geometry";
import GraphUtils from "../../../util/graph-utils";
import {polar} from "../../../util/graphie";
import {snap} from "../utils";

import {
    type InteractiveGraphAction,
    MOVE_ALL,
    MOVE_CONTROL_POINT,
    MOVE_LINE,
    MOVE_POINT,
    CHANGE_SNAP_STEP,
    CHANGE_RANGE,
    MOVE_CENTER,
    MOVE_RADIUS_POINT,
    type MoveAll,
    type MoveControlPoint,
    type MoveLine,
    type MoveCenter,
    type MoveRadiusPoint,
    type MovePoint,
    type ChangeSnapStep,
    type ChangeRange,
} from "./interactive-graph-action";

import type {InteractiveGraphState, PairOfPoints} from "../types";
import type {Coord} from "@khanacademy/perseus";
import type {Interval} from "mafs";

export function interactiveGraphReducer(
    state: InteractiveGraphState,
    action: InteractiveGraphAction,
): InteractiveGraphState {
    switch (action.type) {
        case MOVE_CONTROL_POINT:
            return doMoveControlPoint(state, action);
        case MOVE_LINE:
            return doMoveLine(state, action);
        case MOVE_ALL:
            return doMoveAll(state, action);
        case MOVE_POINT:
            return doMovePoint(state, action);
        case MOVE_CENTER:
            return doMoveCenter(state, action);
        case MOVE_RADIUS_POINT:
            return doMoveRadiusPoint(state, action);
        case CHANGE_SNAP_STEP:
            return doChangeSnapStep(state, action);
        case CHANGE_RANGE:
            return doChangeRange(state, action);
        default:
            throw new UnreachableCaseError(action);
    }
}

function doMoveControlPoint(
    state: InteractiveGraphState,
    action: MoveControlPoint,
): InteractiveGraphState {
    switch (state.type) {
        case "segment":
        case "linear-system": {
            const newCoords = updateAtIndex({
                array: state.coords,
                index: action.itemIndex,
                update: (tuple) =>
                    setAtIndex({
                        array: tuple,
                        index: action.pointIndex,
                        newValue: boundAndSnapToGrid(action.destination, state),
                    }),
            });

            const coordsToCheck = newCoords[action.itemIndex];
            if (coordsOverlap(coordsToCheck)) {
                return state;
            }
            return {
                ...state,
                hasBeenInteractedWith: true,
                coords: newCoords,
            };
        }
        case "linear":
        case "ray": {
            const newCoords = setAtIndex({
                array: state.coords,
                index: action.pointIndex,
                newValue: boundAndSnapToGrid(action.destination, state),
            });

            return {
                ...state,
                hasBeenInteractedWith: true,
                coords: newCoords,
            };
        }
        case "circle":
            throw new Error("FIXME implement circle reducer");
        case "point":
        case "polygon":
        case "quadratic":
        case "sinusoid":
            throw new Error(
                `Don't use moveControlPoint for ${state.type} graphs. Use movePoint instead!`,
            );
        default:
            throw new UnreachableCaseError(state);
    }
}

// (LEMS-2050): Update the reducer so that we have a separate action for moving one line
// and another action for moving multiple lines
function doMoveLine(
    state: InteractiveGraphState,
    action: MoveLine,
): InteractiveGraphState {
    const {snapStep, range} = state;
    switch (state.type) {
        case "segment":
        case "linear-system": {
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
                snap(snapStep, vec.add(currentLine[0], change)),
                snap(snapStep, vec.add(currentLine[1], change)),
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
        case "linear":
        case "ray": {
            const currentLine = state.coords;
            const change = getChange(currentLine, action.delta, {
                snapStep,
                range,
            });

            const newLine: PairOfPoints = [
                snap(snapStep, vec.add(currentLine[0], change)),
                snap(snapStep, vec.add(currentLine[1], change)),
            ];

            return {
                ...state,
                type: state.type,
                hasBeenInteractedWith: true,
                coords: newLine,
            };
        }
        default:
            // The MoveLine action doesn't make sense for other graph types;
            // ignore it if it somehow happens
            return state;
    }
}

function doMoveAll(
    state: InteractiveGraphState,
    action: MoveAll,
): InteractiveGraphState {
    const {snapStep, range} = state;
    switch (state.type) {
        case "polygon": {
            let newCoords: vec.Vector2[];
            switch (state.snapTo) {
                // TODO(LEMS-1902): Implement sides snapping for polygons
                case "grid":
                case undefined:
                case "sides": {
                    const change = getChange(state.coords, action.delta, {
                        snapStep,
                        range,
                    });

                    newCoords = state.coords.map((point: vec.Vector2) =>
                        snap(snapStep, vec.add(point, change)),
                    );

                    break;
                }
                case "angles": {
                    const change = getNoSnapChange(state.coords, action.delta, {
                        range,
                    });

                    newCoords = state.coords.map((point: vec.Vector2) =>
                        vec.add(point, change),
                    );
                    break;
                }
                default:
                    throw new Error(`Unknown snapTo: ${state.snapTo}`);
            }
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

function doMovePoint(
    state: InteractiveGraphState,
    action: MovePoint,
): InteractiveGraphState {
    switch (state.type) {
        case "polygon":
            const newCoords = setAtIndex({
                array: state.coords,
                index: action.index,
                newValue:
                    state.snapTo === "grid"
                        ? boundAndSnapToGrid(action.destination, state)
                        : boundAndSnapToAngle(
                              action.destination,
                              state,
                              action.index,
                          ),
            });

            // Reject the move if it would cause the sides of the polygon to cross
            if (polygonSidesIntersect(newCoords)) {
                return state;
            }

            return {
                ...state,
                hasBeenInteractedWith: true,
                coords: newCoords,
            };
        case "point": {
            return {
                ...state,
                hasBeenInteractedWith: true,
                coords: setAtIndex({
                    array: state.coords,
                    index: action.index,
                    newValue: boundAndSnapToGrid(action.destination, state),
                }),
            };
        }
        case "sinusoid": {
            // First, we need to verify that the new coordinates are not on the same vertical line
            // If they are, we don't want to move the point
            const destination = action.destination;
            const newCoords: vec.Vector2[] = [...state.coords];
            newCoords[action.index] = action.destination;
            if (newCoords[0][0] === newCoords[1][0]) {
                return state;
            }
            return {
                ...state,
                hasBeenInteractedWith: true,
                coords: setAtIndex({
                    array: state.coords,
                    index: action.index,
                    newValue: boundAndSnapToGrid(destination, state),
                }),
            };
        }
        case "quadratic": {
            return {
                ...state,
                hasBeenInteractedWith: true,
                coords: setAtIndex({
                    array: state.coords,
                    index: action.index,
                    newValue: boundAndSnapToGrid(action.destination, state),
                }),
            };
        }
        default:
            throw new Error(
                "The movePoint action is only for point, quadratic, and polygon graphs",
            );
    }
}

function doMoveCenter(
    state: InteractiveGraphState,
    action: MoveCenter,
): InteractiveGraphState {
    switch (state.type) {
        case "circle": {
            // Constrain the center of the circle to the chart range
            const constrainedCenter: vec.Vector2 = bound({
                snapStep: state.snapStep,
                range: state.range,
                point: action.destination,
            });

            // Reposition the radius point based on the new center
            // (spread to make sure we're not going to  mutate anything)
            const newRadiusPoint: vec.Vector2 = [
                ...vec.add(
                    state.radiusPoint,
                    vec.sub(constrainedCenter, state.center),
                ),
            ];

            // Try to position the radius handle in a visible spot
            // if it otherwise would be off the chart
            // ex: if the handle is on the right and we move the center
            // to the rightmost position, move the handle to the left
            const [xMin, xMax] = state.range[0];
            const [radX] = newRadiusPoint;
            if (radX < xMin || radX > xMax) {
                const xJumpDist = (radX - constrainedCenter[0]) * 2;
                const possibleNewX = radX - xJumpDist;
                if (possibleNewX >= xMin && possibleNewX <= xMax) {
                    newRadiusPoint[0] = possibleNewX;
                }
            }

            return {
                ...state,
                hasBeenInteractedWith: true,
                center: constrainedCenter,
                radiusPoint: newRadiusPoint,
            };
        }
        default:
            throw new Error(
                "The doMoveCenter action is only for circle graphs",
            );
    }
}

function doMoveRadiusPoint(
    state: InteractiveGraphState,
    action: MoveRadiusPoint,
): InteractiveGraphState {
    switch (state.type) {
        case "circle": {
            const [xMin, xMax] = state.range[0];
            const nextRadiusPoint: vec.Vector2 = [
                // Constrain to graph range
                // The +0 is to convert -0 to +0
                Math.min(Math.max(xMin, action.destination[0] + 0), xMax),
                state.center[1],
            ];

            if (_.isEqual(nextRadiusPoint, state.center)) {
                return state;
            }

            return {
                ...state,
                hasBeenInteractedWith: true,
                radiusPoint: nextRadiusPoint,
            };
        }
        default:
            throw new Error(
                "The doMoveRadiusPoint action is only for circle graphs",
            );
    }
}

function doChangeSnapStep(
    state: InteractiveGraphState,
    action: ChangeSnapStep,
): InteractiveGraphState {
    if (
        // Deep equality check since these are arrays
        _.isEqual(state.snapStep, action.snapStep)
    ) {
        return state;
    }

    return {
        ...state,
        snapStep: action.snapStep,
    };
}

function doChangeRange(
    state: InteractiveGraphState,
    action: ChangeRange,
): InteractiveGraphState {
    if (
        // Deep equality check since these are arrays
        _.isEqual(state.range, action.range)
    ) {
        return state;
    }

    return {
        ...state,
        range: action.range,
    };
}

const getDeltaVertex = (
    maxMoves: vec.Vector2[],
    minMoves: vec.Vector2[],
    delta: vec.Vector2,
): vec.Vector2 => {
    const [deltaX, deltaY] = delta;
    const maxXMove = Math.min(...maxMoves.map((move) => move[0]));
    const maxYMove = Math.min(...maxMoves.map((move) => move[1]));
    const minXMove = Math.max(...minMoves.map((move) => move[0]));
    const minYMove = Math.max(...minMoves.map((move) => move[1]));
    const dx = clamp(deltaX, minXMove, maxXMove);
    const dy = clamp(deltaY, minYMove, maxYMove);
    return [dx, dy];
};

const getChange = (
    coords: readonly vec.Vector2[],
    delta: vec.Vector2,
    constraintOpts: Omit<ConstraintArgs, "point">,
): vec.Vector2 => {
    const maxMoves = coords.map((point: vec.Vector2) =>
        maxMove({...constraintOpts, point}),
    );
    const minMoves = coords.map((point: vec.Vector2) =>
        minMove({...constraintOpts, point}),
    );
    const [dx, dy] = getDeltaVertex(maxMoves, minMoves, delta);
    return [dx, dy];
};

const getNoSnapChange = (
    coords: readonly vec.Vector2[],
    delta: vec.Vector2,
    constraintOpts: Omit<ConstraintArgs, "point" | "snapStep">,
): vec.Vector2 => {
    const maxMoves = coords.map((point: vec.Vector2) =>
        maxNoSnapMove({...constraintOpts, point}),
    );
    const minMoves = coords.map((point: vec.Vector2) =>
        minNoSnapMove({...constraintOpts, point}),
    );
    const [dx, dy] = getDeltaVertex(maxMoves, minMoves, delta);
    return [dx, dy];
};

interface ConstraintArgs {
    snapStep: vec.Vector2;
    range: [Interval, Interval];
    point: vec.Vector2;
}

function boundAndSnapToGrid(
    point: vec.Vector2,
    {snapStep, range}: {snapStep: vec.Vector2; range: [Interval, Interval]},
) {
    return snap(snapStep, bound({snapStep, range, point}));
}

function boundAndSnapToAngle(
    destinationPoint: vec.Vector2,
    {range, coords}: {range: [Interval, Interval]; coords: Coord[]},
    index: number,
) {
    const startingPoint = coords[index];

    // Takes the destination point and makes sure it is within the bounds of the graph
    coords[index] = noSnapBound({range, point: destinationPoint});

    // Gets the radian angles between the coords and maps them to degrees
    const angles = angleMeasures(coords).map(
        (angle) => (angle * 180) / Math.PI,
    );

    // Gets the relative index of a point
    const rel = (j): number => {
        return (index + j + coords.length) % coords.length;
    };

    // Round the angles to left and right of the current point
    _.each([-1, 1], function (j) {
        angles[rel(j)] = Math.round(angles[rel(j)]);
    });

    const getAngle = function (a: number, vertex, b: number) {
        const angle = GraphUtils.findAngle(
            coords[rel(a)],
            coords[rel(b)],
            coords[rel(vertex)],
        );
        return (angle + 360) % 360;
    };

    const innerAngles = [
        angles[rel(-1)] - getAngle(-2, -1, 1),
        angles[rel(1)] - getAngle(-1, 1, 2),
    ];
    innerAngles[2] = 180 - (innerAngles[0] + innerAngles[1]);

    const eq = Util.eq;

    // Less than or approximately equal
    function leq(a: any, b) {
        return a < b || eq(a, b);
    }

    // Avoid degenerate triangles
    if (
        innerAngles.some(function (angle) {
            return leq(angle, 1);
        })
    ) {
        return startingPoint;
    }

    const knownSide = magnitude(
        // @ts-expect-error - TS2345 - Argument of type 'number[]' is not assignable to parameter of type 'readonly Coord[]'.
        vector(coords[rel(-1)], coords[rel(1)]),
    );

    const onLeft =
        sign(ccw(coords[rel(-1)], coords[rel(1)], coords[index])) === 1;

    // Solve for side by using the law of sines
    const side =
        (Math.sin((innerAngles[1] * Math.PI) / 180) /
            Math.sin((innerAngles[2] * Math.PI) / 180)) *
        knownSide;

    const outerAngle = GraphUtils.findAngle(coords[rel(1)], coords[rel(-1)]);

    const offset = polar(side, outerAngle + (onLeft ? 1 : -1) * innerAngles[0]);
    return kvector.add(coords[rel(-1)], offset);
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

// Required for graphs that snap to angles or sides
function noSnapBound({range, point}): vec.Vector2 {
    const [requestedX, requestedY] = point;
    const [[minX, maxX], [minY, maxY]] = range;
    return [clamp(requestedX, minX, maxX), clamp(requestedY, minY, maxY)];
}

// Returns the vector from the given point to the top-right corner of the graph when snapped to the grid
function maxMove({snapStep, range, point}: ConstraintArgs): vec.Vector2 {
    const topRight = bound({snapStep, range, point: [Infinity, Infinity]});
    return vec.sub(topRight, point);
}

// Returns the vector from the given point to the bottom-left corner of the graph when snapped to the grid
function minMove({snapStep, range, point}: ConstraintArgs): vec.Vector2 {
    const bottomLeft = bound({snapStep, range, point: [-Infinity, -Infinity]});
    return vec.sub(bottomLeft, point);
}

// Returns the vector from the given point to the top-right corner of the graph when snapped to angles or sides
function maxNoSnapMove({
    range,
    point,
}: Omit<ConstraintArgs, "snapStep">): vec.Vector2 {
    const topRight = noSnapBound({range, point: [Infinity, Infinity]});
    return vec.sub(topRight, point);
}

// Returns the vector from the given point to the bottom-left corner of the
// graph when snapped to angles or sides
function minNoSnapMove({
    range,
    point,
}: Omit<ConstraintArgs, "snapStep">): vec.Vector2 {
    const bottomLeft = noSnapBound({range, point: [-Infinity, -Infinity]});
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
