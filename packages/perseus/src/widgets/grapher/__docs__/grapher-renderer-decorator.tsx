import * as React from "react";

import QuestionRendererForStories from "../../__testutils__/question-renderer-for-stories";

import type {APIOptions} from "../../../types";
import type {PerseusRenderer, UserInputMap} from "@khanacademy/perseus-core";
import type {Decorator} from "@storybook/react-vite";

function hasQuestionArg(
    args: Record<string, unknown>,
): args is {question: PerseusRenderer} {
    return "question" in args;
}

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
    if (!hasQuestionArg(args)) {
        throw new Error("grapherRendererDecorator requires a `question` arg");
    }
    return (
        <QuestionRendererForStories
            question={args.question}
            apiOptions={parameters?.apiOptions}
            initialUserInput={parameters?.initialUserInput}
        />
    );
};
