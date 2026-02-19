import getDropdownPublicWidgetOptions from "./dropdown-util";

import type {PerseusDropdownWidgetOptions} from "../../data-schema";
import type {WidgetLogic} from "../logic-export.types";

export type DropdownDefaultWidgetOptions = Pick<
    PerseusDropdownWidgetOptions,
    "placeholder" | "choices"
>;

function initializeWidgetOptions(): DropdownDefaultWidgetOptions {
    return {
        placeholder: "",
        choices: [
            {
                content: "",
                correct: false,
            },
        ],
    };
}

const dropdownWidgetLogic: WidgetLogic<DropdownDefaultWidgetOptions> = {
    name: "dropdown",
    initializeWidgetOptions,
    defaultAlignment: "inline-block",
    getPublicWidgetOptions: getDropdownPublicWidgetOptions,
    accessible: true,
};

export default dropdownWidgetLogic;
