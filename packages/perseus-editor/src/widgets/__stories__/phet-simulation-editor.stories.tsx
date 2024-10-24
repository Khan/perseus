import {action} from "@storybook/addon-actions";
import type {Meta, StoryObj} from "@storybook/react";
import PhetSimulationEditor from "../phet-simulation-editor";

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
