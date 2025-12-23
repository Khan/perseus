import GraphSettings from "../graph-settings";

import GraphSettingsArgTypes from "./graph-settings.argtypes";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta<typeof GraphSettings> = {
    title: "Editors/Components/Graph Settings",
    component: GraphSettings,
    argTypes: GraphSettingsArgTypes,
};

export default meta;

type Story = StoryObj<typeof GraphSettings>;

export const Default: Story = {
    args: {
        // Separating the array props out because trying to editing them in
        // the controls panel without a default value causes the story to crash.
        range: [
            [-10, 10],
            [-10, 10],
        ],
    },
};
