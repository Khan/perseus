import * as React from "react";

type StoryArgs = Record<any, any>;

type Story = {
    title: string
};

import Lint from '../lint';

export default {
    title: "Perseus/Components/Lint",
} as Story;

const defaultObject = {
    children: <div>This is the sample lint child</div>,
    insideTable: false,
    message: "Test message",
    ruleName: "Test rule",
} as const;

export const DefaultLintContainerAndMessage: React.FC<StoryArgs> = (args): React.ReactElement => {
    return <Lint {...defaultObject} />;
};
export const Severity1DefaultLintAndMessage: React.FC<StoryArgs> = (args): React.ReactElement => {
    return <Lint {...defaultObject} severity={1} />;
};
export const Severity2DefaultLintAndMessage: React.FC<StoryArgs> = (args): React.ReactElement => {
    return <Lint {...defaultObject} severity={2} />;
};
export const Severity3DefaultLintAndMessage: React.FC<StoryArgs> = (args): React.ReactElement => {
    return <Lint {...defaultObject} severity={3} />;
};
export const Severity4DefaultLintAndMessage: React.FC<StoryArgs> = (args): React.ReactElement => {
    return <Lint {...defaultObject} severity={4} />;
};
export const InlineLintContainerAndMessage: React.FC<StoryArgs> = (args): React.ReactElement => {
    return <Lint {...defaultObject} inline={true} />;
};
