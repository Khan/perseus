import * as React from "react";

import Lint from "../lint";

import type {Meta, StoryObj} from "@storybook/react";

const meta: Meta<typeof Lint> = {
    title: "Perseus/Components/Lint",
    component: Lint,
    args: {
        children: <div>This is the sample lint child</div>,
        insideTable: false,
        message: "Test message",
        ruleName: "Test rule",
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
export const LintSeverity1Error: Story = {args: {severity: 1}};
export const LintSeverity2Error: Story = {args: {severity: 2}};
export const LintSeverity3Error: Story = {args: {severity: 3}};
export const LintSeverity4Error: Story = {args: {severity: 4}};

export const InlineLintContainerAndMessage: Story = {
    args: {inline: true},
};
