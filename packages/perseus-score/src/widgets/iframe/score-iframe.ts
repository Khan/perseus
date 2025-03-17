/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import type {
    PerseusIFrameUserInput,
    PerseusScore,
} from "../../validation.types";

// TODO: merge this with scoreCSProgram, it's the same code
function scoreIframe(userInput: PerseusIFrameUserInput): PerseusScore {
    // The iframe can tell us whether it's correct or incorrect,
    // and pass an optional message
    if (userInput.status === "correct") {
        return {
            type: "points",
            earned: 1,
            total: 1,
            message: userInput.message || null,
        };
    }
    if (userInput.status === "incorrect") {
        return {
            type: "points",
            earned: 0,
            total: 1,
            message: userInput.message || null,
        };
    }
    return {
        type: "invalid",
        message: "Keep going, you're not there yet!",
    };
}

export default scoreIframe;
