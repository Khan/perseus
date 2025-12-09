import {ApiOptions} from "@khanacademy/perseus";
import {
    generateImageOptions,
    generateImageWidget,
    generateTestPerseusRenderer,
    generateRadioWidget,
    generateRadioOptions,
} from "@khanacademy/perseus-core";
import * as React from "react";

import {getFeatureFlags} from "../../../../../testing/feature-flags-util";
import {earthMoonImage} from "../../../../perseus/src/widgets/image/utils";
import EditorPageWithStorybookPreview from "../../__docs__/editor-page-with-storybook-preview";
import {registerAllWidgetsAndEditorsForTesting} from "../../util/register-all-widgets-and-editors-for-testing";
import ImageEditor from "../image-editor/image-editor";

import {PROD_EDITOR_WIDTH} from "./utils";

import type {Meta, StoryObj} from "@storybook/react-vite";

const withinEditorPageDecorator = (_, {args}) => {
    return (
        <div style={{width: PROD_EDITOR_WIDTH}}>
            <EditorPageWithStorybookPreview
                apiOptions={{
                    ...ApiOptions.defaults,
                    flags: getFeatureFlags({
                        "image-widget-upgrade": true,
                    }),
                }}
                question={generateTestPerseusRenderer({
                    content: "[[☃ image 1]]",
                    widgets: {
                        "image 1": generateImageWidget({
                            options: generateImageOptions({
                                ...args,
                            }),
                        }),
                    },
                })}
            />
        </div>
    );
};

// This is to address timing - Perseus widget editor registry accessed before initialization!
registerAllWidgetsAndEditorsForTesting();

const meta: Meta = {
    title: "Widgets/Image/Editor Demo",
    component: ImageEditor,
    argTypes: {
        labels: {
            control: false,
            description: "Deprecated",
        },
        box: {
            control: false,
            description: "Set automatically",
        },
        range: {
            control: false,
            description: "Deprecated",
        },
    },
};
export default meta;

type Story = StoryObj<typeof ImageEditor>;

export const Default: Story = {
    args: {
        backgroundImage: {},
    },
};

/**
 * This Image widget editor does not have any options set.
 */
export const Empty: Story = {
    name: "Empty (Within Editor Page)",
    decorators: [withinEditorPageDecorator],
    args: {
        backgroundImage: {},
    },
};

/**
 * This Image widget editor has all options set.
 */
export const Populated: Story = {
    name: "Populated (Within Editor Page)",
    decorators: [withinEditorPageDecorator],
    args: {
        backgroundImage: earthMoonImage,
        alt: "The moon showing behind the Earth in space.",
        caption: "Captured via XYZ Telescope",
        title: "The Moon",
    },
};

/**
 * Only the markdown image in the main content should be flagged with a linter
 * warning. The Image widget and Radio widget containing a markdown image
 * should not be flagged.
 */
export const WithMarkdownImageLinterWarning: Story = {
    render: function Render() {
        return (
            <div style={{width: PROD_EDITOR_WIDTH}}>
                <EditorPageWithStorybookPreview
                    apiOptions={{
                        ...ApiOptions.defaults,
                        flags: getFeatureFlags({
                            "image-widget-upgrade": true,
                        }),
                    }}
                    question={generateTestPerseusRenderer({
                        // Render Widget, Markdown, Radio
                        content: `Widget\n[[☃ image 1]]\n\nMarkdown\n![Earth and moon](${earthMoonImage.url})\n\nRadio\n[[☃ radio 1]]`,
                        widgets: {
                            "image 1": generateImageWidget({
                                options: generateImageOptions({
                                    backgroundImage: earthMoonImage,
                                    alt: "Earth and moon",
                                }),
                            }),
                            "radio 1": generateRadioWidget({
                                options: generateRadioOptions({
                                    choices: [
                                        {
                                            content: `![Earth and moon](${earthMoonImage.url})`,
                                            id: "radio-choice-test-id-0",
                                        },
                                    ],
                                }),
                            }),
                        },
                    })}
                />
            </div>
        );
    },
};
