import InteractiveGraphSettings from "../../widgets/interactive-graph-editor/components/interactive-graph-settings";

import InteractiveGraphSettingsArgTypes from "./interactive-graph-settings.argtypes";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta<typeof InteractiveGraphSettings> = {
    title: "Editors/Components/Interactive Graph Settings",
    component: InteractiveGraphSettings,
    argTypes: InteractiveGraphSettingsArgTypes,
};

export default meta;

type Story = StoryObj<typeof InteractiveGraphSettings>;

export const Default: Story = {
    args: {
        box: [288, 288] as const,
        gridStep: [1, 1],
        labels: ["x", "y"],
        markings: "graph",
        range: [
            [-10, 10],
            [-10, 10],
        ],
        showProtractor: false,
        showTooltips: false,
        snapStep: [1, 1],
        step: [1, 1],
    },
};
