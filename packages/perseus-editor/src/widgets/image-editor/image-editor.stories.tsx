import {ApiOptions} from "@khanacademy/perseus";
import {
    generateImageOptions,
    generateImageWidget,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import * as React from "react";

import {earthMoonImage} from "../../../../perseus/src/widgets/image/utils";
import EditorPageWithStorybookPreview from "../../__docs__/editor-page-with-storybook-preview";
import {PROD_EDITOR_WIDTH} from "../storybook-constants";

import ImageEditor from "./image-editor";

import type {Meta, StoryObj} from "@storybook/react-vite";

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
    tags: ["!autodocs"],
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

/**
 * This Image widget editor has all options set.
 */
export const Default: Story = {
    decorators: [withinEditorPageDecorator],
    args: {
        backgroundImage: earthMoonImage,
        alt: "The moon showing behind the Earth in space.",
        caption: "Captured via XYZ Telescope",
        title: "The Moon",
    },
};

/**
 * This Image widget editor has an image with missing size.
 */
export const WithEmptySize: Story = {
    decorators: [withinEditorPageDecorator],
    args: {
        backgroundImage: {url: earthMoonImage.url},
        caption:
            "The Moon above Earth's horizon, captured by the International Space Station, [NASA](https://images.nasa.gov/details/iss071e515452)",
    },
};
