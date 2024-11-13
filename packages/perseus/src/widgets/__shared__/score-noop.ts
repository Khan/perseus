import type {PerseusScore} from "../../types";

/**
 * Several widgets don't have "right"/"wrong" scoring logic,
 * so this just says to move on past those widgets
 *
 * TODO(LEMS-2543) widgets that use this probably shouldn't have any
 * scoring logic and the thing scoring an exercise
 * should just know to skip these
 */
function scoreNoop(points: number = 0): PerseusScore {
    return {
        type: "points",
        earned: points,
        total: points,
        message: null,
    };
}

export default scoreNoop;
