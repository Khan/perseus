import {generatePolarGraphQuestion} from "@khanacademy/perseus-core";
import * as React from "react";

import QuestionRendererForStories from "../../__testutils__/question-renderer-for-stories";

import type {APIOptions} from "../../../types";
import type {
    PerseusPolarGraphWidgetOptions,
    UserInputMap,
} from "@khanacademy/perseus-core";
import type {Decorator} from "@storybook/react-vite";

/** Renders a story's args as the options of one polar-graph widget. */
export const polarGraphRendererDecorator: Decorator = (
    _,
    {
        args,
        parameters,
    }: {
        args: Partial<PerseusPolarGraphWidgetOptions>;
        parameters?: {
            apiOptions?: APIOptions;
            initialUserInput?: UserInputMap;
            content?: string;
            isStatic?: boolean;
            graded?: boolean;
        };
    },
) => {
    return (
        <QuestionRendererForStories
            question={generatePolarGraphQuestion({
                ...args,
                content: parameters?.content,
                isStatic: parameters?.isStatic,
                graded: parameters?.graded,
            })}
            apiOptions={parameters?.apiOptions}
            initialUserInput={parameters?.initialUserInput}
        />
    );
};
