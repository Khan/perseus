import {
    generateExplanationOptions,
    generateExplanationWidget,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import * as React from "react";

import QuestionRendererForStories from "../../__testutils__/question-renderer-for-stories";

import type {APIOptions} from "../../../types";
import type {
    ExplanationDefaultWidgetOptions,
    PerseusWidgetsMap,
} from "@khanacademy/perseus-core";
import type {Decorator} from "@storybook/react-vite";

export const explanationRendererDecorator: Decorator = (
    _,
    {
        args,
        parameters,
    }: {
        args: Partial<ExplanationDefaultWidgetOptions>;
        parameters?: {
            apiOptions?: APIOptions;
            content?: string;
            widgets?: PerseusWidgetsMap;
        };
    },
) => {
    return (
        <QuestionRendererForStories
            question={generateTestPerseusRenderer({
                content:
                    parameters?.content ??
                    "Here's the explanation\n[[☃ explanation 1]]\nDid you get that?",
                widgets: {
                    "explanation 1": generateExplanationWidget({
                        options: generateExplanationOptions({
                            ...args,
                            ...(parameters?.widgets
                                ? {widgets: parameters.widgets}
                                : {}),
                        }),
                    }),
                },
            })}
            apiOptions={parameters?.apiOptions}
        />
    );
};
