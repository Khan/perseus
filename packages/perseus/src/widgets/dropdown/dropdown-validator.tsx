import type {Rubric, UserInput} from "./dropdown.types";
import type {PerseusScore} from "../../types";

function dropdownValidator(userInput: UserInput, rubric: Rubric): PerseusScore {
    const selected = userInput.value;
    if (selected === 0) {
        return {
            type: "invalid",
            message: null,
        };
    }
    const correct = rubric.choices[selected - 1].correct;
    return {
        type: "points",
        earned: correct ? 1 : 0,
        total: 1,
        message: null,
    };
}

export default dropdownValidator;
