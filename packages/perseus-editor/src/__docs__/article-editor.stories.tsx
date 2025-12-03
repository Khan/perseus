import {ApiOptions} from "@khanacademy/perseus";
import {View} from "@khanacademy/wonder-blocks-core";
import * as React from "react";
import {useRef, useState} from "react";

import {testDependenciesV2} from "../../../../testing/test-dependencies";
import {comprehensiveQuestion} from "../__testdata__/all-widgets.testdata";
import ArticleEditor from "../article-editor";
import {registerAllWidgetsAndEditorsForTesting} from "../util/register-all-widgets-and-editors-for-testing";

import "../styles/perseus-editor.css"; // This helps ensure the styles are loaded correctly and timely
import {usePreviewUrl} from "./use-preview-url";

// This is to address timing - Perseus widget editor registry accessed before initialization!
registerAllWidgetsAndEditorsForTesting();

export default {
    title: "Editors/ArticleEditor",
};

export const Demo = (): React.ReactElement => {
    const [article, setArticle] = useState(undefined);
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
                    setArticle(value.json[0]);
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
