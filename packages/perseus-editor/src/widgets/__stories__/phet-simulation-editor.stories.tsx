import {action} from "storybook/actions";

import PhetSimulationEditor from "../phet-simulation-editor";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta<typeof PhetSimulationEditor> = {
    component: PhetSimulationEditor,
    title: "PerseusEditor/Widgets/PhET Simulation Editor",
};

export default meta;
type Story = StoryObj<typeof PhetSimulationEditor>;

export const Primary: Story = {
    args: {
        onChange: action("onChange"),
    },
};
