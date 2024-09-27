import type {PerseusScore} from "../../types";
import type {PerseusCSProgramUserInput} from "../../validation.types";

export function csProgramValidator(
    state: PerseusCSProgramUserInput,
): PerseusScore {
    // The iframe can tell us whether it's correct or incorrect,
    //  and pass an optional message
    if (state.status === "correct") {
        return {
            type: "points",
            earned: 1,
            total: 1,
            message: state.message || null,
        };
    }
    if (state.status === "incorrect") {
        return {
            type: "points",
            earned: 0,
            total: 1,
            message: state.message || null,
        };
    }
    return {
        type: "invalid",
        message: "Keep going, you're not there yet!",
    };
}
