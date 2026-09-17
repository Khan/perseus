import {
    generateTestPerseusItem,
    generateGradedGroupSetWidget,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import * as React from "react";

import {ServerItemRendererWithDebugUI} from "../../../testing/server-item-renderer-with-debug-ui";

import type {APIOptions} from "../../../types";
import type {PerseusGradedGroupSetWidgetOptions} from "@khanacademy/perseus-core";
import type {Decorator} from "@storybook/react-vite";

export const gradedGroupSetRendererDecorator: Decorator = (
    _,
    {
        args,
        parameters,
    }: {
        args: Partial<PerseusGradedGroupSetWidgetOptions>;
        parameters?: {apiOptions?: APIOptions};
    },
) => {
    const item = generateTestPerseusItem({
        question: generateTestPerseusRenderer({
            content: "[[☃ graded-group-set 1]]",
            widgets: {
                "graded-group-set 1": generateGradedGroupSetWidget({
                    options: {gradedGroups: [], ...args},
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
