import {
    generatePlotterOptions,
    generatePlotterWidget,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import * as React from "react";

import QuestionRendererForStories from "../../__testutils__/question-renderer-for-stories";

import type {APIOptions} from "../../../types";
import type {PerseusPlotterWidgetOptions} from "@khanacademy/perseus-core";
import type {Decorator} from "@storybook/react-vite";

export const plotterRendererDecorator: Decorator = (
    _,
    {
        args,
        parameters,
    }: {
        args: Partial<PerseusPlotterWidgetOptions>;
        parameters?: {apiOptions?: APIOptions};
    },
) => {
    return (
        <QuestionRendererForStories
            question={generateTestPerseusRenderer({
                content: "[[☃ plotter 1]]",
                widgets: {
                    "plotter 1": generatePlotterWidget({
                        options: generatePlotterOptions({...args}),
                    }),
                },
            })}
            apiOptions={parameters?.apiOptions}
        />
    );
};
