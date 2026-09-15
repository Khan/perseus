import {
    generateDefinitionOptions,
    generateDefinitionWidget,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import * as React from "react";

import {registerWidgets} from "../../../widgets";
import QuestionRendererForStories from "../../__testutils__/question-renderer-for-stories";
import {definitionRegistration} from "../index";

import type {APIOptions} from "../../../types";
import type {PerseusDefinitionWidgetOptions} from "@khanacademy/perseus-core";
import type {Decorator} from "@storybook/react-vite";

export const definitionRendererDecorator: Decorator = (
    _,
    {
        args,
        parameters,
    }: {
        args: Partial<PerseusDefinitionWidgetOptions>;
        parameters?: {
            content?: string;
            apiOptions?: APIOptions;
        };
    },
) => {
    registerWidgets([definitionRegistration]);

    return (
        <QuestionRendererForStories
            question={generateTestPerseusRenderer({
                content: parameters?.content ?? "[[☃ definition 1]]",
                widgets: {
                    "definition 1": generateDefinitionWidget({
                        options: generateDefinitionOptions({
                            ...args,
                        }),
                    }),
                },
            })}
            apiOptions={parameters?.apiOptions}
        />
    );
};
