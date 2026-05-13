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
import type {RadioDefaultWidgetOptions} from "@khanacademy/perseus-core";
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
