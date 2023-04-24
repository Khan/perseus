import * as React from "react";

import Lint from "../lint";

import type {Meta} from "@storybook/react";

const meta: Meta<typeof Lint> = {
    title: "Perseus/Components/Lint",
};

export default meta;

type StoryArgs = Record<any, any>;

const defaultObject = {
    children: <div>This is the sample lint child</div>,
    insideTable: false,
    message: "Test message",
    ruleName: "Test rule",
} as const;

const Container = ({children}: {children: React.ReactNode}) => {
    return (
        <div
            style={{
                width: "250px",
                padding: "8px",
                margin: "20px",
                border: "solid 1px grey",
            }}
        >
            {children}
        </div>
    );
};

export const DefaultLintContainerAndMessage = (
    args: StoryArgs,
): React.ReactElement => {
    return (
        <Container>
            <Lint {...defaultObject} />
        </Container>
    );
};
export const LintSeverity1Error = (args: StoryArgs): React.ReactElement => {
    return (
        <Container>
            <Lint {...defaultObject} severity={1} />
        </Container>
    );
};
export const LintSeverity2Warning = (args: StoryArgs): React.ReactElement => {
    return (
        <Container>
            <Lint {...defaultObject} severity={2} />
        </Container>
    );
};
export const LintSeverity3Recommendation = (
    args: StoryArgs,
): React.ReactElement => {
    return (
        <Container>
            <Lint {...defaultObject} severity={3} />
        </Container>
    );
};
export const LintSeverity4OfflineReportingOnly = (
    args: StoryArgs,
): React.ReactElement => {
    return (
        <Container>
            <Lint {...defaultObject} severity={4} />
        </Container>
    );
};
export const InlineLintContainerAndMessage = (
    args: StoryArgs,
): React.ReactElement => {
    return (
        <Container>
            <Lint {...defaultObject} inline={true} />
        </Container>
    );
};
