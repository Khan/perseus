import {generateTestPerseusRenderer} from "@khanacademy/perseus-core";
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
        parameters?: {apiOptions?: APIOptions; initialUserInput?: UserInputMap};
    },
) => {
    return (
        <QuestionRendererForStories
            question={generateTestPerseusRenderer({
                content: "[[☃ number-line 1]]",
                widgets: {
                    "number-line 1": {
                        type: "number-line",
                        graded: true,
                        static: args.static ?? false,
                        alignment: "default",
                        // eslint-disable-next-line no-restricted-syntax -- args is Partial<T>; all required fields have defaults, but TypeScript can't verify spread completeness at compile time
                        options: {
                            range: [-4, 4],
                            labelRange: [null, null],
                            labelStyle: "decimal",
                            labelTicks: true,
                            isInequality: false,
                            isTickCtrl: false,
                            divisionRange: [1, 10],
                            numDivisions: null,
                            snapDivisions: 2,
                            tickStep: 1,
                            correctRel: "eq",
                            correctX: null,
                            initialX: null,
                            showTooltips: false,
                            static: false,
                            ...args,
                        } as PerseusNumberLineWidgetOptions,
                    },
                },
            })}
            apiOptions={parameters?.apiOptions}
            initialUserInput={parameters?.initialUserInput}
        />
    );
};
