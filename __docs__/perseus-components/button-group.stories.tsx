import * as React from "react";

import ButtonGroup from "../../packages/perseus/src/components/button-group";

import type {Meta, StoryObj} from "@storybook/react-vite";

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
