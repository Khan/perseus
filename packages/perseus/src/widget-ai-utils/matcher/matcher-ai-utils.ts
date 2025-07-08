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

export const getPromptJSON = (
    renderProps: React.ComponentProps<typeof matcher.widget>,
): MatcherPromptJSON => {
    const {userInput} = renderProps;
    return {
        type: "matcher",
        options: {
            labels: renderProps.labels,
            left: renderProps.left,
            right: renderProps.right,
            orderMatters: renderProps.orderMatters,
        },
        userInput: {
            left: userInput.left,
            right: userInput.right,
        },
    };
};
