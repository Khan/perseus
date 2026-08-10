import {
    generateLabelImageOptions,
    generateLabelImageWidget,
    generateTestPerseusItem,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import * as React from "react";

import {ServerItemRendererWithDebugUI} from "../../../testing/server-item-renderer-with-debug-ui";
import QuestionRendererForStories from "../../__testutils__/question-renderer-for-stories";

export const labelImageRendererDecoratorWithDebugUI = (
    _,
    {args, parameters},
) => {
    return (
        <ServerItemRendererWithDebugUI
            item={generateTestPerseusItem({
                question: generateTestPerseusRenderer({
                    content: parameters?.content ?? "[[☃ label-image 1]]",
                    widgets: {
                        "label-image 1": generateLabelImageWidget({
                            options: generateLabelImageOptions({
                                ...args,
                            }),
                        }),
                    },
                }),
            })}
        />
    );
};

export const labelImageRendererDecorator = (_, {args, parameters}) => {
    return (
        // `apiOptions` is forwarded from story parameters so a story can put
        // the widget into mobile mode. This is required (not just the
        // `perseus-mobile` CSS class) because the instruction text ("Tap" vs.
        // "Click") is chosen from `apiOptions.isMobile` at render time.
        <QuestionRendererForStories
            apiOptions={parameters?.apiOptions}
            question={generateTestPerseusRenderer({
                content: parameters?.content ?? "[[☃ label-image 1]]",
                widgets: {
                    "label-image 1": generateLabelImageWidget({
                        options: generateLabelImageOptions({
                            ...args,
                        }),
                    }),
                },
            })}
        />
    );
};
