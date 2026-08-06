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

export const WithProtractorAndRuler: Story = {
    decorators: [measurerRendererDecorator],
    args: {
        showProtractor: true,
        showRuler: true,
    },
};
