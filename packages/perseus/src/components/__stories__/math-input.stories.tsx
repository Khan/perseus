import * as React from "react";

import MathInput from "../math-input";

type StoryArgs = Record<any, any>;

type Story = {
    title: string;
};

export default {
    title: "Perseus/Components/Math Input",
} as Story;

const defaultObject = {
    keypadButtonSets: {
        advancedRelations: true,
        basicRelations: true,
        divisionKey: true,
        logarithms: true,
        preAlgebra: true,
        trigonometry: true,
    },
    onChange: () => {},
    analytics: {onAnalyticsEvent: () => Promise.resolve()},
} as const;

export const DefaultWithBasicButtonSet = (
    args: StoryArgs,
): React.ReactElement => {
    return <MathInput {...defaultObject} />;
};
export const DefaultWithAriaLabel = (args: StoryArgs): React.ReactElement => {
    return <MathInput {...defaultObject} labelText="Sample label" />;
};

export const KeypadOpenByDefault = (args: StoryArgs): React.ReactElement => {
    return <MathInput {...defaultObject} buttonsVisible="always" />;
};

export const KeypadNeverVisible = (args: StoryArgs): React.ReactElement => {
    return <MathInput {...defaultObject} buttonsVisible="never" />;
};
