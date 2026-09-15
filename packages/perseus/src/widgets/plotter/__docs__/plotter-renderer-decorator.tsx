import {
    generatePlotterOptions,
    generatePlotterWidget,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import * as React from "react";

import {registerWidgets} from "../../../widgets";
import QuestionRendererForStories from "../../__testutils__/question-renderer-for-stories";
import {plotterRegistration} from "../index";

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
    registerWidgets([plotterRegistration]);

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
