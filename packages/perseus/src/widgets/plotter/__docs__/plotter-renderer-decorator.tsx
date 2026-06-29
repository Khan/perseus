import {generateTestPerseusRenderer} from "@khanacademy/perseus-core";
import * as React from "react";

import QuestionRendererForStories from "../../__testutils__/question-renderer-for-stories";

import type {APIOptions} from "../../../types";
import type {PerseusPlotterWidgetOptions} from "@khanacademy/perseus-core";
import type {Decorator} from "@storybook/react-vite";

// The plotter widget has no generator in perseus-core, so we define a sensible
// default here and let each story override individual fields via `args`. These
// defaults describe a small bar chart; stories switch `type` to render line,
// histogram, dotplot, and pic (pictograph) variants.
const defaultPlotterOptions: PerseusPlotterWidgetOptions = {
    type: "bar",
    labels: ["Category", "Value"],
    categories: ["A", "B", "C", "D"],
    // `starting` is the initial (pre-interaction) state captured by these
    // regression snapshots; `correct` is only used for scoring.
    starting: [2, 2, 2, 2],
    correct: [3, 5, 2, 4],
    maxY: 10,
    scaleY: 1,
    snapsPerLine: 1,
    labelInterval: 1,
    picUrl: "",
    plotDimensions: [380, 300],
};

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
                    "plotter 1": {
                        type: "plotter",
                        options: {...defaultPlotterOptions, ...args},
                    },
                },
            })}
            apiOptions={parameters?.apiOptions}
        />
    );
};
