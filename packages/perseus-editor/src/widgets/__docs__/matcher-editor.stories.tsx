import {action} from "storybook/actions";

import MatcherEditor from "../matcher-editor";

import type {Meta, StoryObj} from "@storybook/react-vite";

// This helps ensure the styles are loaded correctly and timely in storybook preview
import "../../styles/perseus-editor.css";

const meta: Meta = {
    title: "Widgets/Matcher/Editor Demo",
    component: MatcherEditor,
    tags: ["!dev"],
} satisfies Meta<typeof MatcherEditor>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
    args: {
        onChange: action("onChange"),
    },
};
