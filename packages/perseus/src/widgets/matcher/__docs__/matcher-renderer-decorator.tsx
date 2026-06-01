import {
    generateMatcherWidget,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import * as React from "react";

import QuestionRendererForStories from "../../__testutils__/question-renderer-for-stories";

export const matcherRendererDecorator = (_, {args}) => {
    return (
        <QuestionRendererForStories
            question={generateTestPerseusRenderer({
                content: "[[☃ matcher 1]]",
                widgets: {
                    "matcher 1": generateMatcherWidget({
                        options: {
                            labels: ["", ""],
                            left: [],
                            right: [],
                            orderMatters: false,
                            padding: true,
                            ...args,
                        },
                    }),
                },
            })}
        />
    );
};
