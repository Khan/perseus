import {PerseusFeatureFlags} from "@khanacademy/perseus-core";
import * as React from "react";

import {comprehensiveQuestion} from "../__testdata__/all-widgets.testdata";
import {registerAllWidgetsAndEditorsForTesting} from "../util/register-all-widgets-and-editors-for-testing";

import EditorPageWithStorybookPreview from "./editor-page-with-storybook-preview";
import "../styles/perseus-editor.css"; // This helps ensure the styles are loaded correctly and timely

// This is to address timing - Perseus widget editor registry accessed before initialization!
registerAllWidgetsAndEditorsForTesting();

export default {
    title: "Editors/EditorPage",
    tags: ["!autodocs"],
};

/**
 * Current state of the editor page. (All feature flags are off.)
 */
export const Demo = (): React.ReactElement => {
    return <EditorPageWithStorybookPreview />;
};

/**
 * Editor with all feature flags on.
 */
export const WithAllFlags = (): React.ReactElement => {
    const allFlags: Record<string, boolean> = {};

    for (const flag of PerseusFeatureFlags) {
        allFlags[flag] = true;
    }

    return (
        <EditorPageWithStorybookPreview
            apiOptions={{
                flags: allFlags,
            }}
        />
    );
};

export const WithEditingDisabled = (): React.ReactElement => {
    const disabledApiOptions = {
        editingDisabled: true,
        isMobile: false,
    };

    return (
        <EditorPageWithStorybookPreview
            question={comprehensiveQuestion}
            apiOptions={disabledApiOptions}
        />
    );
};

export const WithAllWidgets = (): React.ReactElement => {
    return <EditorPageWithStorybookPreview question={comprehensiveQuestion} />;
};
