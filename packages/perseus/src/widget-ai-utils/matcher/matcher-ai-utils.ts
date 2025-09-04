import type matcher from "../../widgets/matcher/matcher";
import type React from "react";

export type MatcherPromptJSON = {
    type: "matcher";
    options: {
        labels: ReadonlyArray<string>;
        left: ReadonlyArray<string>;
        right: ReadonlyArray<string>;
        orderMatters: boolean;
    };
    userInput: {
        left: ReadonlyArray<string>;
        right: ReadonlyArray<string>;
    };
};

export type widgetDataPartial = Pick<
    React.ComponentProps<typeof matcher.widget>,
    "userInput" | "labels" | "left" | "right" | "orderMatters"
>;

export const getPromptJSON = (
    widgetData: widgetDataPartial,
): MatcherPromptJSON => {
    const {userInput} = widgetData;
    return {
        type: "matcher",
        options: {
            labels: widgetData.labels,
            left: widgetData.left,
            right: widgetData.right,
            orderMatters: widgetData.orderMatters,
        },
        userInput: {
            left: userInput.left,
            right: userInput.right,
        },
    };
};
