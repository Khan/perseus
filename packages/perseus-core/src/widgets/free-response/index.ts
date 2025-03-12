import getFreeResponsePublicWidgetOptions from "./free-response-util";

import type {PerseusFreeResponseWidgetOptions} from "../../data-schema";
import type {WidgetLogic} from "../logic-export.types";

export type FreeResponseDefaultWidgetOptions = Pick<
    PerseusFreeResponseWidgetOptions,
    "question" | "scoringCriteria" | "placeholder"
>;

const defaultWidgetOptions: FreeResponseDefaultWidgetOptions = {
    question: "",
    placeholder: "Please provide response here",
    // Always display one criterion, since the user will always have to input
    // at least one.
    scoringCriteria: [
        {
            text: "",
        },
    ],
};

const freeResponseWidgetLogic: WidgetLogic = {
    name: "free-response",
    defaultWidgetOptions,
    getPublicWidgetOptions: getFreeResponsePublicWidgetOptions,
};

export default freeResponseWidgetLogic;
