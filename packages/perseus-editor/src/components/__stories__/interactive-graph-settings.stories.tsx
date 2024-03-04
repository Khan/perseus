import * as React from "react";

import InteractiveGraphSettings from "../interactive-graph-settings";

import InteractiveGraphSettingsArgTypes from "./interactive-graph-settings.argtypes";

export default {
    title: "Perseus/Editor/Components/Interactive Graph Settings",
    component: InteractiveGraphSettings,
    argTypes: InteractiveGraphSettingsArgTypes,
};

export const Default = (args): React.ReactElement => {
    return <InteractiveGraphSettings {...args} />;
};

Default.args = {
    // Separating the array props out because trying to editing them in
    // the controls panel without a default value causes the story to crash.
    range: [
        [-10, 10],
        [-10, 10],
    ],
};
