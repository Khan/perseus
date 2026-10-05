import {
    generateGradedGroupOptions,
    generateGradedGroupWidget,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import * as React from "react";

import ArticleRenderer from "../../../article-renderer";
import {testDependenciesV2} from "../../../testing/test-dependencies";

import type {APIOptions} from "../../../types";
import type {PerseusGradedGroupWidgetOptions} from "@khanacademy/perseus-core";
import type {Decorator} from "@storybook/react-vite";

// Graded groups only appear in articles, so render them through the
// ArticleRenderer. It adds the `perseus-article` class, which pulls in the
// article-only paragraph styles that graded groups get in prod.
export const gradedGroupRendererDecorator: Decorator = (
    _,
    {
        args,
        parameters,
    }: {
        args: Partial<PerseusGradedGroupWidgetOptions>;
        parameters?: {
            apiOptions?: APIOptions;
        };
    },
) => {
    return (
        <ArticleRenderer
            json={generateTestPerseusRenderer({
                content: "[[☃ graded-group 1]]",
                widgets: {
                    "graded-group 1": generateGradedGroupWidget({
                        options: generateGradedGroupOptions({
                            ...args,
                        }),
                    }),
                },
            })}
            seed={0}
            apiOptions={parameters?.apiOptions}
            dependencies={testDependenciesV2}
        />
    );
};
