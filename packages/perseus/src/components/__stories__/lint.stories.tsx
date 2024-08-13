import * as React from "react";

import Lint, {Severity} from "../lint";

import type {Meta, StoryObj} from "@storybook/react";

const meta: Meta<typeof Lint> = {
    title: "Perseus/Components/Lint",
    component: Lint,
    args: {
        children: <span>This is the sample lint child</span>,
        insideTable: false,
        message: "Test message",
        ruleName: "Test rule",
    },
    argTypes: {
        children: {table: {disable: true}},
        severity: {
            options: [1, 2, 3, 4],
            control: {
                type: "select",
                labels: {
                    1: "Error",
                    2: "Warning",
                    3: "Recommendation",
                    4: "Offline Reporting Only",
                },
            },
        },
    },
    decorators: [
        (Story) => (
            <Container>
                <Story />
            </Container>
        ),
    ],
};

export default meta;

type Story = StoryObj<typeof Lint>;

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

export const DefaultLintContainerAndMessage: Story = {};
export const SeverityError: Story = {args: {severity: Severity.Error}};
export const SeverityWarning: Story = {args: {severity: Severity.Warning}};
export const SeverityRecommendation: Story = {
    args: {severity: Severity.Recommendation},
};
export const SeverityOfflineReportingOnly: Story = {
    args: {severity: Severity.OfflineReportingOnly},
};

export const InlineLintContainerAndMessage: Story = {
    args: {inline: true},
};
