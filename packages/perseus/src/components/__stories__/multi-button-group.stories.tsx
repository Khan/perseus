import {View} from "@khanacademy/wonder-blocks-core";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import * as React from "react";

import MultiButtonGroup from "../multi-button-group";

import type {PropsFor} from "@khanacademy/wonder-blocks-core";
import type {Meta, StoryObj} from "@storybook/react";

const meta: Meta = {
    title: "Perseus/Components/Muli-Button Group",
    component: MultiButtonGroup,
    args: {
        allowEmpty: true,
        buttons: [],
    },
    // @ts-expect-error: Type 'Args' is missing the following properties from type 'Pick<Props, "onChange" | "buttons">': onChange, buttons
    render: function WithState(props: PropsFor<typeof MultiButtonGroup>) {
        const [values, updateValues] = React.useState(props.values);
        return (
            <MultiButtonGroup
                {...props}
                values={values}
                onChange={updateValues}
            />
        );
    },
};
export default meta;

type Story = StoryObj<typeof MultiButtonGroup>;

export const ButtonsWithNoTitles: Story = {
    args: {
        buttons: [
            {value: "One", content: "Item #1"},
            {value: "Two", content: "Item #2"},
            {value: "Three", content: "Item #3"},
        ],
    },
};

/**
 * Hover over the buttons to see their titles.
 */
export const ButtonsWithTitles: Story = {
    args: {
        buttons: [
            {value: "One", content: "Item #1", title: "The first item"},
            {value: "Two", content: "Item #2", title: "The second item"},
            {value: "Three", content: "Item #3", title: "The third item"},
        ],
    },
};

// Putting all of these variants together in one story so that we only need
// one snapshot test to capture all of them.
/**
 * This story shows what the ButtonGroup looks like when
 * 1. No buttons are selected
 * 2. Two buttons are selected
 */
export const VisualVariants: Story = {
    render: () => (
        <View>
            <MultiButtonGroup
                buttons={[
                    {value: "One", content: "Item #1"},
                    {value: "Two", content: "Item #2"},
                    {value: "Three", content: "Item #3"},
                ]}
                values={[]}
                onChange={() => {}}
            />
            <Strut size={spacing.medium_16} />
            <MultiButtonGroup
                buttons={[
                    {value: "One", content: "Item #1"},
                    {value: "Two", content: "Item #2"},
                    {value: "Three", content: "Item #3"},
                ]}
                values={["One", "Three"]}
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
