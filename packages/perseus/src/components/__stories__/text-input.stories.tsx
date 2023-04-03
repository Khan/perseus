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

export const EmptyPropsObject: React.FC<StoryArgs> = (
    args,
): React.ReactElement => {
    return <TextInput {...defaultObject} />;
};

export const TestValueProvided: React.FC<StoryArgs> = (
    args,
): React.ReactElement => {
    return <TextInput {...defaultObject} value="Test value" />;
};

export const AriaLabelTextProvided: React.FC<StoryArgs> = (
    args,
): React.ReactElement => {
    return <TextInput {...defaultObject} labelText="Test label" />;
};

export const Disabled: React.FC<StoryArgs> = (args): React.ReactElement => {
    return <TextInput {...defaultObject} disabled={true} />;
};
