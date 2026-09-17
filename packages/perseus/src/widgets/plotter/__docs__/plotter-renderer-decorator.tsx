import {
    generateTestPerseusItem,
    generatePlotterOptions,
    generatePlotterWidget,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import * as React from "react";

import {ServerItemRendererWithDebugUI} from "../../../testing/server-item-renderer-with-debug-ui";

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
    const item = generateTestPerseusItem({
        question: generateTestPerseusRenderer({
            content: "[[☃ plotter 1]]",
            widgets: {
                "plotter 1": generatePlotterWidget({
                    options: generatePlotterOptions({...args}),
                }),
            },
        }),
    });

    return (
        <ServerItemRendererWithDebugUI
            item={item}
            apiOptions={parameters?.apiOptions}
        />
    );
};
