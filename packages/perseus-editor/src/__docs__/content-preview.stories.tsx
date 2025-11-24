import {
    PerseusI18nContextProvider,
    type DeviceType,
} from "@khanacademy/perseus";
import {View} from "@khanacademy/wonder-blocks-core";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import * as React from "react";

import {mockStrings} from "../../../perseus/src/strings";
import {articleWithImages} from "../__testdata__/article-renderer.testdata";
import {
    singleSelectQuestion,
    withLintErrors,
} from "../__testdata__/radio.testdata";
import DeviceFramer from "../components/device-framer";
import ViewportResizer from "../components/viewport-resizer";
import ContentPreview from "../content-preview";

import type {Meta, StoryObj} from "@storybook/react-vite";

import "../styles/perseus-editor.css";

const PreviewWrapper = (props) => {
    const [previewDevice, setPreviewDevice] =
        React.useState<DeviceType>("phone");

    return (
        <View>
            <ViewportResizer
                deviceType={previewDevice}
                onViewportSizeChanged={setPreviewDevice}
            />
            <DeviceFramer nochrome={false} deviceType={previewDevice}>
                <ContentPreview {...props} />
            </DeviceFramer>
        </View>
    );
};

const meta: Meta<typeof ContentPreview> = {
    title: "Editors/Content Preview",
    component: ContentPreview,
    decorators: [
        (Story) => (
            <View style={{margin: spacing.xxSmall_6}}>
                <PerseusI18nContextProvider strings={mockStrings} locale="en">
                    <Story />
                </PerseusI18nContextProvider>
            </View>
        ),
    ],
    render: (props) => <PreviewWrapper {...props} />,
};

export default meta;
type Story = StoryObj<typeof ContentPreview>;

export const Exercise: Story = {
    args: {
        question: singleSelectQuestion,
    },
};

export const Article: Story = {
    args: {
        question: articleWithImages,
    },
};

export const WithLintErrors: Story = {
    args: {
        linterContext: {
            contentType: "exercise",
            highlightLint: true,
            stack: [],
            paths: [],
        },
        question: withLintErrors,
    },
};
