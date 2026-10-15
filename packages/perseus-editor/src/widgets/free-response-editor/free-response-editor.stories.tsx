import {
    generateFreeResponseOptions,
    generateFreeResponseWidget,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import * as React from "react";

import EditorPageWithStorybookPreview from "../../__docs__/editor-page-with-storybook-preview";

import FreeResponseEditor from "./free-response-editor";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Widgets/Free Response/Editor Demo",
    component: FreeResponseEditor,
    tags: ["!autodocs"],
} satisfies Meta<typeof FreeResponseEditor>;
export default meta;

const question = generateTestPerseusRenderer({
    content: "[[☃ free-response 1]]",
    widgets: {
        "free-response 1": generateFreeResponseWidget({
            options: generateFreeResponseOptions({
                question: "What is the theme of the essay?",
                placeholder: "Enter your answer here",
                allowUnlimitedCharacters: false,
                characterLimit: 500,
                scoringCriteria: [
                    {text: "Identifies the central theme of the essay."},
                    {text: "Supports the theme with evidence from the text."},
                ],
            }),
        }),
    },
});

type Story = StoryObj<typeof EditorPageWithStorybookPreview>;

export const EditorDemo: Story = {
    render: (): React.ReactElement => (
        <EditorPageWithStorybookPreview question={question} />
    ),
};
