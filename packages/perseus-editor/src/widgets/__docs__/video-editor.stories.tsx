import {generateTestPerseusRenderer} from "@khanacademy/perseus-core";
import * as React from "react";
import {action} from "storybook/actions";

import EditorPageWithStorybookPreview from "../../__docs__/editor-page-with-storybook-preview";
import {registerAllWidgetsAndEditorsForTesting} from "../../util/register-all-widgets-and-editors-for-testing";
import VideoEditor from "../video-editor/video-editor";

import {PROD_EDITOR_WIDTH} from "./utils";
import type {Meta, StoryObj} from "@storybook/react-vite";

// This is to address timing - Perseus widget editor registry accessed before initialization!
registerAllWidgetsAndEditorsForTesting();

const meta: Meta = {
    title: "Widgets/Video/Editor Demo",
    component: VideoEditor,
    tags: ["!autodocs"],
} satisfies Meta<typeof VideoEditor>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
    args: {
        onChange: action("onChange"),
        apiOptions: Object.freeze({}),
        static: false,
    },
};

export const InitialStateWithinEditor = (): React.ReactElement => (
    <div style={{width: PROD_EDITOR_WIDTH}}>
        <EditorPageWithStorybookPreview
            question={generateTestPerseusRenderer({
                content: "[[☃ video 1]]",
                widgets: {
                    "video 1": {
                        type: "video",
                        options: {
                            location: "",
                        },
                    },
                },
            })}
        />
    </div>
);

export const SlugWithinEditor = (): React.ReactElement => (
    <div style={{width: PROD_EDITOR_WIDTH}}>
        <EditorPageWithStorybookPreview
            question={generateTestPerseusRenderer({
                content: "[[☃ video 1]]",
                widgets: {
                    "video 1": {
                        type: "video",
                        options: {
                            location:
                                "applying-for-financial-aid-when-facing-immigration-challenges",
                        },
                    },
                },
            })}
        />
    </div>
);

export const URLWithinEditor = (): React.ReactElement => (
    <div style={{width: PROD_EDITOR_WIDTH}}>
        <EditorPageWithStorybookPreview
            question={generateTestPerseusRenderer({
                content: "[[☃ video 1]]",
                widgets: {
                    "video 1": {
                        type: "video",
                        options: {
                            location:
                                "https://youtube.com/embed/5GaB5q_u6I0?rel=0",
                        },
                    },
                },
            })}
        />
    </div>
);
