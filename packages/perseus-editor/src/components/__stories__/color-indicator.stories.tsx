import * as React from "react";

import ColorIndicator from "../color-indicator";

import type {Meta} from "@storybook/react";

export default {
    title: "Perseus Editor/Components/Color Indicator",
    component: ColorIndicator,
} as Meta<typeof ColorIndicator>;

export const Default = (args): React.ReactElement => {
    return <ColorIndicator {...args} />;
};

// Set the default values in the control panel.
Default.args = {
    color: "blue",
    filled: true,
};
