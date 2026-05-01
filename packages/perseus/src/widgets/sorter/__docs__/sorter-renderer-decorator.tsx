import {generateTestPerseusRenderer} from "@khanacademy/perseus-core";
import * as React from "react";

import QuestionRendererForStories from "../../__testutils__/question-renderer-for-stories";

import type {
    PerseusSorterWidgetOptions,
    SorterWidget,
} from "@khanacademy/perseus-core";

export const sorterRendererDecorator = (_, {args, parameters}) => {
    const options: PerseusSorterWidgetOptions = {
        correct: args.correct ?? ["Item 1", "Item 2", "Item 3"],
        padding: args.padding ?? true,
        layout: args.layout ?? "horizontal",
    };

    const widget: SorterWidget = {
        type: "sorter",
        graded: true,
        version: {major: 0, minor: 0},
        options,
    };

    return (
        <QuestionRendererForStories
            question={generateTestPerseusRenderer({
                content: parameters?.content ?? "[[☃ sorter 1]]",
                widgets: {
                    "sorter 1": widget,
                },
            })}
            apiOptions={parameters?.apiOptions}
        />
    );
};
