import * as React from "react";

import ColorSwatch from "../color-swatch";

import type {Meta} from "@storybook/react";

export default {
    title: "Perseus Editor/Components/Color Swatch",
    component: ColorSwatch,
} as Meta<typeof ColorSwatch>;

export const Default = (args): React.ReactElement => {
    return <ColorSwatch {...args} />;
};

// Set the default values in the control panel.
Default.args = {
    color: "blue",
    filled: true,
};
