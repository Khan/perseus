import {
    generateDropdownOptions,
    generateDropdownWidget,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import * as React from "react";

import QuestionRendererForStories from "../../__testutils__/question-renderer-for-stories";

import type {APIOptions} from "../../../types";
import type {DropdownDefaultWidgetOptions} from "@khanacademy/perseus-core";
import type {Decorator} from "@storybook/react-vite";

export const dropdownRendererDecorator: Decorator = (
    _,
    {
        args,
        parameters,
    }: {
        args: Partial<DropdownDefaultWidgetOptions>;
        parameters?: {
            apiOptions?: APIOptions;
            content?: string;
        };
    },
) => {
    return (
        <QuestionRendererForStories
            question={generateTestPerseusRenderer({
                content:
                    parameters?.content ??
                    "Select an answer: [[☃ dropdown 1]]",
                widgets: {
                    "dropdown 1": generateDropdownWidget({
                        options: generateDropdownOptions({
                            ...args,
                        }),
                    }),
                },
            })}
            apiOptions={parameters?.apiOptions}
        />
    );
};
