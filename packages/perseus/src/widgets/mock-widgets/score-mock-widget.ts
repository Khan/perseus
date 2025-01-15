import type {
    PerseusMockWidgetUserInput,
    PerseusMockWidgetRubric,
} from "./mock-widget-types";
import type {PerseusStrings} from "../../strings";
import type {PerseusScore} from "@khanacademy/perseus";

function scoreMockWidget(
    userInput: PerseusMockWidgetUserInput,
    rubric: PerseusMockWidgetRubric,
    strings: PerseusStrings,
): PerseusScore {
    if (userInput.currentValue == null || userInput.currentValue === "") {
        return {
            type: "invalid",
            message: "No value provided",
        };
    }
    return {
        type: "points",
        earned: userInput.currentValue === rubric.value ? 1 : 0,
        total: 1,
        message: "",
    };
}

export default scoreMockWidget;
