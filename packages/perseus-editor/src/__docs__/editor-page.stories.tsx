import * as React from "react";

import {registerAllWidgetsAndEditorsForTesting} from "../util/register-all-widgets-and-editors-for-testing";

import EditorPageWithStorybookPreview from "./editor-page-with-storybook-preview";

// This is to address timing - Perseus widget editor registry accessed before initialization!
registerAllWidgetsAndEditorsForTesting();

export default {
    title: "Editors/EditorPage",
};

export const Demo = (): React.ReactElement => {
    return <EditorPageWithStorybookPreview />;
};
