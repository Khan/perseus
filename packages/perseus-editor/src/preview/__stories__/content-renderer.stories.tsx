import {View} from "@khanacademy/wonder-blocks-core";
import Switch from "@khanacademy/wonder-blocks-switch";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {LabelMedium} from "@khanacademy/wonder-blocks-typography";
import {useState} from "react";

import {articleWithImages} from "../../../../perseus/src/__testdata__/article-renderer.testdata";
import {question} from "../../../../perseus/src/widgets/__testdata__/radio.testdata";
import DeviceFramer from "../../components/device-framer";
import ViewportResizer from "../../components/viewport-resizer";
import ContentRenderer from "../content-renderer";

import type {DeviceType} from "@khanacademy/perseus";
import type {Meta, StoryObj} from "@storybook/react";

import "../../styles/perseus-editor.less";

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
    title: "PerseusEditor/Preview/Content Renderer",
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

export const WithLintErrors: Story = {
    args: {
        linterContext: {
            contentType: "exercise",
            highlightLint: true,
            stack: [],
            paths: [],
        },
        question: {
            content: `# H1s bad

Here is some unclosed math: $1+1=3

We should use \`\\dfrac{}\` instead of \`\\frac{}\`: $\\frac{3}{5}$

What is the best color in the world?

[[☃ radio 1]]`,
            widgets: {
                "radio 1": {
                    type: "radio",
                    options: {
                        choices: [
                            {content: "Red"},
                            {content: "# Green"},
                            {content: "Blue", correct: true},
                            {
                                content: "None of these!",
                                isNoneOfTheAbove: true,
                            },
                        ],
                    },
                },
            },
            images: {},
        },
    },
};
