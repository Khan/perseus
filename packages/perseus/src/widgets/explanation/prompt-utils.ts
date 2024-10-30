import {WidgetType} from "../../prompt-types";

import type explanation from "./explanation";
import type {PropsFor} from "@khanacademy/wonder-blocks-core";

export type ExplanationPromptJSON = {
    type: WidgetType;
    showPrompt: PropsFor<typeof explanation.widget>["showPrompt"];
    hidePrompt: PropsFor<typeof explanation.widget>["hidePrompt"];
    explanation: PropsFor<typeof explanation.widget>["explanation"];
};

export const getPromptJSON = (
    renderProps: PropsFor<typeof explanation.widget>,
): ExplanationPromptJSON => {
    return {
        type: WidgetType.EXPLANATION,
        showPrompt: renderProps.showPrompt || "",
        hidePrompt: renderProps.hidePrompt || "",
        explanation: renderProps.explanation || "",
    };
};
