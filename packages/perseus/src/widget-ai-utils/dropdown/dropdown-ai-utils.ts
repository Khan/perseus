import type dropdown from "../../widgets/dropdown/dropdown";
import type {PerseusDropdownUserInput} from "@khanacademy/perseus-core";
import type React from "react";

export type DropdownPromptJSON = {
    type: "dropdown";
    options: {
        items: ReadonlyArray<string>;
    };
    userInput: {
        selectedIndex: number;
    };
};

export const getPromptJSON = (
    renderProps: React.ComponentProps<typeof dropdown.widget>,
    userInput: PerseusDropdownUserInput,
): DropdownPromptJSON => {
    return {
        type: "dropdown",
        options: {
            items: renderProps.choices,
        },
        userInput: {
            selectedIndex: userInput.value - 1, // Offset to account for placeholder
        },
    };
};
