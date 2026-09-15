import {ApiOptions} from "@khanacademy/perseus";
import {
    generateImageOptions,
    generateImageWidget,
    generateTestPerseusRenderer,
    generateRadioWidget,
    generateRadioOptions,
    generateRadioChoice,
} from "@khanacademy/perseus-core";
import * as React from "react";

import {
    earthMoonImage,
    graphieImage,
} from "../../../../perseus/src/widgets/image/utils";
import EditorPageWithStorybookPreview from "../../__docs__/editor-page-with-storybook-preview";
import {registerWidgetEditorDecorator} from "../../__docs__/register-widget-editor-decorator";
import {radioEditorRegistration} from "../radio-editor";
import {PROD_EDITOR_WIDTH} from "../storybook-constants";

import type {Meta, StoryObj} from "@storybook/react-vite";

import ImageEditor, {imageEditorRegistration} from "./index";

const withinEditorPageDecorator = (_, {args, parameters}) => {
    return (
        <div style={{width: PROD_EDITOR_WIDTH}}>
            <EditorPageWithStorybookPreview
                apiOptions={parameters?.apiOptions ?? ApiOptions.defaults}
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

const meta: Meta = {
    title: "Widgets/Image/Editor Demo",
    component: ImageEditor,
    decorators: [
        registerWidgetEditorDecorator([
            imageEditorRegistration,
            radioEditorRegistration,
        ]),
    ],
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
 * This Image widget editor has a graphie image.
 */
export const GraphieImage: Story = {
    name: "Graphie Image (Within Editor Page)",
    decorators: [withinEditorPageDecorator],
    args: {
        backgroundImage: graphieImage,
    },
};

/**
 * This Image widget editor has an image with missing size.
 */
export const ImageWithEmptySize: Story = {
    name: "Image With Empty Size (Within Editor Page)",
    decorators: [withinEditorPageDecorator],
    args: {
        backgroundImage: {url: earthMoonImage.url},
        caption:
            "The Moon above Earth's horizon, captured by the International Space Station, [NASA](https://images.nasa.gov/details/iss071e515452)",
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
                    apiOptions={ApiOptions.defaults}
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
                                        generateRadioChoice(
                                            `![Earth and moon](${earthMoonImage.url})`,
                                        ),
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
