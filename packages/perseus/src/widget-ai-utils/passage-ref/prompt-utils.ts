import type {WidgetType} from "../../prompt-types";
import type passageRef from "../../widgets/passage-ref/passage-ref";
import type {PropsFor} from "@khanacademy/wonder-blocks-core";

type WidgetProps = PropsFor<typeof passageRef.widget>;

export type PassageRefPromptJSON = {
    type: WidgetType;
    options: {
        passageNumber: WidgetProps["passageNumber"];
        referenceNumber: WidgetProps["referenceNumber"];
        summaryText: WidgetProps["summaryText"];
    };
};

export const getPromptJSON = (
    renderProps: WidgetProps,
): PassageRefPromptJSON => {
    return {
        type: "passage-ref",
        options: {
            passageNumber: renderProps.passageNumber,
            referenceNumber: renderProps.referenceNumber,
            summaryText: renderProps.summaryText,
        },
    };
};
