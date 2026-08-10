import {generateTestPerseusRenderer} from "@khanacademy/perseus-core";
import * as React from "react";

import QuestionRendererForStories from "../../__testutils__/question-renderer-for-stories";

import type {
    PerseusOrdererWidgetOptions,
    PerseusRenderer,
    UserInputMap,
} from "@khanacademy/perseus-core";

// No orderer-widget-generator exists in @khanacademy/perseus-core, so the
// widget object is built directly here rather than via a generateOrdererWidget/
// generateOrdererOptions pair (the pattern every other renderer-decorator uses).
const defaultOptions: PerseusOrdererWidgetOptions = {
    options: [],
    correctOptions: [],
    otherOptions: [],
    height: "normal",
    layout: "horizontal",
};

export const ordererRendererDecorator = (
    _: unknown,
    {
        args,
        parameters,
    }: {
        args: Partial<PerseusOrdererWidgetOptions>;
        parameters?: {
            content?: string;
            initialUserInput?: UserInputMap;
        };
    },
) => {
    return (
        <QuestionRendererForStories
            initialUserInput={parameters?.initialUserInput}
            question={generateTestPerseusRenderer({
                content: parameters?.content ?? "[[☃ orderer 1]]",
                widgets: {
                    "orderer 1": {
                        version: {major: 0, minor: 0},
                        type: "orderer",
                        graded: true,
                        options: {
                            ...defaultOptions,
                            ...args,
                        },
                    },
                },
            })}
        />
    );
};

export const card = (content: string): PerseusRenderer => ({
    content,
    images: {},
    widgets: {},
});
