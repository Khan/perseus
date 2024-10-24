import type {PerseusDropdownUserInput} from "@khanacademy/perseus-score";
import type React from "react";
import type dropdown from "../../widgets/dropdown/dropdown";

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
