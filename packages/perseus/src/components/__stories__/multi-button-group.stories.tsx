import * as React from "react";

import MultiButtonGroup from "../multi-button-group";

type StoryArgs = {
    allowEmpty: boolean;
};

type Story = {
    title: string;
    args: StoryArgs;
};

export default {
    title: "Perseus/Components/Muli-Button Group",
    args: {
        allowEmpty: true,
    },
} as Story;

const HarnassedButtonGroup = (
    props: Pick<
        React.ComponentProps<typeof MultiButtonGroup>,
        "buttons" | "allowEmpty"
    >,
) => {
    const [values, updateValues] = React.useState(
        null as ReadonlyArray<string> | null | undefined,
    );

    return (
        <MultiButtonGroup
            {...props}
            values={values}
            onChange={(newValues) => {
                updateValues(newValues);
            }}
        />
    );
};

export const ButtonsWithNoTitles = (args: StoryArgs): React.ReactElement => {
    return (
        <HarnassedButtonGroup
            {...args}
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
            {...args}
            buttons={[
                {value: "One", content: "Item #1", title: "The first item"},
                {value: "Two", content: "Item #2", title: "The second item"},
                {value: "Three", content: "Item #3", title: "The third item"},
            ]}
        />
    );
};
