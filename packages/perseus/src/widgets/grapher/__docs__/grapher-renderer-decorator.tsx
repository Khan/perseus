import * as React from "react";

import QuestionRendererForStories from "../../__testutils__/question-renderer-for-stories";

import type {APIOptions} from "../../../types";
import type {PerseusRenderer, UserInputMap} from "@khanacademy/perseus-core";
import type {Decorator} from "@storybook/react-vite";

export const grapherRendererDecorator: Decorator = (
    _,
    {
        args,
        parameters,
    }: {
        args: Record<string, unknown>;
        parameters?: {
            apiOptions?: APIOptions;
            initialUserInput?: UserInputMap;
        };
    },
) => {
    // eslint-disable-next-line no-restricted-syntax
    const {question} = args as {question: PerseusRenderer};
    return (
        <QuestionRendererForStories
            question={question}
            apiOptions={parameters?.apiOptions}
            initialUserInput={parameters?.initialUserInput}
        />
    );
};
