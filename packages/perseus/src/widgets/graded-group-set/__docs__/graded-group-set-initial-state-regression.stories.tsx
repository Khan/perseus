import type {Meta, StoryObj} from "@storybook/react-vite";

import {themeModes} from "../../../../../../.storybook/modes";
import {ArticleRendererWithDebugUI} from "../../../testing/article-renderer-with-debug-ui";
import {groupSetDuplicateTitlesQuestion} from "../graded-group-set.testdata";

/**
 * This is a visual regression story for the Graded Group Set widget.
 */

const meta: Meta = {
    title: "Widgets/Graded Group Set/Visual Regression Tests/Initial State",
    component: ArticleRendererWithDebugUI,
    tags: ["!dev"],
    parameters: {
        docs: {
            description: {
                component:
                    "Regression tests for the Graded Group Set widget that do NOT " +
                    "need any interactions to test, which will be used with " +
                    "Chromatic. Stories are all displayed on one page.",
            },
        },
        chromatic: {disableSnapshot: false, modes: themeModes},
    },
};
export default meta;

type Story = StoryObj<typeof ArticleRendererWithDebugUI>;

export const GroupSetDuplicateTitlesQuestion: Story = {
    args: {
        json: groupSetDuplicateTitlesQuestion,
    },
};
