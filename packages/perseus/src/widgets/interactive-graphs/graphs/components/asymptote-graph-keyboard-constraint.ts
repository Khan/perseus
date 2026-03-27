import {vec} from "mafs";

import type {Coord} from "@khanacademy/perseus-core";

/**
 * Shared keyboard constraint logic for asymptote-based graphs (exponential,
 * logarithm). Computes the next valid position for each arrow-key direction,
 * skipping up to 3 snap steps to avoid positions rejected by the caller's
 * `isValidPosition` predicate.
 *
 * The per-graph validity rules differ (exponential checks Y vs asymptote and
 * X vs other point; logarithm checks X vs asymptote and Y vs other point),
 * so they are injected via the callback.
 */
export function getAsymptoteGraphKeyboardConstraint(
    coords: ReadonlyArray<Coord>,
    snapStep: vec.Vector2,
    pointIndex: number,
    isValidPosition: (coord: vec.Vector2) => boolean,
): {
    up: vec.Vector2;
    down: vec.Vector2;
    left: vec.Vector2;
    right: vec.Vector2;
} {
    const coordToBeMoved = coords[pointIndex];

    const movePointWithConstraint = (
        moveFunc: (coord: vec.Vector2) => vec.Vector2,
    ): vec.Vector2 => {
        let movedCoord = moveFunc(coordToBeMoved);
        for (let i = 0; i < 3 && !isValidPosition(movedCoord); i++) {
            movedCoord = moveFunc(movedCoord);
        }
        if (!isValidPosition(movedCoord)) {
            return coordToBeMoved;
        }
        return movedCoord;
    };

    return {
        up: movePointWithConstraint((coord) =>
            vec.add(coord, [0, snapStep[1]]),
        ),
        down: movePointWithConstraint((coord) =>
            vec.sub(coord, [0, snapStep[1]]),
        ),
        left: movePointWithConstraint((coord) =>
            vec.sub(coord, [snapStep[0], 0]),
        ),
        right: movePointWithConstraint((coord) =>
            vec.add(coord, [snapStep[0], 0]),
        ),
    };
}
