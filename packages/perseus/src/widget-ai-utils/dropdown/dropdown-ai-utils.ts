import type dropdown from "../../widgets/dropdown/dropdown";
import type React from "react";

/**
 * JSON describing a dropdown widget. Intended for consumption by AI tools.
 * The dropdown widget displays a menu of options.
 */
export type DropdownPromptJSON = {
    type: "dropdown";

    /**
     * The configuration of the widget, set by the content creator.
     */
    options: {
        /** The choices present in the dropdown */
        items: ReadonlyArray<string>;
    };

    /**
     * The current state of the widget user interface. Usually represents a
     * learner's attempt to answer a question.
     */
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
