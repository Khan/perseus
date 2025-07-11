import * as React from "react";

import MultiButtonGroup from "../multi-button-group";

import type {PropsFor} from "@khanacademy/wonder-blocks-core";
import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Components/Muli-Button Group",
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
