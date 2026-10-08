import {ApiOptions} from "@khanacademy/perseus";
import {
    generateLabelImageOptions,
    generateLabelImageWidget,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import * as React from "react";

import {earthMoonImage} from "../../../../perseus/src/widgets/image/utils";
import EditorPageWithStorybookPreview from "../../__docs__/editor-page-with-storybook-preview";
import {registerAllWidgetsAndEditorsForTesting} from "../../util/register-all-widgets-and-editors-for-testing";
import {PROD_EDITOR_WIDTH} from "../storybook-constants";

import LabelImageEditor from "./label-image-editor";

import type {Meta, StoryObj} from "@storybook/react-vite";

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

// This is to address timing - Perseus widget editor registry accessed before initialization!
registerAllWidgetsAndEditorsForTesting();

const meta: Meta = {
    title: "Widgets/Label Image/Editor Demo",
    component: LabelImageEditor,
    tags: ["!autodocs"],
} satisfies Meta<typeof LabelImageEditor>;
export default meta;

type Story = StoryObj<typeof meta>;
/**
 * This Label Image widget editor has some populated options.
 */
export const EditorDemo: Story = {
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
