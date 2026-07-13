import {FreeResponse} from "./free-response";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta<typeof FreeResponse> = {
    component: FreeResponse,
    title: "Widgets/Free Response",
    tags: ["!dev"],
    parameters: {
        docs: {
            description: {
                component:
                    "A widget that provides a text area for users to enter open-ended responses,\
                    supporting long-form answers and essay-type questions.",
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof FreeResponse>;

export const Primary: Story = {
    args: {
        options: {
            allowUnlimitedCharacters: false,
            characterLimit: 500,
            placeholder: "Enter your answer here",
            question: "What is the theme of the essay?",
            scoringCriteria: [],
        },
    },
};

export const CharacterLimit: Story = {
    args: {
        options: {
            allowUnlimitedCharacters: false,
            characterLimit: 500,
            placeholder: "Enter your answer here",
            question: "What is the theme of the essay?",
            scoringCriteria: [],
        },
    },
};

export const BoldedQuestion: Story = {
    args: {
        options: {
            allowUnlimitedCharacters: false,
            characterLimit: 500,
            placeholder: "Enter your answer here",
            question: "**What is the theme of the essay?**",
            scoringCriteria: [],
        },
    },
};

export const UnlimitedCharacters: Story = {
    args: {
        options: {
            allowUnlimitedCharacters: true,
            characterLimit: 500,
            placeholder: "Enter your answer here",
            question:
                "What is the theme of the essay?\n\n**Put your answer in your own words.**",
            scoringCriteria: [],
        },
    },
};

export const QuestionWithTex: Story = {
    name: "Question with TeX content",
    args: {
        options: {
            allowUnlimitedCharacters: true,
            characterLimit: 500,
            placeholder: "Enter your answer here",
            question:
                "What changes are required to solve the following equation? $\\dfrac{6-3}{1-0}=\\dfrac{3}{1}=3$",
            scoringCriteria: [],
        },
    },
};
