import {
    generateNumberLineOptions,
    generateNumberLineWidget,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import * as React from "react";

import QuestionRendererForStories from "../../__testutils__/question-renderer-for-stories";

import type {APIOptions} from "../../../types";
import type {
    PerseusNumberLineWidgetOptions,
    UserInputMap,
} from "@khanacademy/perseus-core";
import type {Decorator} from "@storybook/react-vite";

export const numberLineRendererDecorator: Decorator = (
    _,
    {
        args,
        parameters,
    }: {
        args: Partial<PerseusNumberLineWidgetOptions>;
        parameters?: {
            apiOptions?: APIOptions;
            initialUserInput?: UserInputMap;
            static?: boolean;
        };
    },
) => {
    return (
        <QuestionRendererForStories
            question={generateTestPerseusRenderer({
                content: "[[☃ number-line 1]]",
                widgets: {
                    "number-line 1": generateNumberLineWidget({
                        static: parameters?.static ?? false,
                        options: generateNumberLineOptions(args),
                    }),
                },
            })}
            apiOptions={parameters?.apiOptions}
            initialUserInput={parameters?.initialUserInput}
        />
    );
};
