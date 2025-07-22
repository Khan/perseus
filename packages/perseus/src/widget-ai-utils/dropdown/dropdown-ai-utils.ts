import type dropdown from "../../widgets/dropdown/dropdown";
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
): DropdownPromptJSON => {
    return {
        type: "dropdown",
        options: {
            items: renderProps.choices,
        },
        userInput: {
            // Offset to account for placeholder
            selectedIndex: renderProps.userInput.value - 1,
        },
    };
};
