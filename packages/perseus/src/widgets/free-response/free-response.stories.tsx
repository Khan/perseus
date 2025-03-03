import {FreeResponse} from "./free-response";

import type {Meta, StoryObj} from "@storybook/react";

const meta: Meta<typeof FreeResponse> = {
    component: FreeResponse,
    title: "Perseus/Widgets/FreeResponse",
};

export default meta;
type Story = StoryObj<typeof FreeResponse>;

export const Primary: Story = {
    args: {
        question: "What is the theme of the essay?",
    },
};
