import {action} from "@storybook/addon-actions";

import TeX from "../tex";

import type {Meta, StoryObj} from "@storybook/react";

const meta: Meta<typeof TeX> = {
    title: "Perseus/Components/Tex",
    component: TeX,
    args: {
        children: "f(x) = x + 1",
        onRender: action("onRender"),
        setAssetStatus: action("setAssetStatus"),
    },
};
export default meta;

type Story = StoryObj<typeof TeX>;

export const BasicOperation: Story = {};
