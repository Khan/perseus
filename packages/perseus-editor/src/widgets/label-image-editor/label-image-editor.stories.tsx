import {ApiOptions} from "@khanacademy/perseus";
import {
    generateLabelImageOptions,
    generateLabelImageWidget,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import * as React from "react";
import {action} from "storybook/actions";

import {earthMoonImage} from "../../../../perseus/src/widgets/image/utils";
import EditorPageWithStorybookPreview from "../../__docs__/editor-page-with-storybook-preview";
import {registerWidgetEditorDecorator} from "../../__docs__/register-widget-editor-decorator";
import {PROD_EDITOR_WIDTH} from "../storybook-constants";

import type {Meta, StoryObj} from "@storybook/react-vite";

import LabelImageEditor, {labelImageEditorRegistration} from "./index";

const withinEditorPageDecorator = (_, {args, parameters}) => {
    return (
        <div style={{width: PROD_EDITOR_WIDTH}}>
            <EditorPageWithStorybookPreview
                apiOptions={parameters?.apiOptions ?? ApiOptions.defaults}
                question={generateTestPerseusRenderer({
                    content: "[[☃ label-image 1]]",
                    widgets: {
                        "label-image 1": generateLabelImageWidget({
                            options: generateLabelImageOptions({
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
    title: "Widgets/Label Image/Editor Demo",
    component: LabelImageEditor,
    decorators: [registerWidgetEditorDecorator([labelImageEditorRegistration])],
} satisfies Meta<typeof LabelImageEditor>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
    args: {
        onChange: action("onChange"),
        imageAlt: "Map of Europe",
        choices: [
            "Lamborghini",
            "BMW",
            "Volkswagen",
            "Fiat",
            "Porsche",
            "Ferrari",
        ],
        imageUrl:
            "https://ka-perseus-images.s3.amazonaws.com/2ee5fc32e35c5178373b39fd304b325b2994c913.png",
        imageWidth: 1280,
        imageHeight: 1024,
        markers: [
            {
                answers: ["BMW", "Volkswagen", "Porsche"],
                label: "Germany",
                x: 37.3,
                y: 53.6,
            },
            {
                answers: [],
                label: "",
                x: 21,
                y: 46,
            },
            {
                answers: ["Lamborghini", "Fiat", "Ferrari"],
                label: "Italy",
                x: 41.4,
                y: 78.8,
            },
        ],
    },
};

/**
 * This Label Image widget editor does not have any options set.
 */
export const Empty: Story = {
    name: "Empty (Within Editor Page)",
    decorators: [withinEditorPageDecorator],
    args: {},
};

/**
 * This Label Image widget editor has some populated options.
 */
export const Populated: Story = {
    name: "Populated (Within Editor Page)",
    decorators: [withinEditorPageDecorator],
    args: {
        choices: ["Earth", "Moon"],
        imageUrl: earthMoonImage.url,
        imageAlt: "Earth and Moon",
        imageHeight: earthMoonImage.height,
        imageWidth: earthMoonImage.width,
        markers: [
            {
                answers: ["Earth"],
                label: "Large blue planet",
                x: 90,
                y: 50,
            },
            {
                answers: ["Moon"],
                label: "Small gray satellite",
                x: 30,
                y: 30,
            },
        ],
        hideChoicesFromInstructions: true,
        multipleAnswers: false,
    },
};
