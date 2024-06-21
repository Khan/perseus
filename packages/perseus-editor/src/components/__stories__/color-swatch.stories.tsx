import * as React from "react";

import ColorSwatch from "../graph-locked-figures/color-swatch";
import {getDefaultFigureForType} from "../util";

import type {Meta} from "@storybook/react";

export default {
    title: "PerseusEditor/Components/Color Swatch",
    component: ColorSwatch,
} as Meta<typeof ColorSwatch>;

export const Default = (args): React.ReactElement => {
    return <ColorSwatch {...args} />;
};

// Set the default values in the control panel.
Default.args = {
    color: getDefaultFigureForType("point").color,
    filled: true,
};
