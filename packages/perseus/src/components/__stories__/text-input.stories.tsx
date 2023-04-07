import * as React from "react";

import TextInput from "../text-input";

type StoryArgs = Record<any, any>;

type Story = {
    title: string;
};

export default {
    title: "Perseus/Components/Text Input",
} as Story;

const defaultObject = {
    onChange: () => {},
} as const;

export const EmptyPropsObject = (args: StoryArgs): React.ReactElement => {
    return <TextInput {...defaultObject} />;
};

export const TestValueProvided = (args: StoryArgs): React.ReactElement => {
    return <TextInput {...defaultObject} value="Test value" />;
};

export const AriaLabelTextProvided = (args: StoryArgs): React.ReactElement => {
    return <TextInput {...defaultObject} labelText="Test label" />;
};

export const Disabled = (args: StoryArgs): React.ReactElement => {
    return <TextInput {...defaultObject} disabled={true} />;
};
