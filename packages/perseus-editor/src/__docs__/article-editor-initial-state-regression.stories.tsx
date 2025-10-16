import {ApiOptions} from "@khanacademy/perseus";
import {View} from "@khanacademy/wonder-blocks-core";
import * as React from "react";
import {useRef, useState} from "react";

import {testDependenciesV2} from "../../../../testing/test-dependencies";
import {comprehensiveQuestion} from "../__testdata__/all-widgets.testdata";
import ArticleEditor from "../article-editor";
import {registerAllWidgetsAndEditorsForTesting} from "../util/register-all-widgets-and-editors-for-testing";

// This is to address timing - Perseus widget editor registry accessed before initialization!
registerAllWidgetsAndEditorsForTesting();

export default {
    title: "Editors/ArticleEditor/Visual Regression Tests",
    component: ArticleEditor,
    tags: ["!dev"],
    parameters: {
        docs: {
            description: {
                component:
                    "Visual regression tests for the article editor in initial state.",
            },
        },
        chromatic: {disableSnapshot: false},
    },
};

export const WithEditingDisabled = (): React.ReactElement => {
    const articleEditorRef = useRef();
    const disabledApiOptions = {
        ...ApiOptions.defaults,
        editingDisabled: true,
    };

    return (
        <ArticleEditor
            dependencies={testDependenciesV2}
            apiOptions={disabledApiOptions}
            imageUploader={() => {}}
            json={[comprehensiveQuestion]}
            onChange={() => {}}
            previewURL="/perseus/frame"
            ref={articleEditorRef as any}
        />
    );
};
