import {vector as kvector} from "@khanacademy/kmath";
import {UnreachableCaseError} from "@khanacademy/wonder-stuff-core";
import {vec} from "mafs";
import _ from "underscore";

import Util from "../../../util";
import {
    angleMeasures,
    ccw,
    lawOfCosines,
    magnitude,
    polygonSidesIntersect,
    reverseVector,
    sign,
    vector,
} from "../../../util/geometry";
import {getQuadraticCoefficients} from "../graphs/quadratic";
import {clamp, findAngle, polar, snap, X, Y} from "../math";
import {bound} from "../utils";

import {initializeGraphState} from "./initialize-graph-state";
import {
    CHANGE_RANGE,
    CHANGE_SNAP_STEP,
    type ChangeRange,
    type ChangeSnapStep,
    type InteractiveGraphAction,
    MOVE_ALL,
    MOVE_CENTER,
    MOVE_CONTROL_POINT,
    MOVE_LINE,
    MOVE_POINT,
    MOVE_RADIUS_POINT,
    type MoveAll,
    type MoveCenter,
    type MoveControlPoint,
    type MoveLine,
    type MovePoint,
    type MoveRadiusPoint,
    REINITIALIZE,
} from "./interactive-graph-action";

import type {QuadraticCoords} from "../graphs/quadratic";
import type {InteractiveGraphState, PairOfPoints} from "../types";
import type {Coord} from "@khanacademy/perseus";
import type {Interval} from "mafs";

