import {ItemFlipbook} from "../testing/item-flipbook/item-flipbook";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta<typeof ItemFlipbook> = {
    title: "Perseus Item Flipbook",
    component: ItemFlipbook,
};

export default meta;

type Story = StoryObj<typeof ItemFlipbook>;

export const Flipbook: Story = {};
