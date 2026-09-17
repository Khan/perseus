// Breaking this out instead of using it globally, so that the
// right-to-left story can wrap the ImageQuestionRenderer with the
// right-to-left wrapper.
import {
    generateTestPerseusItem,
    generateImageOptions,
    generateImageWidget,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import * as React from "react";

import {ServerItemRendererWithDebugUI} from "../../../testing/server-item-renderer-with-debug-ui";

export const imageRendererDecorator = (_, {args, parameters}) => {
    const item = generateTestPerseusItem({
        question: generateTestPerseusRenderer({
            content: parameters?.content ?? "[[☃ image 1]]",
            widgets: {
                "image 1": generateImageWidget({
                    options: generateImageOptions({
                        ...args,
                    }),
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
