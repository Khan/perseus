import Util from "../../util";

import type {Rubric, UserInput} from "./sorter.types";
import type {PerseusScore} from "../../types";

function sorterValidator(userInput: UserInput, rubric: Rubric): PerseusScore {
    // If the sorter widget hasn't been changed yet, we treat it as "empty" which
    // prevents the "Check" button from becoming active. We want the user
    // to make a change before trying to move forward. This makes an
    // assumption that the initial order isn't the correct order! However,
    // this should be rare if it happens, and interacting with the list
    // will enable the button, so they won't be locked out of progressing.
    if (!userInput.changed) {
        return {
            type: "invalid",
            message: null,
        };
    }

    const correct = Util.deepEq(userInput.options, rubric.correct);
    return {
        type: "points",
        earned: correct ? 1 : 0,
        total: 1,
        message: null,
    };
}

export default sorterValidator;
