import {
    generateMeasurerOptions,
    generateMeasurerWidget,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import * as React from "react";

import QuestionRendererForStories from "../../__testutils__/question-renderer-for-stories";

import type {PerseusMeasurerWidgetOptions} from "@khanacademy/perseus-core";

export const measurerRendererDecorator = (
    _: unknown,
    {args}: {args: Partial<PerseusMeasurerWidgetOptions>},
) => {
    return (
        <QuestionRendererForStories
            question={generateTestPerseusRenderer({
                content: "[[☃ measurer 1]]",
                widgets: {
                    "measurer 1": generateMeasurerWidget({
                        options: generateMeasurerOptions(args),
                    }),
                },
            })}
        />
    );
};
