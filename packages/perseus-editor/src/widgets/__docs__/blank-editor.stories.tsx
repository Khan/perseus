import {action} from "storybook/actions";

import BlankEditor from "../blank-editor";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta<typeof BlankEditor> = {
    component: BlankEditor,
    title: "PerseusEditor/Widgets/My New Widget Editor",
};

export default meta;
type Story = StoryObj<typeof BlankEditor>;

export const Primary: Story = {
    args: {
        onChange: action("onChange"),
    },
};
