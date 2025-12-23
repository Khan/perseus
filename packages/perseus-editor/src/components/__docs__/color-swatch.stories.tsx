import {getDefaultFigureForType} from "@khanacademy/perseus-core";

import ColorSwatch from "../../widgets/interactive-graph-editor/locked-figures/color-swatch";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta<typeof ColorSwatch> = {
    title: "Editors/Components/Color Swatch",
    component: ColorSwatch,
};

export default meta;

type Story = StoryObj<typeof ColorSwatch>;

export const Default: Story = {
    args: {
        color: getDefaultFigureForType("point").color,
        filled: true,
    },
};
