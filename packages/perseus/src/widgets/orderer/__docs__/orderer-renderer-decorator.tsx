import {generateTestPerseusRenderer} from "@khanacademy/perseus-core";
import * as React from "react";

import QuestionRendererForStories from "../../__testutils__/question-renderer-for-stories";

import type {APIOptions} from "../../../types";
import type {
    PerseusOrdererWidgetOptions,
    PerseusRenderer,
    UserInputMap,
} from "@khanacademy/perseus-core";
import type {Decorator} from "@storybook/react-vite";

const defaultOptions: PerseusOrdererWidgetOptions = {
    options: [],
    correctOptions: [],
    otherOptions: [],
    height: "normal",
    layout: "horizontal",
};

export const ordererRendererDecorator: Decorator = (
    _,
    {
        args,
        parameters,
    }: {
        args: Partial<PerseusOrdererWidgetOptions>;
        parameters?: {
            apiOptions?: APIOptions;
            content?: string;
            initialUserInput?: UserInputMap;
            static?: boolean;
        };
    },
) => {
    return (
        <QuestionRendererForStories
            apiOptions={parameters?.apiOptions}
            initialUserInput={parameters?.initialUserInput}
            question={generateTestPerseusRenderer({
                content: parameters?.content ?? "[[☃ orderer 1]]",
                widgets: {
                    "orderer 1": {
                        version: {major: 0, minor: 0},
                        type: "orderer",
                        graded: true,
                        static: parameters?.static ?? false,
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

export const generateCard = (content: string): PerseusRenderer => ({
    content,
    images: {},
    widgets: {},
});
