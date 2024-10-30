import {WidgetType} from "../../prompt-types";

import type {Dropdown} from "./dropdown";
import type {PerseusDropdownUserInput} from "../../validation.types";
import type {PropsFor} from "@khanacademy/wonder-blocks-core";

export type DropdownPromptJSON = {
    type: WidgetType;
    options: {
        items: PropsFor<typeof Dropdown>["choices"];
    };
    userInput: {
        selectedIndex: PerseusDropdownUserInput["value"];
    };
};

export const getPromptJSON = (
    renderProps: PropsFor<typeof Dropdown>,
    userInput: PerseusDropdownUserInput,
): DropdownPromptJSON => {
    return {
        type: WidgetType.DROPDOWN,
        options: {
            items: renderProps.choices,
        },
        userInput: {
            selectedIndex: userInput.value - 1, // Offset to account for placeholder
        },
    };
};
