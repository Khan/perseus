import * as React from "react";

import PropCheckBox from "../prop-check-box";

type StoryArgs = Record<any, any>;

type Story = {
    title: string;
};

export default {
    title: "Perseus/Components/Prop Check Box",
} as Story;

export const TestLabelWithCheckedObject = (
    args: StoryArgs,
): React.ReactElement => {
    return (
        <PropCheckBox
            test={true}
            label="Test label"
            onChange={() => {}}
            labelAlignment="left"
        />
    );
};

export const TestLabelWithUncheckedObject = (
    args: StoryArgs,
): React.ReactElement => {
    return (
        <PropCheckBox
            test={false}
            label="Test label"
            onChange={() => {}}
            labelAlignment="left"
        />
    );
};

export const TestLabelWithCheckedObjectLabelOnTheRight = (
    args: StoryArgs,
): React.ReactElement => {
    return (
        <PropCheckBox
            test={true}
            label="Test label"
            onChange={() => {}}
            labelAlignment="right"
        />
    );
};

export const TestLabelWithUncheckedObjectLabelOnTheRight = (
    args: StoryArgs,
): React.ReactElement => {
    return (
        <PropCheckBox
            test={false}
            label="Test label"
            onChange={() => {}}
            labelAlignment="right"
        />
    );
};
