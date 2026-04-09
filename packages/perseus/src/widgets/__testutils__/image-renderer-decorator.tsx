// Breaking this out instead of using it globally, so that the
// right-to-left story can wrap the ImageQuestionRenderer with the
// right-to-left wrapper.
import {
    generateImageOptions,
    generateImageWidget,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import * as React from "react";

import QuestionRendererForStories from "./question-renderer-for-stories";

export const imageRendererDecorator = (_, {args, parameters}) => {
    return (
        <QuestionRendererForStories
            question={generateTestPerseusRenderer({
                content: parameters?.content ?? "[[☃ image 1]]",
                widgets: {
                    "image 1": generateImageWidget({
                        options: generateImageOptions({
                            ...args,
                        }),
                    }),
                },
            })}
            apiOptions={parameters?.apiOptions}
        />
    );
};
