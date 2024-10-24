import {action} from "@storybook/addon-actions";
import type {Meta, StoryObj} from "@storybook/react";
import Hud from "../hud";

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
