import {action} from "storybook/actions";

import PythonProgramEditor from "../python-program-editor";

import type {Meta, StoryObj} from "@storybook/react-vite";

// This helps ensure the styles are loaded correctly and timely in storybook preview
import "../../styles/perseus-editor.css";

const meta: Meta = {
    title: "Widgets/Python Program/Editor Demo",
    component: PythonProgramEditor,
    tags: ["!dev"],
} satisfies Meta<typeof PythonProgramEditor>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
    args: {
        onChange: action("onChange"),
    },
};
