import {
    generateTestPerseusItem,
    generateMatcherWidget,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import * as React from "react";

import {ServerItemRendererWithDebugUI} from "../../../testing/server-item-renderer-with-debug-ui";

export const matcherRendererDecorator = (_, {args}) => {
    const item = generateTestPerseusItem({
        question: generateTestPerseusRenderer({
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
        }),
    });

    return <ServerItemRendererWithDebugUI item={item} />;
};
