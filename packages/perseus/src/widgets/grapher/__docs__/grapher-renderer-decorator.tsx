import {generateTestPerseusItem} from "@khanacademy/perseus-core";
import * as React from "react";

import {ServerItemRendererWithDebugUI} from "../../../testing/server-item-renderer-with-debug-ui";

import type {APIOptions} from "../../../types";
import type {PerseusRenderer, UserInputMap} from "@khanacademy/perseus-core";
import type {Decorator} from "@storybook/react-vite";

export const grapherRendererDecorator: Decorator<{
    question: PerseusRenderer;
}> = (
    _,
    {
        args,
        parameters,
    }: {
        args: {question: PerseusRenderer};
        parameters?: {
            apiOptions?: APIOptions;
            initialUserInput?: UserInputMap;
        };
    },
) => {
    return (
        <ServerItemRendererWithDebugUI
            item={generateTestPerseusItem({question: args.question})}
            apiOptions={parameters?.apiOptions}
            initialUserInput={parameters?.initialUserInput}
        />
    );
};
