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

const dropdownWidgetLogic: WidgetLogic<
    PerseusDropdownWidgetOptions,
    DropdownPublicWidgetOptions
> = {
    name: "dropdown",
    defaultWidgetOptions,
    defaultAlignment: "inline-block",
    getPublicWidgetOptions: getDropdownPublicWidgetOptions,
    accessible: true,
};

export default dropdownWidgetLogic;
