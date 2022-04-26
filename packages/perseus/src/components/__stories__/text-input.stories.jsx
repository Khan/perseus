// @flow
import * as React from "react";

import TextInput from "../text-input.jsx";

type StoryArgs = {||};

type Story = {|
    title: string,
|};

export default ({
    title: "Perseus/Components/Text Input",
}: Story);

const defaultObject = {
    onChange: () => {},
};

export const EmptyPropsObject = (args: StoryArgs): React.Node => {
    return <TextInput {...defaultObject} />;
};

export const TestValueProvided = (args: StoryArgs): React.Node => {
    return <TextInput {...defaultObject} value="Test value" />;
};

export const AriaLabelTextProvided = (args: StoryArgs): React.Node => {
    return <TextInput {...defaultObject} labelText="Test label" />;
};

export const Disabled = (args: StoryArgs): React.Node => {
    return <TextInput {...defaultObject} disabled={true} />;
};
