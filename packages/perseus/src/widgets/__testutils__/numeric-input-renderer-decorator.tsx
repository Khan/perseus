import {
    generateNumericInputOptions,
    generateNumericInputWidget,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import * as React from "react";

import QuestionRendererForStories from "./question-renderer-for-stories";

import type {APIOptions} from "../../types";
import type {UserInputMap} from "@khanacademy/perseus-core";

export const numericInputRendererDecorator = (
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
                content:
                    parameters?.content ??
                    "Registry numbers for USS Enterprise: [[☃ numeric-input 1]]",
                widgets: {
                    "numeric-input 1": generateNumericInputWidget({
                        options: generateNumericInputOptions({
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
