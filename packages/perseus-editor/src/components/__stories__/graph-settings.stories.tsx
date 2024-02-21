import * as React from "react";

import GraphSettings from "../graph-settings";

import GraphSettingsArgTypes from "./graph-settings.argtypes";

export default {
    title: "Perseus/Editor/Components/Graph Settings",
    component: GraphSettings,
    argTypes: GraphSettingsArgTypes,
};

export const Default = (args): React.ReactElement => {
    return <GraphSettings {...args} />;
};
