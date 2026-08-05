import {generateTestPerseusRenderer} from "@khanacademy/perseus-core";
import * as React from "react";

import QuestionRendererForStories from "../../__testutils__/question-renderer-for-stories";

import type {PerseusPhetSimulationWidgetOptions} from "@khanacademy/perseus-core";

export const phetSimulationRendererDecorator = (_, {args, parameters}) => {
    const options = {
        url: args.url,
        description: args.description,
    } satisfies PerseusPhetSimulationWidgetOptions;

    return (
        <QuestionRendererForStories
            apiOptions={parameters?.apiOptions}
            question={generateTestPerseusRenderer({
                content: parameters?.content ?? "[[☃ phet-simulation 1]]",
                widgets: {
                    "phet-simulation 1": {
                        type: "phet-simulation",
                        options,
                    },
                },
            })}
        />
    );
};
