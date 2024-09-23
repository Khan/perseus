import Util from "../../util";

import type {Rubric, UserInput} from "./sorter.types";
import type {PerseusScore} from "../../types";

function sorterValidator(userInput: UserInput, rubric: Rubric): PerseusScore {
    const correct = Util.deepEq(userInput.values, rubric.correct);

    return {
        type: "points",
        earned: correct ? 1 : 0,
        total: 1,
        message: null,
    };
}

export default sorterValidator;
