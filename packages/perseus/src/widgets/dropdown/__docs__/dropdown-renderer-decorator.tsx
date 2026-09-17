import {
    generateTestPerseusItem,
    generateDropdownOptions,
    generateDropdownWidget,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import * as React from "react";

import {ServerItemRendererWithDebugUI} from "../../../testing/server-item-renderer-with-debug-ui";

import type {APIOptions} from "../../../types";
import type {PerseusDropdownWidgetOptions} from "@khanacademy/perseus-core";
import type {Decorator} from "@storybook/react-vite";

export const dropdownRendererDecorator: Decorator = (
    _,
    {
        args,
        parameters,
    }: {
        args: Partial<PerseusDropdownWidgetOptions>;
        parameters?: {
            apiOptions?: APIOptions;
            content?: string;
        };
    },
) => {
    const item = generateTestPerseusItem({
        question: generateTestPerseusRenderer({
            content:
                parameters?.content ?? "Select an answer: [[☃ dropdown 1]]",
            widgets: {
                "dropdown 1": generateDropdownWidget({
                    options: generateDropdownOptions({
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
        />
    );
};
