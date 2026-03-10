import * as React from "react";

import {comprehensiveQuestion} from "../__testdata__/all-widgets.testdata";
import {registerAllWidgetsAndEditorsForTesting} from "../util/register-all-widgets-and-editors-for-testing";

import EditorPageWithStorybookPreview from "./editor-page-with-storybook-preview";
import "../styles/perseus-editor.css"; // This helps ensure the styles are loaded correctly and timely

// This is to address timing - Perseus widget editor registry accessed before initialization!
registerAllWidgetsAndEditorsForTesting();

export default {
    title: "Editors/EditorPage/Visual Regression Tests",
    tags: ["!dev"],
    parameters: {
        docs: {
            description: {
                component:
                    "Visual regression tests for the editor page in initial state.",
            },
        },
        chromatic: {disableSnapshot: false, delay: 500},
    },
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
