import * as React from "react";

import {LegendBar} from "./legend-bar/legend-bar";

import type {Meta, StoryObj} from "@storybook/react-vite";

/**
 * `LegendBar` is the line along the Sorter legend. These stories place it
 * next to stand-in blanks to show how it stretches with them.
 */
const meta: Meta<typeof LegendBar> = {
    title: "Widgets/Sorter/Legend Bar",
    component: LegendBar,
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

export const HorizontalAbove: Story = {
    render: () => (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--wb-sizing-size_240)",
            }}
        >
            <LegendBar orientation="horizontal" />
            <Blanks direction="row" />
        </div>
    ),
};

export const HorizontalBelow: Story = {
    render: () => (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--wb-sizing-size_240)",
            }}
        >
            <Blanks direction="row" />
            <LegendBar orientation="horizontal" />
        </div>
    ),
};

export const Vertical: Story = {
    render: () => (
        <div style={{display: "flex", gap: "var(--wb-sizing-size_240)"}}>
            <LegendBar orientation="vertical" />
            <Blanks direction="column" />
        </div>
    ),
};

export const VerticalRightToLeft: Story = {
    render: () => (
        <div dir="rtl">
            <div style={{display: "flex", gap: "var(--wb-sizing-size_240)"}}>
                <LegendBar orientation="vertical" />
                <Blanks direction="column" />
            </div>
        </div>
    ),
};
