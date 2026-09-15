import {
    generateExplanationOptions,
    generateExplanationWidget,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import * as React from "react";

import {registerWidgets} from "../../../widgets";
import QuestionRendererForStories from "../../__testutils__/question-renderer-for-stories";
import {explanationRegistration} from "../index";

import type {APIOptions} from "../../../types";
import type {WidgetRegistration} from "../../../widget-registration";
import type {
    PerseusExplanationWidgetOptions,
    PerseusWidgetsMap,
} from "@khanacademy/perseus-core";
import type {Decorator} from "@storybook/react-vite";

export const explanationRendererDecorator: Decorator = (
    _,
    {
        args,
        parameters,
    }: {
        args: Partial<PerseusExplanationWidgetOptions>;
        parameters?: {
            apiOptions?: APIOptions;
            content?: string;
            widgets?: PerseusWidgetsMap;
            // Widgets nested inside the explanation.
            childWidgets?: ReadonlyArray<WidgetRegistration>;
        };
    },
) => {
    registerWidgets([
        explanationRegistration,
        ...(parameters?.childWidgets ?? []),
    ]);

    return (
        <QuestionRendererForStories
            question={generateTestPerseusRenderer({
                content:
                    parameters?.content ??
                    "Here's the explanation\n[[☃ explanation 1]]\nDid you get that?",
                widgets: {
                    "explanation 1": generateExplanationWidget({
                        options: generateExplanationOptions({
                            ...args,
                            ...(parameters?.widgets
                                ? {widgets: parameters.widgets}
                                : {}),
                        }),
                    }),
                },
            })}
            apiOptions={parameters?.apiOptions}
        />
    );
};
