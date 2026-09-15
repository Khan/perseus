import {
    generateFreeResponseOptions,
    generateFreeResponseWidget,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import * as React from "react";

import {registerWidgets} from "../../../widgets";
import QuestionRendererForStories from "../../__testutils__/question-renderer-for-stories";
import {freeResponseRegistration} from "../index";

export const freeResponseRendererDecorator = (_, {args, parameters}) => {
    registerWidgets([freeResponseRegistration]);

    return (
        <QuestionRendererForStories
            question={generateTestPerseusRenderer({
                content: parameters?.content ?? "[[☃ free-response 1]]",
                widgets: {
                    "free-response 1": generateFreeResponseWidget({
                        options: generateFreeResponseOptions({
                            ...args,
                        }),
                    }),
                },
            })}
            apiOptions={parameters?.apiOptions}
        />
    );
};
