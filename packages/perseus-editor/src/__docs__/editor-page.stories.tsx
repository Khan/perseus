import {PerseusFeatureFlags} from "@khanacademy/perseus-core";
import * as React from "react";

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
