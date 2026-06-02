import {
    generateExpressionOptions,
    generateExpressionWidget,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import * as React from "react";

import QuestionRendererForStories from "./question-renderer-for-stories";

export const expressionRendererDecorator = (_, {args, parameters}) => {
    return (
        <QuestionRendererForStories
            question={generateTestPerseusRenderer({
                content: parameters?.content ?? "[[☃ expression 1]]",
                widgets: {
                    "expression 1": generateExpressionWidget({
                        options: generateExpressionOptions({
                            ...args,
                        }),
                    }),
                },
            })}
            apiOptions={parameters?.apiOptions}
        />
    );
};
