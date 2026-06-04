import {
    generateDefinitionOptions,
    generateDefinitionWidget,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import * as React from "react";

import QuestionRendererForStories from "../../__testutils__/question-renderer-for-stories";

import type {APIOptions} from "../../../types";

export const definitionRendererDecorator = (
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
                content: parameters?.content ?? "[[☃ definition 1]]",
                widgets: {
                    "definition 1": generateDefinitionWidget({
                        options: generateDefinitionOptions({
                            ...args,
                        }),
                    }),
                },
            })}
            apiOptions={parameters?.apiOptions}
        />
    );
};
