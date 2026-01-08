import {ApiOptions} from "@khanacademy/perseus";
import {expect, within} from "@storybook/test";
import * as React from "react";

import {testDependenciesV2} from "../../../../testing/test-dependencies";
import {comprehensiveQuestion} from "../__testdata__/all-widgets.testdata";
import ArticleEditor from "../article-editor";
import {registerAllWidgetsAndEditorsForTesting} from "../util/register-all-widgets-and-editors-for-testing";

import {getPreviewUrl} from "./use-preview-url";
import "../styles/perseus-editor.css"; // This helps ensure the styles are loaded correctly and timely

// This is to address timing - Perseus widget editor registry accessed before initialization!
registerAllWidgetsAndEditorsForTesting();

export default {
    title: "Editors/ArticleEditor/Visual Regression Tests",
    component: ArticleEditor,
    tags: ["!autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "Visual regression tests for the article editor in initial state.",
            },
        },
        chromatic: {disableSnapshot: false},
    },
    play: async ({canvasElement}) => {
        const previewContainer = await canvasElement.querySelector(
            ".editor-preview iframe",
        );

        await expect(previewContainer).toBeInTheDocument();

        await new Promise((resolve) => {
            previewContainer.onload = resolve;
        });

        const iframeDocument =
            previewContainer.contentDocument ||
            previewContainer.contentWindow.document;

        // 4. Use within and findBy* queries to assert content is loaded
        const iframeContents = within(iframeDocument.body);
        await expect(
            await iframeContents.findByText("Show explanation"),
        ).toBeVisible();
    },
};

export const WithEditingDisabled = (): React.ReactElement => {
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
            previewURL={getPreviewUrl()}
        />
    );
};
