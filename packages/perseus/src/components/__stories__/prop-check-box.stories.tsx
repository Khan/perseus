import * as React from "react";

import PropCheckBox from '../prop-check-box';

type StoryArgs = Record<any, any>;

type Story = {
    title: string
};

export default {
    title: "Perseus/Components/Prop Check Box",
} as Story;

export const TestLabelWithCheckedObject: React.FC<StoryArgs> = (args): React.ReactElement => {
    return (
        <PropCheckBox
            test={true}
            label="Test label"
            onChange={() => {}}
            labelAlignment="left"
        />
    );
};

export const TestLabelWithUncheckedObject: React.FC<StoryArgs> = (args): React.ReactElement => {
    return (
        <PropCheckBox
            test={false}
            label="Test label"
            onChange={() => {}}
            labelAlignment="left"
        />
    );
};

export const TestLabelWithCheckedObjectLabelOnTheRight: React.FC<StoryArgs> = (args): React.ReactElement => {
    return (
        <PropCheckBox
            test={true}
            label="Test label"
            onChange={() => {}}
            labelAlignment="right"
        />
    );
};

export const TestLabelWithUncheckedObjectLabelOnTheRight: React.FC<StoryArgs> = (args): React.ReactElement => {
    return (
        <PropCheckBox
            test={false}
            label="Test label"
            onChange={() => {}}
            labelAlignment="right"
        />
    );
};
