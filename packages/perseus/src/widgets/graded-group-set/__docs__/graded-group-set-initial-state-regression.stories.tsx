import {generateGradedGroupOptions} from "@khanacademy/perseus-core";
import * as React from "react";

import {themeModes} from "../../../../../../.storybook/modes";
import {
    articleDecorator,
    mobileArticleDecorator,
} from "../../__testutils__/story-decorators";
import {Indicators} from "../graded-group-set";

import {
    gradedGroupSetRendererDecorator,
    twoGroupArgs,
} from "./graded-group-set-renderer-decorator";

import type {PerseusGradedGroupSetWidgetOptions} from "@khanacademy/perseus-core";
import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta<PerseusGradedGroupSetWidgetOptions> = {
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

// Snapshots the graded-group-set chrome — the title and indicator pips — through
// the real renderer path in an article context. The pips are also covered in
// isolation by the IndicatorPips story below.
export const DefaultArticle: Story = {
    decorators: [gradedGroupSetRendererDecorator, articleDecorator],
    args: twoGroupArgs,
};

export const DefaultMobile: Story = {
    decorators: [gradedGroupSetRendererDecorator, mobileArticleDecorator],
    args: twoGroupArgs,
    parameters: {
        apiOptions: {isMobile: true},
    },
};

// Indicators only reads each group's `title`, so a few generated groups are all
// it needs — no renderer or child widget required to visualize the pips.
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
