import {getFreeResponsePublicWidgetOptions} from "./free-response-util";

import type {FreeResponsePublicWidgetOptions} from "./free-response-util";
import type {PerseusFreeResponseWidgetOptions} from "../../data-schema";
import type {WidgetLogic} from "../logic-export.types";

const defaultWidgetOptions: PerseusFreeResponseWidgetOptions = {
    allowUnlimitedCharacters: false,
    characterLimit: 500,
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

const freeResponseWidgetLogic = {
    name: "free-response",
    defaultWidgetOptions,
    getPublicWidgetOptions: getFreeResponsePublicWidgetOptions,
} satisfies WidgetLogic<
    "free-response",
    PerseusFreeResponseWidgetOptions,
    FreeResponsePublicWidgetOptions
>;

export default freeResponseWidgetLogic;
