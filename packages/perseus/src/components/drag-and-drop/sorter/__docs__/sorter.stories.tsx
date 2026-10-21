import * as React from "react";

import {Sorter} from "../sorter";

import type {TilePlacements} from "../../tile-placements";
import type {SorterProps, SorterTile} from "../sorter";
import type {Meta, StoryObj} from "@storybook/react-vite";

type DemoProps = Omit<SorterProps, "placements" | "onPlacementsChange"> & {
    initialPlacements?: TilePlacements;
    /** Plain question text rendered above the sorter. */
    prompt?: string;
    /** Constrains the demo width, to show the vertical fallback. */
    maxWidth?: number;
};

/** Holds the controlled placements, as the real widget will. */
function SorterDemo(props: DemoProps): React.ReactElement {
    const {initialPlacements, prompt, maxWidth, ...sorterProps} = props;
    const [placements, setPlacements] = React.useState<TilePlacements>(
        initialPlacements ?? {},
    );
    return (
        <div style={maxWidth != null ? {maxWidth} : undefined}>
            {prompt != null && <p>{prompt}</p>}
            <Sorter
                {...sorterProps}
                placements={placements}
                onPlacementsChange={setPlacements}
            />
        </div>
    );
}

/**
 * Demo of the Sorter render component, for design review. Drag tiles
 * into the blanks along the legend, or use each tile's menu. The
 * examples mirror the Figma frames: the Scale variant orders loans
 * between Lowest and Highest, and the Timeline variant orders events
 * between 1944 and 1946. A horizontal sorter falls back to vertical
 * when the row cannot house the widest tile.
 */
const meta: Meta<typeof SorterDemo> = {
    title: "Components/Drag and Drop/Sorter",
    component: SorterDemo,
    tags: ["!manifest"],
    argTypes: {
        orientation: {
            control: "radio",
            options: ["horizontal", "vertical"],
        },
    },
};

export default meta;

type Story = StoryObj<typeof SorterDemo>;

const loanTiles: SorterTile[] = [
    {id: "car", content: "car loan", label: "car loan"},
    {id: "credit", content: "credit card", label: "credit card"},
    {id: "student", content: "student loan", label: "student loan"},
];

const scaleArgs: DemoProps = {
    variant: "scale",
    legend: {
        startLabel: "Lowest",
        endLabel: "Highest",
        srLabel: "Interest rate, from lowest to highest",
        startStyle: "arrow",
        endStyle: "arrow",
    },
    tiles: loanTiles,
    orientation: "horizontal",
    prompt:
        "Using the high rate method, you will arrange debts by the " +
        "interest rate, biggest to smallest. What would that order " +
        "look like?",
};

const scaleAnsweredPlacements: TilePlacements = {
    "blank 1": "student",
    "blank 2": "car",
    "blank 3": "credit",
};

/** The loans scale (Figma "Sorter Horizontal, Top Legend Default"). */
export const ScaleDefault: Story = {
    args: {
        ...scaleArgs,
        legend: {...scaleArgs.legend, position: "start"},
    },
};

/**
 * The loans scale with every blank answered (Figma "Sorter Horizontal
 * Answered", which draws the legend below the row).
 */
export const ScaleAnswered: Story = {
    args: {
        ...scaleArgs,
        initialPlacements: scaleAnsweredPlacements,
    },
};

/** The vertical scale (Figma "Sorter Vertical Default"). */
export const ScaleVertical: Story = {
    args: {
        ...scaleArgs,
        orientation: "vertical",
    },
};

/** Figma "Sorter Vertical Answered". */
export const ScaleVerticalAnswered: Story = {
    args: {
        ...scaleArgs,
        orientation: "vertical",
        initialPlacements: scaleAnsweredPlacements,
    },
};

/**
 * At 320px a horizontal scale cannot house its widest tile, so it
 * falls back to vertical (the narrow "Lowest to highest" frames).
 */
export const ScaleNarrowFallback: Story = {
    args: {
        ...scaleArgs,
        maxWidth: 320,
    },
};

const eventTiles: SorterTile[] = [
    {id: "normandy", content: "Normandy invasion", label: "Normandy invasion"},
    {id: "bulge", content: "Battle of the Bulge", label: "Battle of the Bulge"},
    {
        id: "germany-invaded",
        content: "Invasion of Germany",
        label: "Invasion of Germany",
    },
    {
        id: "germany-surrenders",
        content: "Germany surrenders",
        label: "Germany surrenders",
    },
    {id: "okinawa", content: "Okinawa invaded", label: "Okinawa invaded"},
    {id: "atom", content: "Atom bombs dropped", label: "Atom bombs dropped"},
    {id: "japan", content: "Japan surrenders", label: "Japan surrenders"},
];

const timelineArgs: DemoProps = {
    variant: "timeline",
    legend: {
        startLabel: "1944",
        endLabel: "1946",
        srLabel: "Timeline from 1944 to 1946",
        startStyle: "bar",
        endStyle: "bar",
    },
    tiles: eventTiles,
    orientation: "horizontal",
    prompt:
        "Arrange the chief events of World War II between 1944 and " +
        "1946 on the timeline.",
};

/**
 * Seven events stagger 4 above / 3 below the axis (Figma "Sorter
 * Horizontal, Timeline Default").
 */
export const TimelineDefault: Story = {
    args: timelineArgs,
};

/** Figma "Sorter Horizontal, Timeline Answered". */
export const TimelineAnswered: Story = {
    args: {
        ...timelineArgs,
        tiles: eventTiles.slice(0, 6),
        initialPlacements: {
            "blank 1": "normandy",
            "blank 2": "bulge",
            "blank 3": "germany-invaded",
            "blank 4": "germany-surrenders",
            "blank 5": "okinawa",
            "blank 6": "atom",
        },
    },
};

/** Up to four events sit on one side (Figma "3 items on timeline"). */
export const Timeline3Items: Story = {
    args: {
        ...timelineArgs,
        tiles: eventTiles.slice(0, 3),
    },
};

/** Figma "4 items on timeline". */
export const Timeline4Items: Story = {
    args: {
        ...timelineArgs,
        tiles: eventTiles.slice(0, 4),
    },
};

/** Five events stagger 3 above / 2 below (Figma "5 items on timeline"). */
export const Timeline5Items: Story = {
    args: {
        ...timelineArgs,
        tiles: eventTiles.slice(0, 5),
    },
};

/** Six events stagger 3 above / 3 below (Figma "6 items on timeline"). */
export const Timeline6Items: Story = {
    args: {
        ...timelineArgs,
        tiles: eventTiles.slice(0, 6),
    },
};

/**
 * A one-sided timeline can put the legend before the row (Figma
 * "Sorter Legend Start").
 */
export const TimelineLegendStart: Story = {
    args: {
        ...timelineArgs,
        tiles: eventTiles.slice(0, 4),
        legend: {...timelineArgs.legend, position: "start"},
    },
};

/** Figma "Sorter Legend End". */
export const TimelineLegendEnd: Story = {
    args: {
        ...timelineArgs,
        tiles: eventTiles.slice(0, 4),
        legend: {...timelineArgs.legend, position: "end"},
    },
};

/**
 * At 320px the timeline reflows to a vertical axis with every blank on
 * one side (Figma "Sorter Timeline Vertical Default").
 */
export const TimelineVertical: Story = {
    args: {
        ...timelineArgs,
        maxWidth: 320,
    },
};
