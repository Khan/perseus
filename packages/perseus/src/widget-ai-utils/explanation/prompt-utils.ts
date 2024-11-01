import type {WidgetType} from "../../prompt-types";
import type explanation from "../../widgets/explanation/explanation";
import type {PropsFor} from "@khanacademy/wonder-blocks-core";

export type ExplanationPromptJSON = {
    type: WidgetType;
    showPrompt: PropsFor<typeof explanation.widget>["showPrompt"];
    explanation: PropsFor<typeof explanation.widget>["explanation"];
};

export const getPromptJSON = (
    renderProps: PropsFor<typeof explanation.widget>,
): ExplanationPromptJSON => {
    return {
        type: "explanation",
        showPrompt: renderProps.showPrompt || "",
        explanation: renderProps.explanation || "",
    };
};
