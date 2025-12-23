import * as React from "react";

import GraphSettings from "../graph-settings";

import GraphSettingsArgTypes from "./graph-settings.argtypes";

export default {
    title: "Editors/Components/Graph Settings",
    component: GraphSettings,
    argTypes: GraphSettingsArgTypes,
};

export const Default = (args): React.ReactElement => {
    return <GraphSettings {...args} />;
};

Default.args = {
    // Separating the array props out because trying to editing them in
    // the controls panel without a default value causes the story to crash.
    range: [
        [-10, 10],
        [-10, 10],
    ],
};
