import {
    generateGradedGroupOptions,
    generateGradedGroupSetWidget,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import * as React from "react";

import QuestionRendererForStories from "../../__testutils__/question-renderer-for-stories";

import type {APIOptions} from "../../../types";
import type {PerseusGradedGroupSetWidgetOptions} from "@khanacademy/perseus-core";
import type {Decorator} from "@storybook/react-vite";

// Two graded groups whose content is plain text (no child widget), so snapshots
// stay focused on the graded-group-set chrome — the title and indicator pips —
// and aren't coupled to any other widget's visuals. Shared by the initial-state
// and interactions regression stories.
export const twoGroupArgs: Partial<PerseusGradedGroupSetWidgetOptions> = {
    gradedGroups: [
        generateGradedGroupOptions({
            title: "Problem 1a",
            content: "The first problem in the set.",
        }),
        generateGradedGroupOptions({
            title: "Problem 1b",
            content: "The second problem in the set.",
        }),
    ],
};

export const gradedGroupSetRendererDecorator: Decorator = (
    _,
    {
        args,
        parameters,
    }: {
        args: Partial<PerseusGradedGroupSetWidgetOptions>;
        parameters?: {apiOptions?: APIOptions};
    },
) => {
    return (
        <QuestionRendererForStories
            question={generateTestPerseusRenderer({
                content: "[[☃ graded-group-set 1]]",
                widgets: {
                    "graded-group-set 1": generateGradedGroupSetWidget({
                        options: {gradedGroups: [], ...args},
                    }),
                },
            })}
            apiOptions={parameters?.apiOptions}
        />
    );
};
