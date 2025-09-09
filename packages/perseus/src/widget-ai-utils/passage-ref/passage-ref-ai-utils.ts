import type passageRef from "../../widgets/passage-ref/passage-ref";
import type React from "react";

export type PassageRefPromptJSON = {
    type: "passage-ref";
    options: {
        passageNumber: number;
        referenceNumber: number;
        summaryText: string;
    };
};

export const getPromptJSON = (
    widgetData: React.ComponentProps<typeof passageRef.widget>,
): PassageRefPromptJSON => {
    return {
        type: "passage-ref",
        options: {
            passageNumber: widgetData.passageNumber,
            referenceNumber: widgetData.referenceNumber,
            summaryText: widgetData.summaryText ?? "",
        },
    };
};
