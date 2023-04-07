import * as React from "react";

import InputWithExamples from "../input-with-examples";

type StoryArgs = Record<any, any>;

type Story = {
    title: string;
};

export default {
    title: "Perseus/Components/Input with Examples",
} as Story;

const defaultObject = {
    examples: [],
    id: "",
    onChange: () => {},
    value: "",
} as const;
const testExamples = ["Sample 1", "Sample 2", "Sample 3"];

export const DefaultAndMostlyEmptyProps = (
    args: StoryArgs,
): React.ReactElement => {
    return <InputWithExamples {...defaultObject} />;
};

export const ListOfExamples = (args: StoryArgs): React.ReactElement => {
    return <InputWithExamples {...defaultObject} examples={testExamples} />;
};

export const AriaLabelTextWithListOfExamples = (
    args: StoryArgs,
): React.ReactElement => {
    return (
        <InputWithExamples
            {...defaultObject}
            examples={testExamples}
            labelText="Test label"
        />
    );
};

export const DisabledInput = (args: StoryArgs): React.ReactElement => {
    return (
        <InputWithExamples
            {...defaultObject}
            disabled={true}
            examples={testExamples}
        />
    );
};
