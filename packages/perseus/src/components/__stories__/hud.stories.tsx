import {action} from "@storybook/addon-actions";

import Hud from "../hud";

import type {StoryObj, Meta} from "@storybook/react";

type Story = StoryObj<typeof Hud>;

const meta: Meta = {
    title: "Perseus/Components/HUD",
    component: Hud,
    args: {
        enabled: true,
        fixedPosition: false,
        message: "Test message",
        onClick: action("onClick"),
    },
};
export default meta;

export const Default: Story = {};
