import * as React from "react";

import {LegendBar} from "./legend-bar/legend-bar";
import {LegendLabel} from "./legend-label/legend-label";

import type {PerseusSorterLegendBarCap} from "./legend-bar/legend-bar";
import type {Meta, StoryObj} from "@storybook/react-vite";

type LegendStoryArgs = {
    startLabel: string;
    endLabel: string;
    startCap: PerseusSorterLegendBarCap;
    endCap: PerseusSorterLegendBarCap;
    screenReaderLabel: string;
};

/**
 * The Sorter legend: `LegendBar` and two `LegendLabel`s, arranged next to
 * stand-in blanks the way the Sorter will.
 */
const meta: Meta<LegendStoryArgs> = {
    title: "Widgets/Sorter/Legend",
    // Matches the answer area width in Figma, so both ends of the bar
    // stay in view.
    decorators: [
        (Story) => (
            <div style={{maxInlineSize: 672}}>
                <Story />
            </div>
        ),
    ],
    args: {
        startLabel: "Lowest",
        endLabel: "Highest",
        startCap: "arrow",
        endCap: "arrow",
        screenReaderLabel: "Interest rates, from lowest to highest",
    },
};

export default meta;

type Story = StoryObj<LegendStoryArgs>;

// Stand-ins for the drag-and-drop blanks, which need a dnd provider.
// Todo(anakaren): Remove once new Sorter is available
const blankStyle: React.CSSProperties = {
    flex: "1 1 0",
    minBlockSize: 48,
    border: "var(--wb-border-width-thin) dashed var(--wb-semanticColor-core-border-neutral-default)",
    borderRadius: "var(--wb-border-radius-radius_040)",
};

function Blanks(props: {direction: "row" | "column"; ariaLabel: string}) {
    return (
        <ol
            aria-label={props.ariaLabel}
            style={{
                display: "flex",
                flexDirection: props.direction,
                flexGrow: 1,
                gap: "var(--wb-sizing-size_160)",
                margin: 0,
                padding: 0,
                listStyle: "none",
            }}
        >
            <li style={blankStyle} />
            <li style={blankStyle} />
            <li style={blankStyle} />
        </ol>
    );
}

// Each label takes at most half the width, so long labels wrap instead
// of running into each other.
function HorizontalLabels(props: LegendStoryArgs) {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "var(--wb-sizing-size_160)",
            }}
        >
            <div style={{maxInlineSize: "50%"}}>
                <LegendLabel content={props.startLabel} />
            </div>
            <div style={{maxInlineSize: "50%", textAlign: "end"}}>
                <LegendLabel content={props.endLabel} />
            </div>
        </div>
    );
}

function HorizontalLegend(
    props: LegendStoryArgs & {position: "above" | "below"},
) {
    const legend = (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--wb-sizing-size_160)",
            }}
        >
            {props.position === "above" && <HorizontalLabels {...props} />}
            <LegendBar
                orientation="horizontal"
                startCap={props.startCap}
                endCap={props.endCap}
            />
            {props.position === "below" && <HorizontalLabels {...props} />}
        </div>
    );

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--wb-sizing-size_240)",
            }}
        >
            {props.position === "above" && legend}
            <Blanks direction="row" ariaLabel={props.screenReaderLabel} />
            {props.position === "below" && legend}
        </div>
    );
}

// The padding leaves room for the vertical arrows, which extend past the
// line on both sides.
function VerticalLegend(props: LegendStoryArgs) {
    return (
        <div
            style={{
                display: "flex",
                gap: "var(--wb-sizing-size_240)",
                paddingInlineStart: "var(--wb-sizing-size_160)",
            }}
        >
            <LegendBar
                orientation="vertical"
                startCap={props.startCap}
                endCap={props.endCap}
            />
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1,
                    gap: "var(--wb-sizing-size_160)",
                }}
            >
                <LegendLabel content={props.startLabel} />
                <Blanks
                    direction="column"
                    ariaLabel={props.screenReaderLabel}
                />
                <LegendLabel content={props.endLabel} />
            </div>
        </div>
    );
}

const timelineArgs: Partial<LegendStoryArgs> = {
    startLabel: "1944",
    endLabel: "1946",
    startCap: "bar",
    endCap: "bar",
    screenReaderLabel: "Events of World War II, from 1944 to 1946",
};

export const ScaleBelow: Story = {
    render: (args) => <HorizontalLegend {...args} position="below" />,
};

export const ScaleAbove: Story = {
    render: (args) => <HorizontalLegend {...args} position="above" />,
};

export const Timeline: Story = {
    args: timelineArgs,
    render: (args) => <HorizontalLegend {...args} position="below" />,
};

export const MixedCaps: Story = {
    args: {startCap: "arrow", endCap: "bar"},
    render: (args) => <HorizontalLegend {...args} position="below" />,
};

export const NoCaps: Story = {
    args: {startCap: "none", endCap: "none"},
    render: (args) => <HorizontalLegend {...args} position="below" />,
};

export const LongLabels: Story = {
    args: {
        startLabel: "Least amount of interest paid over the life of the loan",
        endLabel: "Most amount of interest paid over the life of the loan",
    },
    render: (args) => <HorizontalLegend {...args} position="below" />,
};

export const HorizontalRightToLeft: Story = {
    args: {startCap: "arrow", endCap: "bar"},
    render: (args) => (
        <div dir="rtl">
            <HorizontalLegend {...args} position="below" />
        </div>
    ),
};

export const Vertical: Story = {
    render: (args) => <VerticalLegend {...args} />,
};

export const VerticalTimeline: Story = {
    args: timelineArgs,
    render: (args) => <VerticalLegend {...args} />,
};

export const VerticalRightToLeft: Story = {
    args: {startCap: "arrow", endCap: "bar"},
    render: (args) => (
        <div dir="rtl">
            <VerticalLegend {...args} />
        </div>
    ),
};
