import * as React from "react";

import {registerWidgets} from "../../../widgets";
import QuestionRendererForStories from "../../__testutils__/question-renderer-for-stories";
import {grapherRegistration} from "../index";

import type {APIOptions} from "../../../types";
import type {PerseusRenderer, UserInputMap} from "@khanacademy/perseus-core";
import type {Decorator} from "@storybook/react-vite";

export const grapherRendererDecorator: Decorator<{
    question: PerseusRenderer;
}> = (
    _,
    {
        args,
        parameters,
    }: {
        args: {question: PerseusRenderer};
        parameters?: {
            apiOptions?: APIOptions;
            initialUserInput?: UserInputMap;
        };
    },
) => {
    registerWidgets([grapherRegistration]);

    return (
        <QuestionRendererForStories
            question={args.question}
            apiOptions={parameters?.apiOptions}
            initialUserInput={parameters?.initialUserInput}
        />
    );
};
