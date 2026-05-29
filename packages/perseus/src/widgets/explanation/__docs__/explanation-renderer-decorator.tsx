import {
    generateExplanationOptions,
    generateExplanationWidget,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import * as React from "react";

import QuestionRendererForStories from "../../__testutils__/question-renderer-for-stories";

export const explanationRendererDecorator = (_, {args, parameters}) => {
    return (
        <QuestionRendererForStories
            question={generateTestPerseusRenderer({
                content:
                    parameters?.content ??
                    "Here's the explanation\n[[☃ explanation 1]]\nDid you get that?",
                widgets: {
                    "explanation 1": generateExplanationWidget({
                        options: generateExplanationOptions({
                            ...args,
                            ...(parameters?.widgets
                                ? {widgets: parameters.widgets}
                                : {}),
                        }),
                    }),
                },
            })}
            apiOptions={parameters?.apiOptions}
        />
    );
};
