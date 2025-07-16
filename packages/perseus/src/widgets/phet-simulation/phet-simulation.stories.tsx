import {ApiOptions} from "../../perseus-api";

import {PhetSimulation} from "./phet-simulation";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta<typeof PhetSimulation> = {
    title: "Widgets/PhET Simulation",
    component: PhetSimulation,
    parameters: {
        docs: {
            description: {
                component:
                    "PhET Simulation widget for embedding interactive simulations from PhET Colorado",
            },
        },
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
    parameters: {
        docs: {
            disable: false, // This specific story will be shown in autodocs as the default story
        },
    },
};
