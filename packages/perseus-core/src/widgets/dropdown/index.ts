import {getDropdownPublicWidgetOptions} from "./dropdown-util";

import type {DropdownPublicWidgetOptions} from "./dropdown-util";
import type {PerseusDropdownWidgetOptions} from "../../data-schema";
import type {WidgetLogic} from "../logic-export.types";

const defaultWidgetOptions: PerseusDropdownWidgetOptions = {
    placeholder: "",
    choices: [
        {
            content: "",
            correct: false,
        },
    ],
};

const dropdownWidgetLogic = {
    name: "dropdown",
    defaultWidgetOptions,
    defaultAlignment: "inline-block",
    getPublicWidgetOptions: getDropdownPublicWidgetOptions,
    accessible: true,
} satisfies WidgetLogic<
    "dropdown",
    PerseusDropdownWidgetOptions,
    DropdownPublicWidgetOptions
>;

export default dropdownWidgetLogic;
