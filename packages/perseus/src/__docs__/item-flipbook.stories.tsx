import {ItemFlipbook} from "../testing/item-flipbook/item-flipbook";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta<typeof ItemFlipbook> = {
    title: "Utilities/Perseus Item Flipbook",
    component: ItemFlipbook,
    tags: ["!autodocs"],
};

export default meta;

type Story = StoryObj<typeof ItemFlipbook>;

export const PerseusItemFlipbook: Story = {};
