import {
    generateCategorizerOptions,
    generateCategorizerWidget,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import * as React from "react";

import {registerWidgets} from "../../../widgets";
import QuestionRendererForStories from "../../__testutils__/question-renderer-for-stories";
import {categorizerRegistration} from "../index";

import type {APIOptions} from "../../../types";
import type {UserInputMap} from "@khanacademy/perseus-core";
import type {Decorator} from "@storybook/react-vite";

export const categorizerRendererDecorator: Decorator = (
    _,
    {
        args,
        parameters,
    }: {
        args: Record<string, unknown>;
        parameters?: {
            apiOptions?: APIOptions;
            initialUserInput?: UserInputMap;
            static?: boolean;
        };
    },
) => {
    registerWidgets([categorizerRegistration]);

    return (
        <QuestionRendererForStories
            question={generateTestPerseusRenderer({
                content: "[[☃ categorizer 1]]",
                widgets: {
                    "categorizer 1": generateCategorizerWidget({
                        static: parameters?.static ?? false,
                        options: generateCategorizerOptions({
                            ...args,
                        }),
                    }),
                },
            })}
            apiOptions={parameters?.apiOptions}
            initialUserInput={parameters?.initialUserInput}
        />
    );
};
