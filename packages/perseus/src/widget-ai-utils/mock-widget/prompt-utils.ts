import type mockWidget from "../../widgets/mock-widgets/mock-widget";
import type {PerseusMockWidgetUserInput} from "../../widgets/mock-widgets/mock-widget-types";
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
    userInput: PerseusMockWidgetUserInput,
): MockWidgetPromptJSON => {
    return {
        type: "mock-widget",
        options: {
            value: renderProps.value,
        },
        userInput: {
            value: userInput.currentValue,
        },
    };
};
