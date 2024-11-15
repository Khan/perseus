import type {PerseusScore} from "../../types";
import type {PerseusOrdererUserInput} from "../../validation.types";

export function validateOrderer(
    userInput: PerseusOrdererUserInput,
): Extract<PerseusScore, {type: "invalid"}> | null {
    if (userInput.current.length === 0) {
        return {
            type: "invalid",
            message: null,
        };
    }

    return null;
}
