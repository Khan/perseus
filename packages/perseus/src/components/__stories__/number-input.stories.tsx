import {View} from "@khanacademy/wonder-blocks-core";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {action} from "@storybook/addon-actions";

import NumberInput from "../number-input";

import type {Meta, StoryObj} from "@storybook/react";

const meta: Meta = {
    title: "Perseus/Components/Number Input",
    component: NumberInput,
    args: {
        onChange: action("onChange"),
        onFormatChange: action("onFormatChange"),
    },
    argTypes: {
        onChange: {control: {type: null}},
        onFormatChange: {control: {type: null}},
    },
};
export default meta;

type Story = StoryObj<typeof NumberInput>;

export const EmptyPropsObject: Story = {};

export const SampleValue: Story = {
    args: {value: 1234567890},
};

export const Placeholder: Story = {
    args: {
        placeholder: "Sample placeholder",
    },
};

export const SizeMini: Story = {
    args: {
        size: "mini",
        placeholder: "Sample placeholder",
    },
};

export const SizeSmall: Story = {
    args: {
        size: "small",
        placeholder: "Sample placeholder",
    },
};

export const SizeNormal: Story = {
    args: {
        size: "normal",
        placeholder: "Sample placeholder",
    },
};

// Putting all of these variants together in one story so that we only need
// one snapshot test to capture all of them.
/**
 * This story shows all the visual variants of the NumberInput component
 * in one place:
 * 1. Empty input
 * 2. Populated input
 * 3. Input with placeholder
 * 4. "mini" size
 * 5. "small" size
 * 6. "normal" size
 */
export const VisualVariants: Story = {
    render: () => (
        <View style={{width: 200}}>
            <NumberInput />
            <Strut size={spacing.small_12} />
            <NumberInput value={1234567890} />
            <Strut size={spacing.small_12} />
            <NumberInput placeholder="Sample placeholder" />
            <Strut size={spacing.small_12} />
            <NumberInput size="mini" />
            <Strut size={spacing.small_12} />
            <NumberInput size="small" />
            <Strut size={spacing.small_12} />
            <NumberInput size="normal" />
        </View>
    ),
    parameters: {
        chromatic: {
            // Enable visual testing on the visual variants of this component.
            disableSnapshot: false,
        },
    },
};
