import {ApiOptions} from "@khanacademy/perseus";
import {View} from "@khanacademy/wonder-blocks-core";
import * as React from "react";
import {useState, useMemo} from "react";

import {testDependenciesV2} from "../../../../testing/test-dependencies";
import {comprehensiveQuestion} from "../__testdata__/all-widgets.testdata";
import ArticleEditor from "../article-editor";
import {registerAllWidgetsAndEditorsForTesting} from "../util/register-all-widgets-and-editors-for-testing";

import "../styles/perseus-editor.css"; // This helps ensure the styles are loaded correctly and timely

// This is to address timing - Perseus widget editor registry accessed before initialization!
registerAllWidgetsAndEditorsForTesting();

export default {
    title: "Editors/ArticleEditor",
};

function getStorybookPreviewUrl() {
    return `${window.location.origin}/iframe.html?id=dev-support-preview--default&viewMode=story`;
}

export const Demo = (): React.ReactElement => {
    // Start with one empty section so the editor and preview are visible
    const [article, setArticle] = useState([
        {content: "", widgets: {}, images: {}},
    ]);

    const storybookPreviewUrl = useMemo(() => {
        return getStorybookPreviewUrl();
    }, []);

    return (
        <View>
            <ArticleEditor
                dependencies={testDependenciesV2}
                apiOptions={{...ApiOptions.defaults, isArticle: true}}
                imageUploader={() => {}}
                json={article}
                onChange={(value) => {
                    setArticle(value.json);
                }}
                previewURL={storybookPreviewUrl}
            />
        </View>
    );
};

export const WithEditingDisabled = (): React.ReactElement => {
    const disabledApiOptions = {
        ...ApiOptions.defaults,
        editingDisabled: true,
    };

    const storybookPreviewUrl = useMemo(() => {
        return getStorybookPreviewUrl();
    }, []);

    return (
        <ArticleEditor
            dependencies={testDependenciesV2}
            apiOptions={disabledApiOptions}
            imageUploader={() => {}}
            json={[comprehensiveQuestion]}
            onChange={() => {}}
            previewURL={storybookPreviewUrl}
        />
    );
};

export const PreviewMode = (): React.ReactElement => {
    const storybookPreviewUrl = useMemo(() => {
        return getStorybookPreviewUrl();
    }, []);

    return (
        <ArticleEditor
            dependencies={testDependenciesV2}
            apiOptions={ApiOptions.defaults}
            mode="preview"
            imageUploader={() => {}}
            json={[comprehensiveQuestion, comprehensiveQuestion]}
            onChange={() => {}}
            previewURL={storybookPreviewUrl}
        />
    );
};
