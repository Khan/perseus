import {themeModes} from "../../../../../../.storybook/modes";
import {
    articleDecorator,
    mobileArticleDecorator,
} from "../../__testutils__/story-decorators";

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
// the real renderer path in an article context. The two-group set shows both pip
// treatments at rest: the current pip as a solid dot and the other as a hollow
// ring.
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
