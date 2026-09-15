import {
    generateSorterOptions,
    generateSorterWidget,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import * as React from "react";

import {registerWidgets} from "../../../widgets";
import QuestionRendererForStories from "../../__testutils__/question-renderer-for-stories";
import {sorterRegistration} from "../index";

import type {APIOptions} from "../../../types";
import type {PerseusSorterWidgetOptions} from "@khanacademy/perseus-core";
import type {Decorator} from "@storybook/react-vite";

export const sorterRendererDecorator: Decorator = (
    _,
    {
        args,
        parameters,
    }: {
        args: Partial<PerseusSorterWidgetOptions>;
        parameters?: {apiOptions?: APIOptions};
    },
) => {
    registerWidgets([sorterRegistration]);

    return (
        <QuestionRendererForStories
            question={generateTestPerseusRenderer({
                content: "Arrange these items in order. [[☃ sorter 1]]",
                widgets: {
                    "sorter 1": generateSorterWidget({
                        options: generateSorterOptions({...args}),
                    }),
                },
            })}
            apiOptions={parameters?.apiOptions}
        />
    );
};
