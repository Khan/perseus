import {ApiOptions} from "@khanacademy/perseus";
import {View} from "@khanacademy/wonder-blocks-core";
import * as React from "react";
import {useRef, useState} from "react";

import {getFeatureFlags} from "../../../../testing/feature-flags-util";
import {testDependenciesV2} from "../../../../testing/test-dependencies";
import ArticleEditor from "../article-editor";
import ContentPreview from "../content-preview";
import {registerAllWidgetsAndEditorsForTesting} from "../util/register-all-widgets-and-editors-for-testing";

import PreviewPanel from "./preview-panel";

// This is to address timing - Perseus widget editor registry accessed before initialization!
registerAllWidgetsAndEditorsForTesting();

export default {
    title: "Editors/ArticleEditor",
};

export const Demo = (): React.ReactElement => {
    const [article, setArticle] = useState(undefined);
    const articleEditorRef = useRef();

    // TODO(ivy): remove feature flag check after code review/testing
    return (
        <View>
            <ArticleEditor
                dependencies={testDependenciesV2}
                apiOptions={{
                    ...ApiOptions.defaults,
                    isArticle: true,
                    flags: getFeatureFlags({"image-widget-upgrade": true}),
                }}
                imageUploader={() => {}}
                json={article}
                onChange={(value) => {
                    setArticle(value.json[0]);
                }}
                previewURL="about:blank"
                ref={articleEditorRef as any}
            />
            <PreviewPanel openButtonText="Open preview (storybook only)">
                <ContentPreview
                    question={article}
                    apiOptions={{
                        ...ApiOptions.defaults,
                        isArticle: true,
                        showAlignmentOptions: true,
                        flags: getFeatureFlags({"image-widget-upgrade": true}),
                    }}
                    linterContext={{
                        contentType: "article",
                        highlightLint: true,
                        paths: [],
                        stack: [],
                    }}
                    previewDevice={"desktop"}
                />
            </PreviewPanel>
        </View>
    );
};
