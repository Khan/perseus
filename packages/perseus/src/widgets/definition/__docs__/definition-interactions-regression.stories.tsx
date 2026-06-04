import {themeModes} from "../../../../../../.storybook/modes";

import {definitionRendererDecorator} from "./definition-renderer-decorator";

import type {DefinitionDefaultWidgetOptions} from "@khanacademy/perseus-core";
import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta<DefinitionDefaultWidgetOptions> = {
    title: "Widgets/Definition/Visual Regression Tests/Interactions",
    tags: ["!autodocs", "!manifest"],
    parameters: {
        docs: {
            description: {
                component:
                    "Regression tests for the definition widget that DO need some sort of interaction to test, which will be used with Chromatic. Stories are displayed on their own page.",
            },
        },
        chromatic: {disableSnapshot: false, modes: themeModes},
    },
    decorators: [definitionRendererDecorator],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const FocusedState: Story = {
    args: {
        definition:
            "A Native American people in Connecticut; white settlers in New England, the Pequots, and their respective allies were at war from 1636-1638.",
        togglePrompt: "the Pequots",
    },
    parameters: {
        content:
            "The Governor and Council of the Massachusetts had much conference many days; and at last . . . . concluded a peace and friendship with [[\u2603 definition 1]], upon these conditions.",
    },
    play: async ({canvas}) => {
        const definitionTrigger = canvas.getByRole("button", {
            name: "Definition of: the Pequots",
        });
        definitionTrigger.focus();
    },
};

export const ClickedState: Story = {
    args: {
        definition:
            "A Native American people in Connecticut; white settlers in New England, the Pequots, and their respective allies were at war from 1636-1638.",
        togglePrompt: "the Pequots",
    },
    parameters: {
        content:
            "The Governor and Council of the Massachusetts had much conference many days; and at last . . . . concluded a peace and friendship with [[\u2603 definition 1]], upon these conditions.",
    },
    play: async ({canvas, userEvent}) => {
        const definitionTrigger = canvas.getByRole("button", {
            name: "Definition of: the Pequots",
        });
        await userEvent.click(definitionTrigger);
    },
};
