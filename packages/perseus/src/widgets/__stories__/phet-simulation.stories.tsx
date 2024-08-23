import {PhetSimulation} from "../phet-simulation";

import type {Meta, StoryObj} from "@storybook/react";

const meta: Meta<typeof PhetSimulation> = {
    component: PhetSimulation,
    title: "Perseus/Widgets/PhET Simulation",
};

export default meta;
type Story = StoryObj<typeof PhetSimulation>;

export const Primary: Story = {
    args: {
        url: "https://phet.colorado.edu/sims/html/projectile-data-lab/latest/projectile-data-lab_all.html",
        description: "Projectile Data Lab",
    },
};
