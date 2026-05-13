import {
    generateRadioOptions,
    generateRadioWidget,
    generateTestPerseusItem,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import * as React from "react";

import {ServerItemRenderer} from "../../server-item-renderer";
import {testDependenciesV2} from "../../testing/test-dependencies";

import type {APIOptions} from "../../types";
import type {
    PerseusImageDetail,
    RadioDefaultWidgetOptions,
} from "@khanacademy/perseus-core";
import type {Decorator} from "@storybook/react-vite";

export const radioRendererDecorator: Decorator = (
    _,
    {
        args,
        parameters,
    }: {
        args: Partial<RadioDefaultWidgetOptions>;
        parameters?: {
            apiOptions?: APIOptions;
            showSolutions?: "all" | "none" | "selected";
            content?: string;
            images?: Record<string, PerseusImageDetail>;
            rtl?: boolean;
        };
    },
) => {
    return (
        <div dir={parameters?.rtl ? "rtl" : "ltr"}>
            <ServerItemRenderer
                item={generateTestPerseusItem({
                    question: generateTestPerseusRenderer({
                        content: parameters?.content ?? "[[☃ radio 1]]",
                        images: parameters?.images,
                        widgets: {
                            "radio 1": generateRadioWidget({
                                options: generateRadioOptions({
                                    ...args,
                                }),
                            }),
                        },
                    }),
                })}
                apiOptions={parameters?.apiOptions}
                reviewMode={parameters?.showSolutions === "all"}
                showSolutions={parameters?.showSolutions}
                dependencies={testDependenciesV2}
            />
        </div>
    );
};
