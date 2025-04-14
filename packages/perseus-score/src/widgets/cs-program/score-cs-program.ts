import type {
    PerseusCSProgramUserInput,
    PerseusScore,
} from "@khanacademy/perseus-core";

function scoreCSProgram(userInput: PerseusCSProgramUserInput): PerseusScore {
    // The CS program can tell us whether it's correct or incorrect,
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

export default scoreCSProgram;
