import {
    generateTestPerseusItem,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import * as React from "react";

import {ServerItemRendererWithDebugUI} from "../../testing/server-item-renderer-with-debug-ui";

export const matcherRendererDecorator = (_, {args}) => {
    return (
        <ServerItemRendererWithDebugUI
            item={generateTestPerseusItem({
                question: generateTestPerseusRenderer({
                    content: "[[☃ matcher 1]]",
                    widgets: {
                        "matcher 1": {
                            type: "matcher",
                            graded: true,
                            version: {major: 0, minor: 0},
                            options: {
                                labels: ["", ""],
                                left: [],
                                right: [],
                                orderMatters: false,
                                padding: true,
                                ...args,
                            },
                        },
                    },
                }),
            })}
        />
    );
};
