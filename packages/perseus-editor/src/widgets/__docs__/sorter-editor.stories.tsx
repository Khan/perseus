import {action} from "storybook/actions";

import SorterEditor from "../sorter-editor";

import type {Meta, StoryObj} from "@storybook/react-vite";

// This helps ensure the styles are loaded correctly and timely in storybook preview
import "../../styles/perseus-editor.css";

const meta: Meta = {
    title: "Widgets/Sorter/Editor Demo",
    component: SorterEditor,
    tags: ["!dev"],
} satisfies Meta<typeof SorterEditor>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
    args: {
        onChange: action("onChange"),
    },
};
