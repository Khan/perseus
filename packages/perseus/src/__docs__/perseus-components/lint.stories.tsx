import * as React from "react";

import Lint from "../../components/lint";

import type {Meta, StoryObj} from "@storybook/react-vite";

const Container = (Story) => {
    return (
        <div
            style={{
                width: "250px",
                padding: "8px",
                margin: "20px",
                border: "solid 1px grey",
            }}
        >
            <Story />
        </div>
    );
};

const meta: Meta = {
    title: "Perseus/Components/Lint",
    component: Lint,
    decorators: [Container],
    args: {
        children: <div>This is the sample lint child</div>,
        insideTable: false,
        severity: 1,
        message: "Test message",
        ruleName: "Test rule",
    },
    argTypes: {
        severity: {
            type: "number",
            control: {
                type: "range",
                min: 1,
                max: 4,
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof Lint>;

export const DefaultLintContainerAndMessage: Story = {};

export const LintSeverity1Error: Story = {args: {severity: 1}};
export const LintSeverity2Warning: Story = {args: {severity: 2}};
export const LintSeverity3Recommendation: Story = {args: {severity: 3}};
export const LintSeverity4OfflineReportingOnly: Story = {args: {severity: 4}};
export const InlineLintContainerAndMessage: Story = {
    args: {
        inline: true,
    },
};
