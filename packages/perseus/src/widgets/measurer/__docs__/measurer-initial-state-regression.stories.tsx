import {themeModes} from "../../../../../../.storybook/modes";

import {measurerRendererDecorator} from "./measurer-renderer-decorator";

import type {PerseusMeasurerWidgetOptions} from "@khanacademy/perseus-core";
import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta<PerseusMeasurerWidgetOptions> = {
    title: "Widgets/Measurer/Visual Regression Tests/Initial State",
    tags: ["!autodocs", "!manifest"],
    parameters: {
        docs: {
            description: {
                component:
                    "Regression tests for the Measurer widget that do NOT " +
                    "need any interactions to test.",
            },
        },
        chromatic: {disableSnapshot: false, modes: themeModes},
    },
};
export default meta;

type Story = StoryObj<typeof meta>;

// Verifies that the protractor tool is drawn into the measurer's graphie
// container. No background image is set, so the protractor renders over the
// widget's blank background.
export const WithProtractor: Story = {
    decorators: [measurerRendererDecorator],
    args: {
        showProtractor: true,
    },
};
