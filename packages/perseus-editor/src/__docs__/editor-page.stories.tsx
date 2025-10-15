import {PerseusFeatureFlags} from "@khanacademy/perseus-core";
import * as React from "react";

import {comprehensiveQuestion} from "../__testdata__/all-widgets.testdata";
import {question as definitionQuestion} from "../__testdata__/definition.testdata";
import {question1} from "../__testdata__/numeric-input.testdata";
import {singleSelectQuestion} from "../__testdata__/radio.testdata";
import {registerAllWidgetsAndEditorsForTesting} from "../util/register-all-widgets-and-editors-for-testing";

import EditorPageWithStorybookPreview from "./editor-page-with-storybook-preview";

// This is to address timing - Perseus widget editor registry accessed before initialization!
registerAllWidgetsAndEditorsForTesting();

export default {
    title: "Editors/EditorPage",
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

export const WithNumericInput = (): React.ReactElement => {
    return <EditorPageWithStorybookPreview question={question1} />;
};

export const WithRadioWidget = (): React.ReactElement => {
    return <EditorPageWithStorybookPreview question={singleSelectQuestion} />;
};

export const WithDefinitionWidget = (): React.ReactElement => {
    return <EditorPageWithStorybookPreview question={definitionQuestion} />;
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
