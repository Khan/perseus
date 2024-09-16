import type {PerseusScore} from "../../types";

/**
 * Several widgets don't have "right"/"wrong" validation logic,
 * so this just says to move on past those widgets
 *
 * TODO: widgets that use this probably shouldn't have any
 * validation logic and the thing validating an exercise
 * should just know to skip these
 */
function noopValidator(...args: any[]): PerseusScore {
    return {
        type: "points",
        earned: 0,
        total: 0,
        message: null,
    };
}

export default noopValidator;
