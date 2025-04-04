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
        allowUnlimitedCharacters: false,
        characterLimit: 500,
        placeholder: "Enter your answer here",
        question: "What is the theme of the essay?",
    },
};

export const CharacterLimit: Story = {
    args: {
        allowUnlimitedCharacters: false,
        characterLimit: 500,
        placeholder: "Enter your answer here",
        question: "What is the theme of the essay?",
    },
};

export const UnlimitedCharacters: Story = {
    args: {
        allowUnlimitedCharacters: true,
        characterLimit: 500,
        placeholder: "Enter your answer here",
        question: "What is the theme of the essay?",
    },
};
