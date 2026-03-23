import {View} from "@khanacademy/wonder-blocks-core";
import * as React from "react";
import {action} from "storybook/actions";

import TintedBackgroundDecorator from "../../__docs__/tinted-background-decorator";

import NavigationPad from "./navigation-pad";

import type {Meta, StoryObj} from "@storybook/react-vite";

type Story = StoryObj<typeof NavigationPad>;

export default {
    title: "Math Input/Components/MathInput v2 Navigation Pad",
    component: NavigationPad,
    args: {
        onClickKey: action("onClickKey"),
    },
    tags: ["!dev"],
    decorators: [
        // Order is important here. Padding decorator must be first!
        (Story) => (
            <View style={{padding: "50px"}}>
                <Story />
            </View>
        ),
        TintedBackgroundDecorator,
    ],
} satisfies Meta<typeof NavigationPad>;

export const Basic: Story = {};
