import FreeResponseEditor from "../free-response-editor";

import type {Meta, StoryObj} from "@storybook/react";

const meta: Meta<typeof FreeResponseEditor> = {
    component: FreeResponseEditor,
    title: "PerseusEditor/Widgets/Free Response Editor",
};

export default meta;
type Story = StoryObj<typeof FreeResponseEditor>;

export const Primary: Story = {
    args: {},
};
