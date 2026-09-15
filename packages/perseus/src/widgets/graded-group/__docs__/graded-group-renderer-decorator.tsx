import {
    generateGradedGroupOptions,
    generateGradedGroupWidget,
    generateTestPerseusItem,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import * as React from "react";

import ServerItemRenderer from "../../../server-item-renderer";
import {testDependenciesV2} from "../../../testing/test-dependencies-data";
import {registerWidgets} from "../../../widgets";
import {gradedGroupRegistration} from "../index";

import type {APIOptions} from "../../../types";
import type {WidgetRegistration} from "../../../widget-registration";
import type {PerseusGradedGroupWidgetOptions} from "@khanacademy/perseus-core";
import type {Decorator} from "@storybook/react-vite";

export const gradedGroupRendererDecorator: Decorator = (
    _,
    {
        args,
        parameters,
    }: {
        args: Partial<PerseusGradedGroupWidgetOptions>;
        parameters?: {
            apiOptions?: APIOptions;
            childWidgets?: ReadonlyArray<WidgetRegistration>;
        };
    },
) => {
    registerWidgets([
        gradedGroupRegistration,
        ...(parameters?.childWidgets ?? []),
    ]);

    return (
        <ServerItemRenderer
            item={generateTestPerseusItem({
                question: generateTestPerseusRenderer({
                    content: "[[☃ graded-group 1]]",
                    widgets: {
                        "graded-group 1": generateGradedGroupWidget({
                            options: generateGradedGroupOptions({
                                ...args,
                            }),
                        }),
                    },
                }),
            })}
            apiOptions={parameters?.apiOptions}
            dependencies={testDependenciesV2}
        />
    );
};
