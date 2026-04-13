import type gradedGroupSet from "../../widgets/graded-group-set";
import type {GradedGroupPromptJSON} from "../graded-group/graded-group-ai-utils";
import type React from "react";

/**
 * JSON describing a graded group set widget. Intended for consumption by AI tools.
 * A graded group set displays several review questions (GradedGroups) in a
 * carousel-like UI. The learner's score on a graded group set is not recorded.
 * Graded group sets are provided for learners to check their own understanding
 * of a concept.
 */
export type GradedGroupSetPromptJSON = {
    type: "graded-group-set";

    /** The configuration of the widget, set by the content creator. */
    options: {
        /** The number of questions (`GradedGroup`s) in this widget */
        groupCount: number;

        /** The currently-displayed question */
        currentGroup: GradedGroupPromptJSON;
    };
};

export const getPromptJSON = (
    widgetData: React.ComponentProps<typeof gradedGroupSet.widget>,
    activeGroupJSON: GradedGroupPromptJSON,
): GradedGroupSetPromptJSON => {
    return {
        type: "graded-group-set",
        options: {
            groupCount: widgetData.gradedGroups.length,
            currentGroup: activeGroupJSON,
        },
    };
};
