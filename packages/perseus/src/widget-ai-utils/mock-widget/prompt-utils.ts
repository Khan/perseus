import type mockWidget from "../../widgets/mock-widgets/mock-widget";
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

export const getPromptJSON = (
    renderProps: React.ComponentProps<typeof mockWidget.widget>,
): MockWidgetPromptJSON => {
    return {
        type: "mock-widget",
        options: {
            value: renderProps.value,
        },
        userInput: {
            value: renderProps.userInput.currentValue,
        },
    };
};
