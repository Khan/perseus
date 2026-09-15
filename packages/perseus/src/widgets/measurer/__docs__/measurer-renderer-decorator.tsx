import {
    generateMeasurerOptions,
    generateMeasurerWidget,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import * as React from "react";

import {registerWidgets} from "../../../widgets";
import QuestionRendererForStories from "../../__testutils__/question-renderer-for-stories";
import {measurerRegistration} from "../index";

import type {PerseusMeasurerWidgetOptions} from "@khanacademy/perseus-core";

export const measurerRendererDecorator = (
    _: unknown,
    {args}: {args: Partial<PerseusMeasurerWidgetOptions>},
) => {
    registerWidgets([measurerRegistration]);

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
