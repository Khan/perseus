import {expect} from "storybook/test";

import {themeModes} from "../../../../../../.storybook/modes";

import {phetSimulationRendererDecorator} from "./phet-simulation-renderer-decorator";

import type {PerseusPhetSimulationWidgetOptions} from "@khanacademy/perseus-core";
import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta<PerseusPhetSimulationWidgetOptions> = {
    title: "Widgets/PhET Simulation/Visual Regression Tests/Interactions",
    tags: ["!autodocs", "!manifest"],
    parameters: {
        docs: {
            description: {
                component:
                    "Regression tests for the PhET Simulation widget that DO " +
                    "need interactions to test.",
            },
        },
        chromatic: {disableSnapshot: false, modes: themeModes},
    },
};
export default meta;

type Story = StoryObj<typeof meta>;

const simArgs = {
    url: "https://phet.colorado.edu/sims/html/projectile-data-lab/latest/projectile-data-lab_all.html",
    description: "Projectile Data Lab",
} satisfies Partial<PerseusPhetSimulationWidgetOptions>;

// Clicking Fullscreen while running as the mobile app enters the "fake
// fullscreen" mode (there's no Fullscreen API in the mobile app webview) —
// the only state where the close button and fullscreen container render.
// Requires a successful sim load, so this depends on a real fetch to
// phet.colorado.edu succeeding.
export const MobileAppFullscreen: Story = {
    decorators: [phetSimulationRendererDecorator],
    parameters: {
        apiOptions: {isMobileApp: true},
    },
    args: simArgs,
    play: async ({canvas, userEvent}) => {
        const fullscreenButton = await canvas.findByRole("button", {
            name: "Fullscreen",
        });
        await userEvent.click(fullscreenButton);
        await expect(
            await canvas.findByRole("button", {name: "Exit fullscreen"}),
        ).toBeInTheDocument();
    },
};
