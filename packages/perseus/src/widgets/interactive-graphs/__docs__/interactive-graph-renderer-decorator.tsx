import {
    generateInteractiveGraphQuestion,
    generateTestPerseusItem,
    splitPerseusItem,
} from "@khanacademy/perseus-core";
import * as React from "react";

import {registerWidgets} from "../../../widgets";
import QuestionRendererForStories from "../../__testutils__/question-renderer-for-stories";
import {interactiveGraphRegistration} from "../index";

import type {APIOptions} from "../../../types";
import type {
    PerseusInteractiveGraphWidgetOptions,
    PerseusRenderer,
    UserInputMap,
} from "@khanacademy/perseus-core";

export const interactiveGraphRendererDecorator = (
    _,
    {
        args,
        parameters,
    }: {
        args: Partial<PerseusInteractiveGraphWidgetOptions>;
        parameters?: {
            apiOptions?: APIOptions;
            initialUserInput?: UserInputMap;
            content?: string;
            isStatic?: boolean;
            graded?: boolean;
            // Escape hatch for stories that need a fully pre-built question.
            question?: PerseusRenderer;
            // Render the question with its answers stripped. Splitting needs
            // the widget registered, so it happens here rather than at module
            // load.
            answerless?: boolean;
        };
    },
) => {
    registerWidgets([interactiveGraphRegistration]);

    const question =
        parameters?.question ??
        generateInteractiveGraphQuestion({
            ...args,
            content: parameters?.content,
            isStatic: parameters?.isStatic,
            graded: parameters?.graded,
        });

    return (
        <QuestionRendererForStories
            question={
                parameters?.answerless
                    ? splitPerseusItem(generateTestPerseusItem({question}))
                          .question
                    : question
            }
            apiOptions={parameters?.apiOptions}
            initialUserInput={parameters?.initialUserInput}
        />
    );
};
