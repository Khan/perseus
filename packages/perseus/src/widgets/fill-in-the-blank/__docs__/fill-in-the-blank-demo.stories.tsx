import {generateTestPerseusItem} from "@khanacademy/perseus-core";
import * as React from "react";

import {ServerItemRendererWithDebugUI} from "../../../testing/server-item-renderer-with-debug-ui";
import {basicFillInTheBlankQuestion} from "../fill-in-the-blank.testdata";

import type {PerseusItem} from "@khanacademy/perseus-core";
import type {Meta} from "@storybook/react-vite";

type StoryArgs = {
    // Story Option
    item: PerseusItem;
} & Pick<
    React.ComponentProps<typeof ServerItemRendererWithDebugUI>,
    "reviewMode" | "showSolutions"
>;

export default {
    title: "Widgets/Fill in the Blank/Widget Demo",
    component: ServerItemRendererWithDebugUI,
    tags: ["!autodocs"],
    // TODO(LEMS-4396): clean up feature flag
    globals: {featureFlags: ["dnd-widget-fitb"]},
    parameters: {
        docs: {
            description: {
                component:
                    "A widget that asks learners to drag answer tiles from a choice bank\
                    into blanks in a passage. The render is still a placeholder.",
            },
        },
    },
    args: {
        reviewMode: false,
        showSolutions: "none",
        item: generateTestPerseusItem({
            question: basicFillInTheBlankQuestion,
        }),
    } satisfies StoryArgs,
    argTypes: {
        showSolutions: {
            options: ["none", "all", "selected"],
            control: {
                type: "select",
            },
        },
    },
    render: (args: StoryArgs) => (
        <ServerItemRendererWithDebugUI
            item={{...args.item}}
            reviewMode={args.reviewMode}
            showSolutions={args.showSolutions}
        />
    ),
} satisfies Meta<StoryArgs>;

export const Default = {
    args: {
        item: generateTestPerseusItem({
            question: basicFillInTheBlankQuestion,
        }),
    },
};
