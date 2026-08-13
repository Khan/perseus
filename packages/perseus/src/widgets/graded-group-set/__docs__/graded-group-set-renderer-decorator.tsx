import {
    generateGradedGroupSetWidget,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import * as React from "react";

import QuestionRendererForStories from "../../__testutils__/question-renderer-for-stories";

import type {APIOptions} from "../../../types";
import type {PerseusGradedGroupSetWidgetOptions} from "@khanacademy/perseus-core";
import type {Decorator} from "@storybook/react-vite";

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
