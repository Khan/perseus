import type mockWidget from "../../testing/mock-widgets/mock-widget";
import type React from "react";

export type MockWidgetPromptJSON = {
    type: "mock-widget";
    options: {
        value: string;
    };
    userInput: {
        value: string;
    };
};

/**
 * @internal
 * The mock widget is only used in tests.
 */
export const getPromptJSON = (
    widgetData: React.ComponentProps<typeof mockWidget.widget>,
): MockWidgetPromptJSON => {
    return {
        type: "mock-widget",
        options: {
            value: widgetData.options.value,
        },
        userInput: {
            value: widgetData.userInput.currentValue,
        },
    };
};
