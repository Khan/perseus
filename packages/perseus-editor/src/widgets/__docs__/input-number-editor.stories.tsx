import {action} from "storybook/actions";

import InputNumberEditor from "../input-number-editor";

import type {Meta, StoryObj} from "@storybook/react-vite";

// This helps ensure the styles are loaded correctly and timely in storybook preview
import "../../styles/perseus-editor.css";

const meta = {
    title: "Widgets/Input Number/Editor Demo",
    component: InputNumberEditor,
    tags: ["!dev"],
} as Meta;
export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
    args: {
        onChange: action("onChange"),
    },
};
