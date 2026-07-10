import {
    generateGradedGroupOptions,
    generateGradedGroupSetWidget,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import * as React from "react";

import {themeModes} from "../../../../../../.storybook/modes";
import {ArticleRendererWithDebugUI} from "../../../testing/article-renderer-with-debug-ui";
import {Indicators} from "../graded-group-set";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Widgets/Graded Group Set/Visual Regression Tests/Initial State",
    tags: ["!autodocs", "!manifest"],
    parameters: {
        docs: {
            description: {
                component:
                    "Regression tests for the Graded Group Set widget that do NOT " +
                    "need any interactions to test.",
            },
        },
        chromatic: {disableSnapshot: false, modes: themeModes},
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

// This story exists to snapshot the graded-group-set chrome — the title and
// the indicator pips — through the real container/renderer path. The group
// content is plain text (no child widget) so the snapshot isn't coupled to any
// other widget's visuals. The pips themselves are also covered in isolation by
// the IndicatorPips story below.
const twoGroupArticle = generateTestPerseusRenderer({
    content: "[[☃ graded-group-set 1]]",
    widgets: {
        "graded-group-set 1": generateGradedGroupSetWidget({
            options: {
                gradedGroups: [
                    generateGradedGroupOptions({
                        title: "Problem 1a",
                        content: "The first problem in the set.",
                    }),
                    generateGradedGroupOptions({
                        title: "Problem 1b",
                        content: "The second problem in the set.",
                    }),
                ],
            },
        }),
    },
});

export const DefaultArticle: Story = {
    render: () => <ArticleRendererWithDebugUI json={twoGroupArticle} />,
};

export const MobileUnanswered: Story = {
    render: () => (
        <ArticleRendererWithDebugUI
            json={twoGroupArticle}
            apiOptions={{isMobile: true}}
        />
    ),
};

// Indicators only reads each group's `title`, so a few generated groups are all
// it needs — no ArticleRenderer or child widget required to visualize the pips.
const makeGroups = (count: number) =>
    Array.from({length: count}, (_, i) =>
        generateGradedGroupOptions({title: `Problem ${i + 1}`}),
    );

// The indicator pips rendered on their own. The active (current) pip is a solid
// dot and the rest are hollow rings; placing the current pip in the middle
// shows both treatments in one snapshot.
export const IndicatorPips: Story = {
    render: () => (
        <Indicators
            currentGroup={2}
            gradedGroups={makeGroups(5)}
            onChangeCurrentGroup={() => {}}
        />
    ),
};
