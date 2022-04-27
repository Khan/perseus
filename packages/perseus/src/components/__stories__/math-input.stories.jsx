// @flow
import * as React from "react";

import MathInput from "../math-input.jsx";

type StoryArgs = {||};

type Story = {|
    title: string,
|};

export default ({
    title: "Perseus/Components/Math Input",
}: Story);

const defaultObject = {
    buttonSets: ["basic"],
    onChange: () => {},
};

export const DefaultWithBasicButtonSet = (args: StoryArgs): React.Node => {
    return <MathInput {...defaultObject} />;
};
export const AlwaysVisibleButtonSet = (args: StoryArgs): React.Node => {
    return <MathInput {...defaultObject} buttonsVisible="always" />;
};
export const DefaultWithAriaLabel = (args: StoryArgs): React.Node => {
    return <MathInput {...defaultObject} labelText="Sample label" />;
};
