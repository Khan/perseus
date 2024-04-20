import * as React from "react";

import ColorCircle from "../color-circle";

import type {Meta} from "@storybook/react";

export default {
    title: "Perseus Editor/Components/Color Circle",
    component: ColorCircle,
} as Meta<typeof ColorCircle>;

export const Default = (args): React.ReactElement => {
    return <ColorCircle {...args} />;
};

// Set the default values in the control panel.
Default.args = {
    color: "blue",
    filled: true,
};
