import {
    generatePhetSimulationOptions,
    generatePhetSimulationWidget,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import * as React from "react";

import QuestionRendererForStories from "../../__testutils__/question-renderer-for-stories";

import type {APIOptions} from "../../../types";
import type {PerseusPhetSimulationWidgetOptions} from "@khanacademy/perseus-core";
import type {Decorator} from "@storybook/react-vite";

export const phetSimulationRendererDecorator: Decorator = (
    _,
    {
        args,
        parameters,
    }: {
        args: Partial<PerseusPhetSimulationWidgetOptions>;
        parameters?: {apiOptions?: APIOptions; content?: string};
    },
) => {
    return (
        <QuestionRendererForStories
            apiOptions={parameters?.apiOptions}
            question={generateTestPerseusRenderer({
                content: parameters?.content ?? "[[☃ phet-simulation 1]]",
                widgets: {
                    "phet-simulation 1": generatePhetSimulationWidget({
                        options: generatePhetSimulationOptions({...args}),
                    }),
                },
            })}
        />
    );
};
