import {action} from "storybook/actions";

import PhetSimulationEditor from "../phet-simulation-editor";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta<typeof PhetSimulationEditor> = {
    component: PhetSimulationEditor,
    title: "Widgets/PhET Simulation/Editor Demo",
    tags: ["!dev"],
    parameters: {
        docs: {
            description: {
                component:
                    "An editor for adding a PhET simulation widget that allows users to interact with physics simulations.",
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof PhetSimulationEditor>;

export const Primary: Story = {
    args: {
        onChange: action("onChange"),
    },
};
