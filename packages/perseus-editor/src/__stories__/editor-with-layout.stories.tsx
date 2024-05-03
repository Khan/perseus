import EditorWithLayout from "../editor-with-layout";

import type {Meta, StoryObj} from "@storybook/react";

type Story = StoryObj<typeof EditorWithLayout>;

const meta: Meta<typeof EditorWithLayout> = {
    title: "PerseusEditor/EditorWithLayout",
    component: EditorWithLayout,
};

export const Default: Story = {
    args: {},
};

export default meta;
