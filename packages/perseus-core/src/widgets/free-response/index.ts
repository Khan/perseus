import getFreeResponsePublicWidgetOptions from "./free-response-util";

import type {PerseusFreeResponseWidgetOptions} from "../../data-schema";
import type {WidgetLogic} from "../logic-export.types";

export type FreeResponseDefaultWidgetOptions = Pick<
    PerseusFreeResponseWidgetOptions,
    "placeholder" | "question" | "scoringCriteria"
>;

const defaultWidgetOptions: FreeResponseDefaultWidgetOptions = {
    placeholder: "Please provide response here",
    question: "",
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
