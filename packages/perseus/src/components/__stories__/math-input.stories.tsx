import * as React from "react";

import MathInput from '../math-input';

type StoryArgs = Record<any, any>;

type Story = {
    title: string
};

export default {
    title: "Perseus/Components/Math Input",
} as Story;

const defaultObject = {
    buttonSets: ["basic"],
    onChange: () => {},
} as const;

export const DefaultWithBasicButtonSet: React.FC<StoryArgs> = (args): React.ReactElement => {
// @ts-expect-error [FEI-5003] - TS2786 - 'MathInput' cannot be used as a JSX component.
    return <MathInput {...defaultObject} />;
};
export const AlwaysVisibleButtonSet: React.FC<StoryArgs> = (args): React.ReactElement => {
// @ts-expect-error [FEI-5003] - TS2786 - 'MathInput' cannot be used as a JSX component.
    return <MathInput {...defaultObject} buttonsVisible="always" />;
};
export const DefaultWithAriaLabel: React.FC<StoryArgs> = (args): React.ReactElement => {
// @ts-expect-error [FEI-5003] - TS2786 - 'MathInput' cannot be used as a JSX component.
    return <MathInput {...defaultObject} labelText="Sample label" />;
};
