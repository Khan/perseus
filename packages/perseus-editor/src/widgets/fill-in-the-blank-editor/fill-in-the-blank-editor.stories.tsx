import {ApiOptions} from "@khanacademy/perseus";
import {
    generateBlankWidget,
    generateFillInTheBlankOptions,
    generateFillInTheBlankTile,
    generateFillInTheBlankWidget,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import * as React from "react";

import EditorPageWithStorybookPreview from "../../__docs__/editor-page-with-storybook-preview";
import {getFeatureFlags} from "../../testing/feature-flags-util";

import FillInTheBlankEditor from "./fill-in-the-blank-editor";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Widgets/Fill in the Blank/Editor Demo",
    component: FillInTheBlankEditor,
    tags: ["!autodocs"],
} satisfies Meta<typeof FillInTheBlankEditor>;
export default meta;

// The editor and the widget both render nothing without their flag.
const apiOptions = {
    ...ApiOptions.defaults,
    flags: getFeatureFlags({"dnd-widget-fitb": true}),
};

const question = generateTestPerseusRenderer({
    content: "[[☃ fill-in-the-blank 1]]",
    widgets: {
        "fill-in-the-blank 1": generateFillInTheBlankWidget({
            options: generateFillInTheBlankOptions({
                content:
                    "The [[☃ blank 1]] is a drum played with your " +
                    "[[☃ blank 2]].",
                widgets: {
                    "blank 1": generateBlankWidget({
                        options: {displayType: "normal", correctId: "tile-1"},
                    }),
                    "blank 2": generateBlankWidget({
                        options: {displayType: "normal", correctId: "tile-2"},
                    }),
                },
                tiles: [
                    generateFillInTheBlankTile({
                        id: "tile-1",
                        content: "djembe",
                        label: "djembe",
                        maxUses: 1,
                    }),
                    generateFillInTheBlankTile({
                        id: "tile-2",
                        content: "hands",
                        label: "hands",
                        maxUses: "unlimited",
                    }),
                    generateFillInTheBlankTile({
                        id: "tile-3",
                        content: "feet",
                        label: "feet",
                        maxUses: 2,
                    }),
                ],
            }),
        }),
    },
});

type Story = StoryObj<typeof EditorPageWithStorybookPreview>;

export const EditorDemo: Story = {
    render: (): React.ReactElement => (
        <EditorPageWithStorybookPreview
            apiOptions={apiOptions}
            question={question}
        />
    ),
};
