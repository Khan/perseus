import {View} from "@khanacademy/wonder-blocks-core";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import * as React from "react";

import ButtonGroup from "../button-group";

import type {Meta, StoryObj} from "@storybook/react";

type StoryArgs = StoryObj<ButtonGroup>;

type Story = Meta<ButtonGroup>;

export default {
    title: "Perseus/Components/Button Group",
} as Story;

const HarnassedButtonGroup = (
    props: Pick<React.ComponentProps<typeof ButtonGroup>, "buttons">,
) => {
    const [value, updateValue] = React.useState(
        null as string | null | undefined,
    );

    return (
        <ButtonGroup
            buttons={props.buttons}
            value={value}
            onChange={(newValue) => {
                updateValue(newValue);
            }}
        />
    );
};

export const ButtonsWithNoTitles = (args: StoryArgs): React.ReactElement => {
    return (
        <HarnassedButtonGroup
            buttons={[
                {value: "One", content: "Item #1"},
                {value: "Two", content: "Item #2"},
                {value: "Three", content: "Item #3"},
            ]}
        />
    );
};

export const ButtonsWithTitles = (args: StoryArgs): React.ReactElement => {
    return (
        <HarnassedButtonGroup
            buttons={[
                {value: "One", content: "Item #1", title: "The first item"},
                {value: "Two", content: "Item #2", title: "The second item"},
                {value: "Three", content: "Item #3", title: "The third item"},
            ]}
        />
    );
};

// Putting all of these variants together in one story so that we only need
// one snapshot test to capture all of them.
/**
 * This story shows what the ButtonGroup looks like when
 * 1. No buttons are selected
 * 2. A button is selected
 */
export const VisualVariants: Story = {
    render: () => (
        <View>
            <ButtonGroup
                buttons={[
                    {value: "One", content: "Item #1"},
                    {value: "Two", content: "Item #2"},
                    {value: "Three", content: "Item #3"},
                ]}
                value=""
                onChange={() => {}}
            />
            <Strut size={spacing.medium_16} />
            <ButtonGroup
                buttons={[
                    {value: "One", content: "Item #1"},
                    {value: "Two", content: "Item #2"},
                    {value: "Three", content: "Item #3"},
                ]}
                value="One"
                onChange={() => {}}
            />
        </View>
    ),
    parameters: {
        chromatic: {
            // Enable visual testing on the visual variants of this component.
            disableSnapshot: false,
        },
    },
};
