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
    widgetData: React.ComponentProps<typeof dropdown.widget>,
): DropdownPromptJSON => {
    return {
        type: "dropdown",
        options: {
            items: widgetData.choices.map((choice) => choice.content),
        },
        userInput: {
            // Offset to account for placeholder
            selectedIndex: widgetData.userInput.value - 1,
        },
    };
};
