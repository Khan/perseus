import {
    generateTestPerseusItem,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import * as React from "react";

import {ServerItemRendererWithDebugUI} from "../../testing/server-item-renderer-with-debug-ui";

export const matcherRendererDecorator = (_, {args, parameters}) => {
    return (
        <ServerItemRendererWithDebugUI
            item={generateTestPerseusItem({
                question: generateTestPerseusRenderer({
                    content: parameters?.content ?? "[[☃ matcher 1]]",
                    widgets: {
                        "matcher 1": {
                            type: "matcher",
                            graded: true,
                            options: {...args},
                        },
                    },
                }),
            })}
        />
    );
};
