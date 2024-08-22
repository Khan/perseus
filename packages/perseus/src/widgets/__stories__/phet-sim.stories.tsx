import {PhetSim} from "../phet-sim";

import type {Meta, StoryObj} from "@storybook/react";

const meta: Meta<typeof PhetSim> = {
    component: PhetSim,
    title: "Perseus/Widgets/PhET Simulation",
};

export default meta;
type Story = StoryObj<typeof PhetSim>;

export const Primary: Story = {
    args: {
        url: "https://phet.colorado.edu/sims/html/projectile-data-lab/latest/projectile-data-lab_all.html",
        description: "Projectile Data Lab",
    },
};
