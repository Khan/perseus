import * as React from "react";
import {action} from "storybook/actions";

import {themeModes} from "../../../../.storybook/modes";
import NavigationPad from "../components/keypad/navigation-pad";

import TintedBackgroundDecorator from "./tinted-background-decorator";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta<typeof NavigationPad> = {
    title: "Math Input/Components/Visual Regression Tests/Interactions",
    component: NavigationPad,
    tags: ["!autodocs", "!manifest"],
    parameters: {
        docs: {
            description: {
                component:
                    "Regression tests for math-input components that DO need " +
                    "interactions to test.",
            },
        },
        chromatic: {disableSnapshot: false, modes: themeModes},
    },
    decorators: [
        (Story) => (
            <div style={{padding: 50}}>
                <Story />
            </div>
        ),
        TintedBackgroundDecorator,
    ],
    args: {
        onClickKey: action("onClickKey"),
    },
};
export default meta;

type Story = StoryObj<typeof NavigationPad>;

// NavigationPad renders inline (not a portal) so canvas queries work directly.
export const NavigationButtonPressed: Story = {
    play: async ({canvas, userEvent}) => {
        const button = canvas.getByRole("button", {name: "Left arrow"});
        await userEvent.pointer({target: button, keys: "[MouseLeft>]"});
    },
};
