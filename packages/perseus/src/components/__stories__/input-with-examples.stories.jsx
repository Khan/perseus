// @flow
import * as React from "react";

import InputWithExamples from "../input-with-examples.jsx";

type StoryArgs = {||};

type Story = {|
    title: string,
|};

export default ({
    title: "Perseus/Components/Input with Examples",
}: Story);

const defaultObject = {
    examples: [],
    id: "",
    onChange: () => {},
};
const testExamples = ["Sample 1", "Sample 2", "Sample 3"];

export const DefaultAndMostlyEmptyProps = (args: StoryArgs): React.Node => {
    return <InputWithExamples {...defaultObject} />;
};

export const ListOfExamples = (args: StoryArgs): React.Node => {
    return <InputWithExamples {...defaultObject} examples={testExamples} />;
};

export const AriaLabelTextWithListOfExamples = (
    args: StoryArgs,
): React.Node => {
    return (
        <InputWithExamples
            {...defaultObject}
            examples={testExamples}
            labelText="Test label"
        />
    );
};

export const DisabledInput = (args: StoryArgs): React.Node => {
    return (
        <InputWithExamples
            {...defaultObject}
            disabled={true}
            examples={testExamples}
        />
    );
};
