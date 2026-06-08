import {
    generateExpressionOptions,
    generateExpressionWidget,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import * as React from "react";

import QuestionRendererForStories from "../../__testutils__/question-renderer-for-stories";

import type {APIOptions} from "../../../types";
import type {Decorator} from "@storybook/react-vite";

export const expressionRendererDecorator: Decorator = (
    _,
    {
        args,
        parameters,
    }: {
        args: Record<string, unknown>;
        parameters?: {
            content?: string;
            apiOptions?: APIOptions;
        };
    },
) => {
    return (
        <QuestionRendererForStories
            question={generateTestPerseusRenderer({
                content: parameters?.content ?? "[[☃ expression 1]]",
                widgets: {
                    "expression 1": generateExpressionWidget({
                        options: generateExpressionOptions({
                            ...args,
                        }),
                    }),
                },
            })}
            apiOptions={parameters?.apiOptions}
        />
    );
};
