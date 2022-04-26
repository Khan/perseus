// @flow
import * as React from "react";

type StoryArgs = {||};

type Story = {|
    title: string,
|};

import Lint from "../lint.jsx";

export default ({
    title: "Perseus/Components/Lint",
}: Story);

const defaultObject = {
    children: <div>This is the sample lint child</div>,
    insideTable: false,
    message: "Test message",
    ruleName: "Test rule",
};

export const DefaultLintContainerAndMessage = (args: StoryArgs): React.Node => {
    return <Lint {...defaultObject} />;
};
export const Severity1DefaultLintAndMessage = (args: StoryArgs): React.Node => {
    return <Lint {...defaultObject} severity={1} />;
};
export const Severity2DefaultLintAndMessage = (args: StoryArgs): React.Node => {
    return <Lint {...defaultObject} severity={2} />;
};
export const Severity3DefaultLintAndMessage = (args: StoryArgs): React.Node => {
    return <Lint {...defaultObject} severity={3} />;
};
export const Severity4DefaultLintAndMessage = (args: StoryArgs): React.Node => {
    return <Lint {...defaultObject} severity={4} />;
};
export const InlineLintContainerAndMessage = (args: StoryArgs): React.Node => {
    return <Lint {...defaultObject} inline={true} />;
};
