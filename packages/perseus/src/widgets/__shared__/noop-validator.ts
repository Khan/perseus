import type {PerseusScore} from "../../types";

/**
 * Several widgets don't have "right"/"wrong" validation logic,
 * so this just says to move on past those widgets
 *
 * TODO(LEMS-2396) widgets that use this probably shouldn't have any
 * validation logic and the thing validating an exercise
 * should just know to skip these
 */
function noopValidator(points: number = 0): PerseusScore {
    return {
        type: "points",
        earned: points,
        total: points,
        message: null,
    };
}

export default noopValidator;
