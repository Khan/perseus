import {ApiOptions} from "../../perseus-api";

import {PhetSimulation} from "./phet-simulation";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta<typeof PhetSimulation> = {
    title: "Widgets/PhET Simulation",
    component: PhetSimulation,
    tags: ["autodocs", "!dev"],
    parameters: {
        componentSubtitle:
            "A widget for embedding interactive physics simulations from PhET Colorado,\
            allowing users to experiment with scientific concepts through interactive visualizations.",
        // Since by default, we don't show all stories in autodocs; this will show all stories in autodocs only for this component.
        docs: {disable: false},
    },
};

export default meta;

type Story = StoryObj<typeof PhetSimulation>;

// Story showing the PhetSimulation component directly
export const Default: Story = {
    args: {
        url: "https://phet.colorado.edu/sims/html/projectile-data-lab/latest/projectile-data-lab_all.html",
        description: "Projectile Data Lab",
        apiOptions: {
            ...ApiOptions.defaults,
            isMobileApp: false,
        },
    },
};
