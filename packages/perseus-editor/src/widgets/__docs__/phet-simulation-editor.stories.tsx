import {action} from "storybook/actions";

import PhetSimulationEditor from "../phet-simulation-editor";

import type {Meta, StoryObj} from "@storybook/react-vite";

// This helps ensure the styles are loaded correctly and timely in storybook preview
import "../../styles/perseus-editor.css";

const meta: Meta = {
    component: PhetSimulationEditor,
    title: "Widgets/PhET Simulation/Editor Demo",
    tags: ["!dev"],
} satisfies Meta<typeof PhetSimulationEditor>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
    args: {
        onChange: action("onChange"),
    },
};
