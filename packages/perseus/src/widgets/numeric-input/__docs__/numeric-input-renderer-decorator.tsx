import {
    generateTestPerseusItem,
    generateNumericInputOptions,
    generateNumericInputWidget,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import * as React from "react";

import {ServerItemRendererWithDebugUI} from "../../../testing/server-item-renderer-with-debug-ui";

import type {APIOptions} from "../../../types";
import type {UserInputMap} from "@khanacademy/perseus-core";

export const numericInputRendererDecorator = (
    _,
    {
        args,
        parameters,
    }: {
        args: Record<string, unknown>;
        parameters?: {
            content?: string;
            apiOptions?: APIOptions;
            initialUserInput?: UserInputMap;
        };
    },
) => {
    const item = generateTestPerseusItem({
        question: generateTestPerseusRenderer({
            content:
                parameters?.content ??
                "Registry numbers for USS Enterprise: [[☃ numeric-input 1]]",
            widgets: {
                "numeric-input 1": generateNumericInputWidget({
                    options: generateNumericInputOptions({
                        ...args,
                    }),
                }),
            },
        }),
    });

    return (
        <ServerItemRendererWithDebugUI
            item={item}
            apiOptions={parameters?.apiOptions}
            initialUserInput={parameters?.initialUserInput}
        />
    );
};
