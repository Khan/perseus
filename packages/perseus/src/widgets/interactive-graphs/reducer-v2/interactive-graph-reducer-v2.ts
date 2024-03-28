import {vector as kvector} from "@khanacademy/kmath";

import {MOVE_CONTROL_POINT} from "./interactive-graph-action-v2";

import type {ActionV2} from "./interactive-graph-action-v2";
import type {GraphObject, InteractiveGraphStateV2} from "./types";
import type {Interval, vec} from "mafs";

function snapAndBound(
    snapStep: vec.Vector2,
    range: [Interval, Interval],
    point: vec.Vector2,
) {
    return snap({
        snapStep: snapStep,
        point: bound({
            snapStep: snapStep,
            range: range,
            point: point,
        }),
    });
}

export function interactiveGraphReducerV2(
    state: InteractiveGraphStateV2,
    action: ActionV2,
): InteractiveGraphStateV2 {
    function doMoveControlPointOnObject(
        original: GraphObject,
        pointIndex: number,
        destination: vec.Vector2,
    ): GraphObject {
        const newValue = snapAndBound(state.snapStep, state.range, destination);

        const updated = {
            ...original,
            points: setAtIndex({
                array: original.points,
                index: pointIndex,
                newValue,
            }),
        };

        if (coordsOverlap(updated.points)) {
            return original;
        }

        return updated;
    }

    switch (action.type) {
        case MOVE_CONTROL_POINT:
            return {
                ...state,
                objects: updateAtIndex({
                    array: state.objects,
                    index: action.objectIndex,
                    update: (object) =>
                        doMoveControlPointOnObject(
                            object,
                            action.pointIndex,
                            action.destination,
                        ),
                }),
                hasBeenInteractedWith: true,
            };
    }
    return state;
}

const coordsOverlap = (coords: readonly vec.Vector2[]): boolean =>
    coords.some((coord, i) =>
        coords.some((c, j) => i !== j && kvector.equal(coord, c)),
    );

function snap({
    snapStep,
    point,
}: {
    snapStep: vec.Vector2;
    point: vec.Vector2;
}): vec.Vector2 {
    const [requestedX, requestedY] = point;
    const [snapX, snapY] = snapStep;
    return [
        Math.round(requestedX / snapX) * snapX,
        Math.round(requestedY / snapY) * snapY,
    ];
}

// Returns the closest point to the given `point` that is within the graph
// bounds given in `state`.
function bound({
    snapStep,
    range,
    point,
}: {
    snapStep: vec.Vector2;
    range: [Interval, Interval];
    point: vec.Vector2;
}): vec.Vector2 {
    const [requestedX, requestedY] = point;
    const [snapX, snapY] = snapStep;
    const [[minX, maxX], [minY, maxY]] = range;
    return [
        clamp(requestedX, minX + snapX, maxX - snapX),
        clamp(requestedY, minY + snapY, maxY - snapY),
    ];
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

// TODO(benchristel): add tests / typetests for these
function updateAtIndex<A extends any[]>(args: {
    array: A;
    index: number;
    update: (elem: A[number]) => A[number];
}): A {
    const {array, index, update} = args;
    const newValue = update(array[index]);
    return setAtIndex<A>({array, index, newValue});
}

function setAtIndex<A extends any[]>(args: {
    array: A;
    index: number;
    newValue: A[number];
}): A {
    const {array, index, newValue} = args;
    const copy: A = [...array] as A;
    copy[index] = newValue;
    return copy as A;
}
