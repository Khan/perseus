// @flow

import * as React from "react";

import ButtonGroup from "../button-group.jsx";

type StoryArgs = {||};

type Story = {|
    title: string,
|};

export default ({
    title: "Perseus/Components/Button Group",
}: Story);

const HarnassedButtonGroup = (
    props: $Rest<
        React.ElementConfig<typeof ButtonGroup>,
        {|
            value: React.ElementConfig<typeof ButtonGroup>["value"],
            onChange: React.ElementConfig<typeof ButtonGroup>["onChange"],
        |},
    >,
) => {
    const [value, updateValue] = React.useState((null: ?string));

    return (
        <ButtonGroup
            {...props}
            value={value}
            onChange={(newValue) => {
                updateValue(newValue);
            }}
        />
    );
};

export const ButtonsWithNoTitles = (args: StoryArgs): React.Node => {
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

export const ButtonsWithTitles = (args: StoryArgs): React.Node => {
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
