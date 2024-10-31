import type matcher from "./matcher";
import type {WidgetType} from "../../prompt-types";
import type {PerseusMatcherUserInput} from "../../validation.types";
import type {PropsFor} from "@khanacademy/wonder-blocks-core";

type WidgetProps = PropsFor<typeof matcher.widget>;

export type MatcherPromptJSON = {
    type: WidgetType;
    options: {
        labels: WidgetProps["labels"];
        left: WidgetProps["left"];
        right: WidgetProps["right"];
        orderMatters: WidgetProps["orderMatters"];
    };
    userInput: {
        left: PerseusMatcherUserInput["left"];
        right: PerseusMatcherUserInput["right"];
    };
};

export const getPromptJSON = (
    renderProps: WidgetProps,
    userInput: PerseusMatcherUserInput,
): MatcherPromptJSON => {
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
