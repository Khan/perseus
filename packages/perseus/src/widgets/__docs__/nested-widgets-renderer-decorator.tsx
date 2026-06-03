import * as React from "react";

import ArticleRenderer from "../../article-renderer";
import {storybookDependenciesV2} from "../../testing/test-dependencies";

import type {PerseusArticle} from "@khanacademy/perseus-core";
import type {Decorator} from "@storybook/react-vite";

export const articleRendererDecorator: Decorator = (
    _,
    {parameters}: {parameters: {question?: PerseusArticle}},
) => {
    return (
        <ArticleRenderer
            json={parameters.question!}
            dependencies={storybookDependenciesV2}
        />
    );
};
