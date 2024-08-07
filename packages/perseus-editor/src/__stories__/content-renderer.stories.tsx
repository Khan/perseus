import {View} from "@khanacademy/wonder-blocks-core";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {useState} from "react";

import {articleWithImages} from "../../../perseus/src/__testdata__/article-renderer.testdata";
import {question} from "../../../perseus/src/widgets/__testdata__/radio.testdata";
import DeviceFramer from "../components/device-framer";
import ViewportResizer from "../components/viewport-resizer";
import ContentRenderer from "../content-renderer";

import type {DeviceType} from "@khanacademy/perseus";
import type {Meta, StoryObj} from "@storybook/react";

import "../styles/perseus-editor.less";

const PreviewWrapper = (props) => {
    const [previewDevice, setPreviewDevice] = useState<DeviceType>("phone");

    return (
        <View>
            <ViewportResizer
                deviceType={previewDevice}
                onViewportSizeChanged={setPreviewDevice}
            />
            <DeviceFramer nochrome={false} deviceType={previewDevice}>
                <ContentRenderer
                    apiOptions={{
                        isMobile: previewDevice === "desktop" ? false : true,
                    }}
                    {...props}
                />
            </DeviceFramer>
        </View>
    );
};

const meta: Meta<typeof ContentRenderer> = {
    title: "PerseusEditor/Content Renderer",
    component: ContentRenderer,
    decorators: [
        (Story) => (
            <View style={{margin: spacing.xxSmall_6}}>
                <Story />
            </View>
        ),
    ],
    render: (props) => <PreviewWrapper {...props} />,
};

export default meta;
type Story = StoryObj<typeof ContentRenderer>;

export const Exercise: Story = {
    args: {
        question,
    },
};

export const Article: Story = {
    args: {
        question: articleWithImages,
    },
};
