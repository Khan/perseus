import {
    generateMeasurerOptions,
    generateMeasurerWidget,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import * as React from "react";

import QuestionRendererForStories from "../../__testutils__/question-renderer-for-stories";

export const measurerRendererDecorator = (_, {args}) => {
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
