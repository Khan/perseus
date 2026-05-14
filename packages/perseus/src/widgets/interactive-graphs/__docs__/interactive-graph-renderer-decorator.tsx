import {generateInteractiveGraphQuestion} from "@khanacademy/perseus-core";
import * as React from "react";

import QuestionRendererForStories from "../../__testutils__/question-renderer-for-stories";

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
            // Escape hatch for stories that need a fully pre-built question
            // (e.g. answerless data created via splitPerseusItem).
            question?: PerseusRenderer;
        };
    },
) => {
    return (
        <QuestionRendererForStories
            question={
                parameters?.question ??
                generateInteractiveGraphQuestion({
                    ...args,
                    content: parameters?.content,
                    isStatic: parameters?.isStatic,
                    graded: parameters?.graded,
                })
            }
            apiOptions={parameters?.apiOptions}
            initialUserInput={parameters?.initialUserInput}
        />
    );
};
