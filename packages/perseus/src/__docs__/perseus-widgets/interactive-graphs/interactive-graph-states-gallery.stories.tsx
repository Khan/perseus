import * as React from "react";
import {View} from "@khanacademy/wonder-blocks-core";
import {StyleSheet} from "aphrodite";
import {generateTestPerseusItem} from "@khanacademy/perseus-core";

import {ServerItemRendererWithDebugUI} from "../../../../../../testing/server-item-renderer-with-debug-ui";
import {ApiOptions} from "../../../perseus-api";

import {
    pointQuestion,
    linearQuestion,
    circleQuestion,
    polygonQuestion,
} from "../../../widgets/interactive-graphs/interactive-graph.testdata";

import type {Meta, StoryObj} from "@storybook/react-vite";
import type {APIOptions} from "../../../types";
import type {PerseusItem} from "@khanacademy/perseus-core";

type StoryArgs = {
    title: string;
    apiOptions: APIOptions;
    item: PerseusItem;
    reviewMode: boolean;
    showSolutions: "none" | "all" | "selected";
    startAnswerless: boolean;
};

const defaultApiOptions = ApiOptions.defaults;

const meta: Meta<StoryArgs> = {
    title: "Perseus/Widgets/Interactive Graph/Widget States Gallery",
    component: ServerItemRendererWithDebugUI,
    tags: ["!autodocs"],
    parameters: {
        chromatic: {disableSnapshot: false},
    },
    argTypes: {
        showSolutions: {
            options: ["none", "all", "selected"],
            control: {
                type: "select",
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

const styles = StyleSheet.create({
    galleryContainer: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
        gap: 20,
        marginBottom: 24,
    },
    stateContainer: {
        border: "1px solid #ddd",
        borderRadius: 8,
        overflow: "hidden",
    },
    stateTitle: {
        padding: "8px 16px",
        backgroundColor: "#f5f5f5",
        borderBottom: "1px solid #ddd",
        fontWeight: "bold",
        fontSize: "16px",
    },
    stateContent: {
        padding: "16px",
        minHeight: "200px",
    },
});

// Create a reusable state display component
const StateDisplay = ({
    title,
    item,
    apiOptions = defaultApiOptions,
    reviewMode = false,
    showSolutions = "none",
    startAnswerless = false,
}) => (
    <View style={styles.stateContainer}>
        <div className={styles.stateTitle}>{title}</div>
        <div className={styles.stateContent}>
            <ServerItemRendererWithDebugUI
                item={item}
                apiOptions={apiOptions}
                reviewMode={reviewMode}
                showSolutions={showSolutions}
                startAnswerless={startAnswerless}
            />
        </div>
    </View>
);

/**
 * This story shows different states of point plotting graph
 */
export const PointGraphStates: Story = {
    render: () => (
        <View>
            <h2>Point Graph States</h2>
            <View style={styles.galleryContainer}>
                <StateDisplay
                    title="Default"
                    item={generateTestPerseusItem({question: pointQuestion})}
                />
                <StateDisplay
                    title="Read Only"
                    item={generateTestPerseusItem({question: pointQuestion})}
                    apiOptions={{...defaultApiOptions, readOnly: true}}
                />
                <StateDisplay
                    title="Review Mode"
                    item={generateTestPerseusItem({question: pointQuestion})}
                    reviewMode={true}
                />
                <StateDisplay
                    title="Show Solutions"
                    item={generateTestPerseusItem({question: pointQuestion})}
                    showSolutions="all"
                />
            </View>
        </View>
    ),
};

/**
 * This story shows different states of linear graph
 */
export const LinearGraphStates: Story = {
    render: () => (
        <View>
            <h2>Linear Graph States</h2>
            <View style={styles.galleryContainer}>
                <StateDisplay
                    title="Default"
                    item={generateTestPerseusItem({question: linearQuestion})}
                />
                <StateDisplay
                    title="Read Only"
                    item={generateTestPerseusItem({question: linearQuestion})}
                    apiOptions={{...defaultApiOptions, readOnly: true}}
                />
                <StateDisplay
                    title="Review Mode"
                    item={generateTestPerseusItem({question: linearQuestion})}
                    reviewMode={true}
                />
                <StateDisplay
                    title="Show Solutions"
                    item={generateTestPerseusItem({question: linearQuestion})}
                    showSolutions="all"
                />
            </View>
        </View>
    ),
};

/**
 * This story shows different states of polygon graph
 */
export const PolygonGraphStates: Story = {
    render: () => (
        <View>
            <h2>Polygon Graph States</h2>
            <View style={styles.galleryContainer}>
                <StateDisplay
                    title="Default"
                    item={generateTestPerseusItem({question: polygonQuestion})}
                />
                <StateDisplay
                    title="Read Only"
                    item={generateTestPerseusItem({question: polygonQuestion})}
                    apiOptions={{...defaultApiOptions, readOnly: true}}
                />
                <StateDisplay
                    title="Review Mode"
                    item={generateTestPerseusItem({question: polygonQuestion})}
                    reviewMode={true}
                />
                <StateDisplay
                    title="Show Solutions"
                    item={generateTestPerseusItem({question: polygonQuestion})}
                    showSolutions="all"
                />
            </View>
        </View>
    ),
};

/**
 * This story shows different states of circle graph
 */
export const CircleGraphStates: Story = {
    render: () => (
        <View>
            <h2>Circle Graph States</h2>
            <View style={styles.galleryContainer}>
                <StateDisplay
                    title="Default"
                    item={generateTestPerseusItem({question: circleQuestion})}
                />
                <StateDisplay
                    title="Read Only"
                    item={generateTestPerseusItem({question: circleQuestion})}
                    apiOptions={{...defaultApiOptions, readOnly: true}}
                />
                <StateDisplay
                    title="Review Mode"
                    item={generateTestPerseusItem({question: circleQuestion})}
                    reviewMode={true}
                />
                <StateDisplay
                    title="Show Solutions"
                    item={generateTestPerseusItem({question: circleQuestion})}
                    showSolutions="all"
                />
            </View>
        </View>
    ),
};

/**
 * This story shows different graph types in different mobile states
 */
export const MobileGraphStates: Story = {
    render: () => (
        <View>
            <h2>Mobile Graph States</h2>
            <View style={styles.galleryContainer}>
                <StateDisplay
                    title="Point (Mobile)"
                    item={generateTestPerseusItem({question: pointQuestion})}
                    apiOptions={{...defaultApiOptions, isMobile: true}}
                />
                <StateDisplay
                    title="Linear (Mobile)"
                    item={generateTestPerseusItem({question: linearQuestion})}
                    apiOptions={{...defaultApiOptions, isMobile: true}}
                />
                <StateDisplay
                    title="Polygon (Mobile)"
                    item={generateTestPerseusItem({question: polygonQuestion})}
                    apiOptions={{...defaultApiOptions, isMobile: true}}
                />
                <StateDisplay
                    title="Circle (Mobile)"
                    item={generateTestPerseusItem({question: circleQuestion})}
                    apiOptions={{...defaultApiOptions, isMobile: true}}
                />
            </View>
        </View>
    ),
};
