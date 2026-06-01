import {
    generateMatrixOptions,
    generateMatrixWidget,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import * as React from "react";

import QuestionRendererForStories from "../../__testutils__/question-renderer-for-stories";

import type {APIOptions} from "../../../types";
import type {UserInputMap} from "@khanacademy/perseus-core";
import type {Decorator} from "@storybook/react-vite";

export const matrixRendererDecorator: Decorator = (
    _,
    {
        args,
        parameters,
    }: {
        args: Record<string, unknown>;
        parameters?: {
            content?: string;
            apiOptions?: APIOptions;
            initialUserInput?: UserInputMap;
        };
    },
) => {
    return (
        <QuestionRendererForStories
            question={generateTestPerseusRenderer({
                content: parameters?.content ?? "[[☃ matrix 1]]",
                widgets: {
                    "matrix 1": generateMatrixWidget({
                        options: generateMatrixOptions({
                            ...args,
                        }),
                    }),
                },
            })}
            apiOptions={parameters?.apiOptions}
            initialUserInput={parameters?.initialUserInput}
        />
    );
};
