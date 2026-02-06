import {ApiOptions} from "@khanacademy/perseus";
import {
    PerseusFeatureFlags,
    type PerseusArticle,
} from "@khanacademy/perseus-core";
import {View} from "@khanacademy/wonder-blocks-core";
import * as React from "react";
import {useRef, useState} from "react";

import {comprehensiveQuestion} from "../__testdata__/all-widgets.testdata";
import ArticleEditor from "../article-editor";
import {testDependenciesV2} from "../testing/test-dependencies";
import {registerAllWidgetsAndEditorsForTesting} from "../util/register-all-widgets-and-editors-for-testing";

import "../styles/perseus-editor.css"; // This helps ensure the styles are loaded correctly and timely
import {usePreviewUrl} from "./use-preview-url";

// This is to address timing - Perseus widget editor registry accessed before initialization!
registerAllWidgetsAndEditorsForTesting();

export default {
    title: "Editors/ArticleEditor",
};

export const Demo = (): React.ReactElement => {
    const [article, setArticle] = useState<PerseusArticle>();
    const articleEditorRef = useRef();
    const storybookPreviewUrl = usePreviewUrl();

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
                ref={articleEditorRef as any}
            />
        </View>
    );
};

/**
 * Article editor with all feature flags on.
 */
export const WithAllFlags = (): React.ReactElement => {
    const [article, setArticle] = useState<PerseusArticle>();
    const articleEditorRef = useRef();
    const storybookPreviewUrl = usePreviewUrl();

    const allFlags: Record<string, boolean> = {};
    for (const flag of PerseusFeatureFlags) {
        allFlags[flag] = true;
    }

    return (
        <View>
            <ArticleEditor
                dependencies={testDependenciesV2}
                apiOptions={{
                    ...ApiOptions.defaults,
                    isArticle: true,
                    // Turn on all feature flags
                    flags: allFlags,
                }}
                imageUploader={() => {}}
                json={article}
                onChange={(value) => {
                    setArticle(value.json);
                }}
                previewURL={storybookPreviewUrl}
                ref={articleEditorRef as any}
            />
        </View>
    );
};

export const PreviewMode = (): React.ReactElement => {
    const [article] = useState([comprehensiveQuestion, comprehensiveQuestion]);
    const articleEditorRef = useRef<ArticleEditor | null>(null);
    const storybookPreviewUrl = usePreviewUrl();

    return (
        <View>
            <ArticleEditor
                dependencies={testDependenciesV2}
                apiOptions={{...ApiOptions.defaults, isArticle: true}}
                json={article}
                mode="preview"
                onChange={() => {
                    /* Preview doesn't support editing */
                }}
                previewURL={storybookPreviewUrl}
                ref={articleEditorRef as any}
            />
        </View>
    );
};

export const WithEditingDisabled = (): React.ReactElement => {
    const articleEditorRef = useRef();
    const disabledApiOptions = {
        ...ApiOptions.defaults,
        editingDisabled: true,
    };
    const storybookPreviewUrl = usePreviewUrl();

    return (
        <ArticleEditor
            dependencies={testDependenciesV2}
            apiOptions={disabledApiOptions}
            imageUploader={() => {}}
            json={[comprehensiveQuestion]}
            onChange={() => {}}
            previewURL={storybookPreviewUrl}
            ref={articleEditorRef as any}
        />
    );
};
