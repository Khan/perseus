import * as React from "react";

import {LegendBar} from "./legend-bar";

import type {Meta, StoryObj} from "@storybook/react-vite";

/**
 * `LegendBar` is the line along the Sorter legend. These stories place it
 * next to stand-in blanks to show how it stretches with them.
 */
const meta: Meta<typeof LegendBar> = {
    title: "Widgets/Sorter/Legend Bar",
    component: LegendBar,
    // Each story's layout is built for one orientation, so switching it
    // here would break the layout rather than show the other orientation.
    argTypes: {orientation: {control: false}},
    // Matches the answer area width in Figma, so both ends of the bar
    // stay in view.
    decorators: [
        (Story) => (
            <div style={{maxInlineSize: 672}}>
                <Story />
            </div>
        ),
    ],
};

export default meta;

type Story = StoryObj<typeof LegendBar>;

// Stand-ins for the drag-and-drop blanks, which need a dnd provider.
// Todo(anakaren): Remove once new Sorter is available
const blankStyle: React.CSSProperties = {
    flex: "1 1 0",
    minBlockSize: 48,
    border: "var(--wb-border-width-thin) dashed var(--wb-semanticColor-core-border-neutral-default)",
    borderRadius: "var(--wb-border-radius-radius_040)",
};

function Blanks(props: {direction: "row" | "column"}) {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: props.direction,
                flexGrow: 1,
                gap: "var(--wb-sizing-size_160)",
            }}
        >
            <div style={blankStyle} />
            <div style={blankStyle} />
            <div style={blankStyle} />
        </div>
    );
}

const columnStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "var(--wb-sizing-size_240)",
};

// The padding leaves room for the vertical arrows, which extend past the
// line on both sides.
const rowStyle: React.CSSProperties = {
    display: "flex",
    gap: "var(--wb-sizing-size_240)",
    paddingInlineStart: "var(--wb-sizing-size_160)",
};

function HorizontalBelowLayout(props: React.ComponentProps<typeof LegendBar>) {
    return (
        <div style={columnStyle}>
            <Blanks direction="row" />
            <LegendBar {...props} />
        </div>
    );
}

function VerticalLayout(props: React.ComponentProps<typeof LegendBar>) {
    return (
        <div style={rowStyle}>
            <LegendBar {...props} />
            <Blanks direction="column" />
        </div>
    );
}

export const HorizontalAbove: Story = {
    args: {orientation: "horizontal", startCap: "arrow", endCap: "arrow"},
    render: (args) => (
        <div style={columnStyle}>
            <LegendBar {...args} />
            <Blanks direction="row" />
        </div>
    ),
};

export const HorizontalBelow: Story = {
    args: {orientation: "horizontal", startCap: "arrow", endCap: "arrow"},
    render: (args) => <HorizontalBelowLayout {...args} />,
};

export const HorizontalBars: Story = {
    args: {orientation: "horizontal", startCap: "bar", endCap: "bar"},
    render: (args) => <HorizontalBelowLayout {...args} />,
};

export const HorizontalMixed: Story = {
    args: {orientation: "horizontal", startCap: "arrow", endCap: "bar"},
    render: (args) => <HorizontalBelowLayout {...args} />,
};

export const HorizontalNoCaps: Story = {
    args: {orientation: "horizontal", startCap: "none", endCap: "none"},
    render: (args) => <HorizontalBelowLayout {...args} />,
};

export const HorizontalRightToLeft: Story = {
    args: {orientation: "horizontal", startCap: "arrow", endCap: "bar"},
    render: (args) => (
        <div dir="rtl">
            <HorizontalBelowLayout {...args} />
        </div>
    ),
};

export const Vertical: Story = {
    args: {orientation: "vertical", startCap: "arrow", endCap: "arrow"},
    render: (args) => <VerticalLayout {...args} />,
};

export const VerticalBars: Story = {
    args: {orientation: "vertical", startCap: "bar", endCap: "bar"},
    render: (args) => <VerticalLayout {...args} />,
};

export const VerticalRightToLeft: Story = {
    args: {orientation: "vertical", startCap: "arrow", endCap: "bar"},
    render: (args) => (
        <div dir="rtl">
            <VerticalLayout {...args} />
        </div>
    ),
};
