import {generateTestPerseusItem} from "@khanacademy/perseus-core";
import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import * as React from "react";

import {ApiOptions} from "../../../perseus-api";
import {ServerItemRendererWithDebugUI} from "../../../testing/server-item-renderer-with-debug-ui";
import {
    selectableLockedFiguresQuestion,
    selectableLockedPolygonQuestion,
    selectableLockedTriangleQuestion,
    spotlightableLockedTriangleQuestion,
    spotlightablePolygonQuestion,
} from "../interactive-graph.testdata";

import type {Meta, StoryObj} from "@storybook/react-vite";

const defaultApiOptions = ApiOptions.defaults;

const meta: Meta = {
    title: "Widgets/Interactive Graph/Deixis",
    component: ServerItemRendererWithDebugUI,
    tags: ["!autodocs"],
    parameters: {
        options: {showPanel: false},
    },
};
export default meta;

type Story = StoryObj<typeof ServerItemRendererWithDebugUI>;

export const SelectableLockedFigures: Story = {
    args: {
        item: generateTestPerseusItem({
            question: selectableLockedFiguresQuestion,
        }),
        apiOptions: defaultApiOptions,
    },
};

export const SelectableLockedTriangle: Story = {
    args: {
        item: generateTestPerseusItem({
            question: selectableLockedTriangleQuestion,
        }),
        apiOptions: defaultApiOptions,
    },
};

export const SelectableLockedPolygon: Story = {
    args: {
        item: generateTestPerseusItem({
            question: selectableLockedPolygonQuestion,
        }),
        apiOptions: defaultApiOptions,
    },
};

export const SpotlightedLockedFigure: Story = {
    render: function Render() {
        const [spotlightedLockedFigureIndex, setSpotlightedLockedFigureIndex] =
            React.useState<number | null>(2);

        const choices: ReadonlyArray<{label: string; index: number | null}> = [
            {label: "Spotlight: none", index: null},
            {label: "Point 0 — green (selectable)", index: 0},
            {label: "Point 2 — gray (not selectable)", index: 2},
            {label: "Segment 4 — purple (selectable)", index: 4},
            {label: "Segment 5 — gray (not selectable)", index: 5},
        ];

        return (
            <View>
                <View
                    style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        gap: 8,
                        marginBottom: 16,
                    }}
                >
                    {choices.map(({label, index}) => (
                        <Button
                            key={label}
                            kind={
                                spotlightedLockedFigureIndex === index
                                    ? "primary"
                                    : "secondary"
                            }
                            size="small"
                            onClick={() =>
                                setSpotlightedLockedFigureIndex(index)
                            }
                        >
                            {label}
                        </Button>
                    ))}
                </View>
                <ServerItemRendererWithDebugUI
                    item={generateTestPerseusItem({
                        question: selectableLockedFiguresQuestion,
                    })}
                    apiOptions={{
                        ...defaultApiOptions,
                        spotlightedLockedFigureIndex,
                    }}
                />
            </View>
        );
    },
};

export const SpotlightedTriangle: Story = {
    render: function Render() {
        const [spotlightedLockedFigureIndex, setSpotlightedLockedFigureIndex] =
            React.useState<number | null>(0);

        const choices: ReadonlyArray<{label: string; index: number | null}> = [
            {label: "Spotlight: none", index: null},
            {label: "Side 1 (bottom)", index: 0},
            {label: "Side 2 (right)", index: 1},
            {label: "Side 3 (left)", index: 2},
            {label: "Vertex (bottom-left)", index: 3},
            {label: "Vertex (bottom-right)", index: 4},
            {label: "Vertex (top)", index: 5},
        ];

        return (
            <View>
                <View
                    style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        gap: 8,
                        marginBottom: 16,
                    }}
                >
                    {choices.map(({label, index}) => (
                        <Button
                            key={label}
                            kind={
                                spotlightedLockedFigureIndex === index
                                    ? "primary"
                                    : "secondary"
                            }
                            size="small"
                            onClick={() =>
                                setSpotlightedLockedFigureIndex(index)
                            }
                        >
                            {label}
                        </Button>
                    ))}
                </View>
                <ServerItemRendererWithDebugUI
                    item={generateTestPerseusItem({
                        question: spotlightableLockedTriangleQuestion,
                    })}
                    apiOptions={{
                        ...defaultApiOptions,
                        spotlightedLockedFigureIndex,
                    }}
                />
            </View>
        );
    },
};

export const SpotlightedPolygon: Story = {
    render: function Render() {
        const [spotlightedLockedFigureIndex, setSpotlightedLockedFigureIndex] =
            React.useState<number | null>(0);

        const choices: ReadonlyArray<{label: string; index: number | null}> = [
            {label: "Spotlight: none", index: null},
            {label: "Spotlight polygon", index: 0},
        ];

        return (
            <View>
                <View
                    style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        gap: 8,
                        marginBottom: 16,
                    }}
                >
                    {choices.map(({label, index}) => (
                        <Button
                            key={label}
                            kind={
                                spotlightedLockedFigureIndex === index
                                    ? "primary"
                                    : "secondary"
                            }
                            size="small"
                            onClick={() =>
                                setSpotlightedLockedFigureIndex(index)
                            }
                        >
                            {label}
                        </Button>
                    ))}
                </View>
                <ServerItemRendererWithDebugUI
                    item={generateTestPerseusItem({
                        question: spotlightablePolygonQuestion,
                    })}
                    apiOptions={{
                        ...defaultApiOptions,
                        spotlightedLockedFigureIndex,
                    }}
                />
            </View>
        );
    },
};
