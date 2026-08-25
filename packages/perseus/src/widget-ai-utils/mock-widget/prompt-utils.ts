import type mockWidget from "../../widgets/mock-widgets/mock-widget";
import type React from "react";

export interface MockWidgetPromptJSON {
    type: "mock-widget";
    options: {
        value: string;
    };
    userInput: {
        value: string;
    };
}

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