export function interactiveGraphReducer(
    state: InteractiveGraphState,
    action: InteractiveGraphAction,
): InteractiveGraphState {
    switch (action.type) {
        case REINITIALIZE:
            return initializeGraphState(action.params);
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
                index: action.figureIndex,
                update: (tuple) =>
                    setAtIndex({
                        array: tuple,
                        index: action.pointIndex,
                        newValue: boundAndSnapToGrid(action.destination, state),
                    }),
            });

            const coordsToCheck = newCoords[action.figureIndex];
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
        case "angle":
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
            if (state.snapTo === "sides" || state.snapTo === "angles") {
                const change = getChange(state.coords, action.delta, {
                    snapStep: [0, 0],
                    range,
                });

                newCoords = state.coords.map((point: vec.Vector2) =>
                    vec.add(point, change),
                );
            } else {
                const change = getChange(state.coords, action.delta, {
                    snapStep,
                    range,
                });

                newCoords = state.coords.map((point: vec.Vector2) =>
                    snap(snapStep, vec.add(point, change)),
                );
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
        case "angle":
            // If the index is 1, we are moving the vertex of the angle,
            // which will move the other two points as well
            if (action.index === 1) {
                const updatedCoords = boundAndSnapAngleVertex(state, action);

                return {
                    ...state,
                    hasBeenInteractedWith: true,
                    coords: updatedCoords,
                };
            }
            return {
                ...state,
                hasBeenInteractedWith: true,
                coords: setAtIndex({
                    array: state.coords,
                    index: action.index,
                    newValue: boundAndSnapAngleEndPoints(
                        action.destination,
                        state,
                        action.index,
                    ),
                }),
            };
        case "polygon":
            let newValue: vec.Vector2;
            if (state.snapTo === "sides") {
                newValue = boundAndSnapToSides(
                    action.destination,
                    state,
                    action.index,
                );
            } else if (state.snapTo === "angles") {
                newValue = boundAndSnapToPolygonAngle(
                    action.destination,
                    state,
                    action.index,
                );
            } else {
                newValue = boundAndSnapToGrid(action.destination, state);
            }

            const newCoords = setAtIndex({
                array: state.coords,
                index: action.index,
                newValue: newValue,
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
            // First, we need to make sure to bound the new coordinates to the graph range
            const destination = action.destination;
            const boundDestination = boundAndSnapToGrid(destination, state);

            // Then, we need to verify that the new coordinates are not on the same
            // vertical line. If they are, then we don't want to move the point
            const newCoords: vec.Vector2[] = [...state.coords];
            newCoords[action.index] = boundDestination;
            if (newCoords[0][X] === newCoords[1][X]) {
                return state;
            }

            return {
                ...state,
                hasBeenInteractedWith: true,
                coords: setAtIndex({
                    array: state.coords,
                    index: action.index,
                    newValue: boundDestination,
                }),
            };
        }
        case "quadratic": {
            // Set up the new coords and check if the quadratic coefficients are valid
            const newCoords: QuadraticCoords = [...state.coords];

            // Bind the new destination to the graph range/snapStep and then get the quadratic coefficients
            const boundDestination = boundAndSnapToGrid(
                action.destination,
                state,
            );
            newCoords[action.index] = boundDestination;
            const QuadraticCoefficients = getQuadraticCoefficients(newCoords);

            // If the new destination results in an invalid quadratic equation, we don't want to move the point
            if (QuadraticCoefficients === undefined) {
                return state;
            }

            return {
                ...state,
                hasBeenInteractedWith: true,
                coords: setAtIndex({
                    array: state.coords,
                    index: action.index,
                    newValue: boundDestination,
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
            const [xMin, xMax] = state.range[X];
            const [radX] = newRadiusPoint;
            if (radX < xMin || radX > xMax) {
                const xJumpDist = (radX - constrainedCenter[X]) * 2;
                const possibleNewX = radX - xJumpDist;
                if (possibleNewX >= xMin && possibleNewX <= xMax) {
                    newRadiusPoint[X] = possibleNewX;
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
            const [xMin, xMax] = state.range[X];
            const nextRadiusPoint: vec.Vector2 = [
                // Constrain to graph range
                // The +0 is to convert -0 to +0
                clamp(action.destination[X] + 0, xMin, xMax),
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
    const maxXMove = Math.min(...maxMoves.map((move) => move[X]));
    const maxYMove = Math.min(...maxMoves.map((move) => move[Y]));
    const minXMove = Math.max(...minMoves.map((move) => move[X]));
    const minYMove = Math.max(...minMoves.map((move) => move[Y]));
    const dx = clamp(deltaX, minXMove, maxXMove);
    const dy = clamp(deltaY, minYMove, maxYMove);
    return [dx, dy];
};

const getChange = (
    coords: readonly vec.Vector2[],
    delta: vec.Vector2,
    constraintOpts: {snapStep: vec.Vector2; range: [Interval, Interval]},
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

interface ConstraintArgs {
    snapStep: vec.Vector2;
    range: [Interval, Interval];
    point: vec.Vector2;
}

const eq = Util.eq;

// Less than or approximately equal
function leq(a: any, b) {
    return a < b || eq(a, b);
}

function boundAndSnapToGrid(
    point: vec.Vector2,
    {snapStep, range}: {snapStep: vec.Vector2; range: [Interval, Interval]},
) {
    return snap(snapStep, bound({snapStep, range, point}));
}

function boundAndSnapAngleVertex(
    {
        range,
        coords,
        snapStep,
    }: {
        range: [Interval, Interval];
        coords: [Coord, Coord, Coord];
        snapStep: vec.Vector2;
    },
    {destination}: {destination: vec.Vector2},
) {
    // Needed to prevent updating the original coords before the checks for
    // degenerate triangles and overlapping sides
    const coordsCopy: [Coord, Coord, Coord] = [...coords];

    // Get the current and upcoming positions of the vertex
    const startingVertex = coordsCopy[1];
    const newVertex = bound({
        snapStep,
        range,
        point: snap(snapStep, destination),
    });

    // Get the vector from the starting vertex to the new vertex
    const delta = vec.add(newVertex, reverseVector(startingVertex));

    // Apply the delta to each of the other two points so that the angle is maintained
    let valid = true;
    const newPoints: Record<string, any> = {};
    for (const i of [0, 2]) {
        const oldPoint = coordsCopy[i];
        let newPoint = vec.add(oldPoint, delta);

        let angle = findAngle(newVertex, newPoint);
        angle *= Math.PI / 180;

        newPoint = constrainToBoundsOnAngle(newPoint, angle, range, snapStep);
        newPoints[i] = newPoint;

        // Check if the new point is too close to the vertex
        if (tooClose(newVertex, newPoint, range)) {
            valid = false;
        }
    }

    // Update the vertex after snapping to the snapStep
    newPoints[1] = newVertex;
    // Only move points if all new positions are valid
    if (valid) {
        Object.entries(newPoints).forEach(([i, newPoint]) => {
            coordsCopy[i] = newPoint;
        });
    }
    return coordsCopy;
}

// This function is used to ensure that the vertex of
// an angle is not too close to the other points
function tooClose(
    point1: vec.Vector2,
    point2: vec.Vector2,
    range: [Interval, Interval],
) {
    const safeDistance = 2;
    const distance = vec.dist(point1, point2);
    return distance < safeDistance;
}

function constrainToBoundsOnAngle(
    point: vec.Vector2,
    angle: number,
    range: [Interval, Interval],
    snapStep: vec.Vector2,
): vec.Vector2 {
    // We're subtracting the snapStep from the lower bound and adding it to the upper bound
    // to ensure that the point is within the bounds of the graph even after snapping to the nearest degree
    const lower: vec.Vector2 = [
        range[0][0] + snapStep[0],
        range[1][0] + snapStep[0],
    ];
    const upper: vec.Vector2 = [
        range[0][1] - snapStep[1],
        range[1][1] - snapStep[1],
    ];

    let result = point;

    if (result[0] < lower[0]) {
        result = [
            lower[0],
            result[1] + (lower[0] - result[0]) * Math.tan(angle),
        ];
    } else if (result[0] > upper[0]) {
        result = [
            upper[0],
            result[1] - (result[0] - upper[0]) * Math.tan(angle),
        ];
    }

    if (result[1] < lower[1]) {
        result = [
            result[0] + (lower[1] - result[1]) / Math.tan(angle),
            lower[1],
        ];
    } else if (result[1] > upper[1]) {
        result = [
            result[0] - (result[1] - upper[1]) / Math.tan(angle),
            upper[1],
        ];
    }

    return result;
}

function boundAndSnapAngleEndPoints(
    destinationPoint: vec.Vector2,
    {
        range,
        coords,
        snapDegrees,
        angleOffsetDeg,
        snapStep,
    }: {
        range: [Interval, Interval];
        coords: Coord[];
        snapDegrees?: number;
        angleOffsetDeg?: number;
        snapStep: vec.Vector2;
    },
    index: number,
) {
    const snap = snapDegrees || 1;
    const offsetDegrees = angleOffsetDeg || 0;

    // Needed to prevent updating the original coords before the checks for
    // degenerate triangles and overlapping sides
    const coordsCopy = [...coords];

    // We want to subtract or add the snapStep to the lower and upper bounds
    // respectively to ensure that the point is within the bounds of the graph
    // even after snapping to the nearest degree
    const angleRange = [
        [range[0][0] + snapStep[0], range[0][1] - snapStep[0]],
        [range[1][0] + snapStep[1], range[1][1] - snapStep[1]],
    ] as [Interval, Interval];

    // Takes the destination point and makes sure it is within the bounds of the graph
    // SnapStep is [0, 0] because we don't want to snap these points to the grid at all
    const boundPoint = bound({
        snapStep: [0, 0],
        range: angleRange,
        point: destinationPoint,
    });
    coordsCopy[index] = boundPoint;

    // Get the vertex of the angle
    const vertex = coords[1];

    // Gets the angle between the coords and the vertex
    let angle = findAngle(coordsCopy[index], vertex);

    // Snap the angle to the nearest multiple of snapDegrees (if provided)
    angle = Math.round((angle - offsetDegrees) / snap) * snap + offsetDegrees;
    const distance = vec.dist(coordsCopy[index], vertex);
    const snappedValue = vec.add(vertex, polar(distance, angle));

    return snappedValue;
}

function boundAndSnapToPolygonAngle(
    destinationPoint: vec.Vector2,
    {
        range,
        coords,
    }: {
        range: [Interval, Interval];
        coords: Coord[];
    },
    index: number,
) {
    const startingPoint = coords[index];

    // Needed to prevent updating the original coords before the checks for
    // degenerate triangles and overlapping sides
    const coordsCopy = [...coords];

    // Takes the destination point and makes sure it is within the bounds of the graph
    // SnapStep is [0, 0] because we don't want to snap to the grid
    coordsCopy[index] = bound({
        snapStep: [0, 0],
        range,
        point: destinationPoint,
    });

    // Gets the radian angles between the coords and maps them to degrees
    const angles = angleMeasures(coordsCopy).map(
        (angle) => (angle * 180) / Math.PI,
    );

    // Gets the relative index of a point
    const rel = (j): number => {
        return (index + j + coordsCopy.length) % coordsCopy.length;
    };

    // Round the angles to left and right of the current point
    _.each([-1, 1], function (j) {
        angles[rel(j)] = Math.round(angles[rel(j)]);
    });

    const getAngle = function (a: number, vertex, b: number) {
        const angle = findAngle(
            coordsCopy[rel(a)],
            coordsCopy[rel(b)],
            coordsCopy[rel(vertex)],
        );
        return (angle + 360) % 360;
    };

    const innerAngles = [
        angles[rel(-1)] - getAngle(-2, -1, 1),
        angles[rel(1)] - getAngle(-1, 1, 2),
    ];

    innerAngles[2] = 180 - (innerAngles[0] + innerAngles[1]);

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
        vector(coordsCopy[rel(-1)], coordsCopy[rel(1)]),
    );

    // Returns true if the points form a counter-clockwise turn;
    // a.k.a if the point is on the left or right of the polygon.
    // This is used to determine how to adjust the point: if the point is on the left,
    // we want to add the inner angle to the outer angle, and if it's on the right,
    // we want to subtract the inner angle from the outer angle. The angle solved
    // for is then used in the polar function to determine the new point.
    const onLeft =
        sign(
            ccw(coordsCopy[rel(-1)], coordsCopy[rel(1)], coordsCopy[index]),
        ) === 1;

    // Solve for side by using the law of sines
    const side =
        (Math.sin((innerAngles[1] * Math.PI) / 180) /
            Math.sin((innerAngles[2] * Math.PI) / 180)) *
        knownSide;

    // Angle at the second vertex of the polygon
    const outerAngle = findAngle(coordsCopy[rel(1)], coordsCopy[rel(-1)]);

    // Uses the length of the side of the polygon (radial coordinate)
    // and the angle between the first and second sides of the
    // polygon (angular coordinate) to determine how to adjust the point
    const offset = polar(side, outerAngle + (onLeft ? 1 : -1) * innerAngles[0]);
    return kvector.add(coordsCopy[rel(-1)], offset) as vec.Vector2;
}

function boundAndSnapToSides(
    destinationPoint: vec.Vector2,
    {range, coords}: {range: [Interval, Interval]; coords: Coord[]},
    index: number,
) {
    const startingPoint = coords[index];

    // Needed to prevent updating the original coords before the checks for
    // degenerate triangles and overlapping sides
    const coordsCopy = [...coords];

    // Takes the destination point and makes sure it is within the bounds of the graph
    // SnapStep is [0, 0] because we don't want to snap to the grid
    coordsCopy[index] = bound({
        snapStep: [0, 0],
        range,
        point: destinationPoint,
    });

    // Gets the relative index of a point
    const rel = (j): number => {
        return (index + j + coordsCopy.length) % coordsCopy.length;
    };
    const sides = _.map(
        [
            [coordsCopy[rel(-1)], coordsCopy[index]],
            [coordsCopy[index], coordsCopy[rel(1)]],
            [coordsCopy[rel(-1)], coordsCopy[rel(1)]],
        ],
        function (coordsCopy) {
            // @ts-expect-error - TS2345 - Argument of type 'number[]' is not assignable to parameter of type 'readonly Coord[]'. | TS2556 - A spread argument must either have a tuple type or be passed to a rest parameter.
            return magnitude(vector(...coordsCopy));
        },
    );

    // Round the sides to left and right of the current point
    _.each([0, 1], function (j) {
        sides[j] = Math.round(sides[j]);
    });

    // Avoid degenerate triangles
    if (
        leq(sides[1] + sides[2], sides[0]) ||
        leq(sides[0] + sides[2], sides[1]) ||
        leq(sides[0] + sides[1], sides[2])
    ) {
        return startingPoint;
    }

    // Solve for angle by using the law of cosines
    // Angle at the first vertex of the polygon
    const innerAngle = lawOfCosines(sides[0], sides[2], sides[1]);

    // Angle at the second vertex of the polygon
    const outerAngle = findAngle(coordsCopy[rel(1)], coordsCopy[rel(-1)]);

    // Returns true if the points form a counter-clockwise turn;
    // a.k.a if the point is on the left or right of the polygon.
    // This is used to determine how to adjust the point: if the point is on the left,
    // we want to add the inner angle to the outer angle, and if it's on the right,
    // we want to subtract the inner angle from the outer angle. The angle solved
    // for is then used in the polar function to determine the new point.
    const onLeft =
        sign(
            ccw(coordsCopy[rel(-1)], coordsCopy[rel(1)], coordsCopy[index]),
        ) === 1;

    // Uses the length of the first side of the polygon (radial coordinate)
    // and the angle between the first and second sides of the
    // polygon (angular coordinate) to determine how to adjust the point
    const offset = polar(sides[0], outerAngle + (onLeft ? 1 : -1) * innerAngle);

    return kvector.add(coordsCopy[rel(-1)], offset) as vec.Vector2;
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
