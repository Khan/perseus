import {themeModes} from "../../../../../../.storybook/modes";

import {phetSimulationRendererDecorator} from "./phet-simulation-renderer-decorator";

import type {PerseusPhetSimulationWidgetOptions} from "@khanacademy/perseus-core";
import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta<PerseusPhetSimulationWidgetOptions> = {
    title: "Widgets/PhET Simulation/Visual Regression Tests/Initial State",
    tags: ["!autodocs", "!manifest"],
    parameters: {
        docs: {
            description: {
                component:
                    "Regression tests for the PhET Simulation widget that do NOT " +
                    "need any interactions to test.",
            },
        },
        chromatic: {disableSnapshot: false, modes: themeModes},
    },
};
export default meta;

type Story = StoryObj<typeof meta>;

// A non-PhET URL is rejected before any network request is made, so this
// renders the widget's container and iframe borders deterministically without
// depending on a real fetch to phet.colorado.edu succeeding.
export const LoadFailure: Story = {
    decorators: [phetSimulationRendererDecorator],
    args: {
        url: "https://example.com/",
        description: "Example",
    } satisfies Partial<PerseusPhetSimulationWidgetOptions>,
};
