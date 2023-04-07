import * as React from "react";

import NumberInput from "../number-input";

type StoryArgs = Record<any, any>;

type Story = {
    title: string;
};

const defaultObject = {
    onChange: () => {},
} as const;

export default {
    title: "Perseus/Components/Number Input",
} as Story;

export const EmptyPropsObject = (args: StoryArgs): React.ReactElement => {
    return <NumberInput {...defaultObject} />;
};

export const SampleValue = (args: StoryArgs): React.ReactElement => {
    return <NumberInput {...defaultObject} value={1234567890} />;
};

export const Placeholder = (args: StoryArgs): React.ReactElement => {
    return <NumberInput {...defaultObject} placeholder="Sample placeholder" />;
};

export const SizeMini = (args: StoryArgs): React.ReactElement => {
    return <NumberInput {...defaultObject} placeholder="Sample placeholder" />;
};

export const SizeSmall = (args: StoryArgs): React.ReactElement => {
    return <NumberInput {...defaultObject} size="small" />;
};

export const SizeNormal = (args: StoryArgs): React.ReactElement => {
    return <NumberInput {...defaultObject} size="normal" />;
};
