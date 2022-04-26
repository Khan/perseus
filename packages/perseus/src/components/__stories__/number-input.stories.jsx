// @flow
import * as React from "react";

import NumberInput from "../number-input.jsx";

type StoryArgs = {||};

type Story = {|
    title: string,
|};

const defaultObject = {
    onChange: () => {},
};

export default ({
    title: "Perseus/Components/Number Input",
}: Story);

export const EmptyPropsObject = (args: StoryArgs): React.Node => {
    return <NumberInput {...defaultObject} />;
};

export const SampleValue = (args: StoryArgs): React.Node => {
    return <NumberInput {...defaultObject} value={1234567890} />;
};

export const Placeholder = (args: StoryArgs): React.Node => {
    return <NumberInput {...defaultObject} placeholder="Sample placeholder" />;
};

export const SizeMini = (args: StoryArgs): React.Node => {
    return <NumberInput {...defaultObject} placeholder="Sample placeholder" />;
};

export const SizeSmall = (args: StoryArgs): React.Node => {
    return <NumberInput {...defaultObject} size="small" />;
};

export const SizeNormal = (args: StoryArgs): React.Node => {
    return <NumberInput {...defaultObject} size="normal" />;
};
