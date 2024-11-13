import type gradedGroupSet from "../../widgets/graded-group-set";
import type {GradedGroupPromptJSON} from "../graded-group/prompt-utils";
import type React from "react";

export type GradedGroupSetPromptJSON = {
    type: "graded-group-set";
    options: {
        groupCount: number;
        currentGroup: GradedGroupPromptJSON;
    };
};

export const getPromptJSON = (
    renderProps: React.ComponentProps<typeof gradedGroupSet.widget>,
    activeGroupJSON: GradedGroupPromptJSON,
): GradedGroupSetPromptJSON => {
    return {
        type: "graded-group-set",
        options: {
            groupCount: renderProps.gradedGroups.length,
            currentGroup: activeGroupJSON,
        },
    };
};
