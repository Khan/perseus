import {
    generateTestPerseusItem,
    generateExpressionOptions,
    generateExpressionWidget,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import * as React from "react";

import {ServerItemRendererWithDebugUI} from "../../../testing/server-item-renderer-with-debug-ui";

import type {APIOptions} from "../../../types";
import type {UserInputMap} from "@khanacademy/perseus-core";
import type {Decorator} from "@storybook/react-vite";

export const expressionRendererDecorator: Decorator = (
    _,
    {
        args,
        parameters,
    }: {
        args: Record<string, unknown>;
        parameters?: {
            content?: string;
            apiOptions?: APIOptions;
            // Renders the widget in its non-interactive, read-only state.
            isStatic?: boolean;
            initialUserInput?: UserInputMap;
        };
    },
) => {
    const item = generateTestPerseusItem({
        question: generateTestPerseusRenderer({
            content: parameters?.content ?? "[[☃ expression 1]]",
            widgets: {
                "expression 1": generateExpressionWidget({
                    static: parameters?.isStatic ?? false,
                    options: generateExpressionOptions({
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
