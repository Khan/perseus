import {
    generateFreeResponseOptions,
    generateFreeResponseWidget,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import * as React from "react";

import QuestionRendererForStories from "./question-renderer-for-stories";

export const freeResponseRendererDecorator = (_, {args, parameters}) => {
    return (
        <QuestionRendererForStories
            question={generateTestPerseusRenderer({
                content: parameters?.content ?? "[[☃ free-response 1]]",
                widgets: {
                    "free-response 1": generateFreeResponseWidget({
                        options: generateFreeResponseOptions({
                            ...args,
                        }),
                    }),
                },
            })}
            apiOptions={parameters?.apiOptions}
        />
    );
};
