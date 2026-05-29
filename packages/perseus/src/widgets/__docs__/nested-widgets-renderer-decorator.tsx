import * as React from "react";

import ArticleRenderer from "../../article-renderer";
import {storybookDependenciesV2} from "../../testing/test-dependencies";

export const articleRendererDecorator = (_, {parameters}) => {
    return (
        <ArticleRenderer
            json={parameters.question}
            dependencies={storybookDependenciesV2}
        />
    );
};
