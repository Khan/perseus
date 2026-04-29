import {
    generateLabelImageOptions,
    generateLabelImageWidget,
    generateTestPerseusItem,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import * as React from "react";

import {ServerItemRendererWithDebugUI} from "../../testing/server-item-renderer-with-debug-ui";

export const labelImageRendererDecorator = (_, {args, parameters}) => {
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
