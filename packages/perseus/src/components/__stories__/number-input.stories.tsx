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

export const EmptyPropsObject: React.FC<StoryArgs> = (
    args,
): React.ReactElement => {
    return <NumberInput {...defaultObject} />;
};

export const SampleValue: React.FC<StoryArgs> = (args): React.ReactElement => {
    return <NumberInput {...defaultObject} value={1234567890} />;
};

export const Placeholder: React.FC<StoryArgs> = (args): React.ReactElement => {
    return <NumberInput {...defaultObject} placeholder="Sample placeholder" />;
};

export const SizeMini: React.FC<StoryArgs> = (args): React.ReactElement => {
    return <NumberInput {...defaultObject} placeholder="Sample placeholder" />;
};

export const SizeSmall: React.FC<StoryArgs> = (args): React.ReactElement => {
    return <NumberInput {...defaultObject} size="small" />;
};

export const SizeNormal: React.FC<StoryArgs> = (args): React.ReactElement => {
    return <NumberInput {...defaultObject} size="normal" />;
};
