import {
    generateExpressionOptions,
    generateExpressionWidget,
    generateTestPerseusItem,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import * as React from "react";

import {ServerItemRendererWithDebugUI} from "../../testing/server-item-renderer-with-debug-ui";

export const expressionRendererDecorator = (_, {args, parameters}) => {
    return (
        <ServerItemRendererWithDebugUI
            item={generateTestPerseusItem({
                question: generateTestPerseusRenderer({
                    content: parameters?.content ?? "[[☃ expression 1]]",
                    widgets: {
                        "expression 1": generateExpressionWidget({
                            options: generateExpressionOptions({
                                ...args,
                            }),
                        }),
                    },
                }),
            })}
            apiOptions={parameters?.apiOptions}
        />
    );
};
