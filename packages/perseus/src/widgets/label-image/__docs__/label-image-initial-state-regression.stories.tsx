import {themeModes} from "../../../../../../.storybook/modes";
import {getWidget} from "../../../widgets";
import {labelImageRendererDecorator} from "../../__testutils__/label-image-renderer-decorator";

import type {PerseusLabelImageWidgetOptions} from "@khanacademy/perseus-core";
import type {Meta, StoryObj} from "@storybook/react-vite";

const LabelImageWidget = getWidget("label-image")!;

const meta: Meta<typeof LabelImageWidget> = {
    title: "Widgets/Label Image/Visual Regression Tests/Initial State",
    component: LabelImageWidget,
    tags: ["!autodocs", "!manifest"],
    parameters: {
        docs: {
            description: {
                component:
                    "Regression tests for the Label Image widget that do NOT " +
                    "need any interactions to test.",
            },
        },
        chromatic: {disableSnapshot: false, modes: themeModes},
    },
};
export default meta;

type Story = StoryObj<typeof LabelImageWidget>;

// Verifies the default unanswered state: all markers visible and pulsating,
// no answers selected, text choices hidden from instructions.
export const DefaultUnanswered: Story = {
    decorators: [labelImageRendererDecorator],
    args: {
        imageUrl:
            "web+graphie://ka-perseus-graphie.s3.amazonaws.com/56c60c72e96cd353e4a8b5434506cd3a21e717af",
        imageWidth: 415,
        imageHeight: 314,
        imageAlt: "A bar graph with four unlabeled bar lines.",
        choices: ["Trucks", "Vans", "Cars", "SUVs"],
        markers: [
            {
                answers: ["SUVs"],
                label: "The fourth unlabeled bar line.",
                x: 25,
                y: 17.7,
            },
            {
                answers: ["Trucks"],
                label: "The third unlabeled bar line.",
                x: 25,
                y: 35.3,
            },
            {
                answers: ["Cars"],
                label: "The second unlabeled bar line.",
                x: 25,
                y: 53,
            },
            {
                answers: ["Vans"],
                label: "The first unlabeled bar line.",
                x: 25,
                y: 70.3,
            },
        ],
        multipleAnswers: false,
        hideChoicesFromInstructions: true,
    } satisfies Partial<PerseusLabelImageWidgetOptions>,
};

// Verifies choices shown in the instructions section (hideChoicesFromInstructions: false),
// including TeX fraction choices and the semanticColor.core.border.neutral.default separator dots
// that appear between each choice.
export const WithChoicesInInstructions: Story = {
    decorators: [labelImageRendererDecorator],
    args: {
        imageUrl:
            "web+graphie://ka-perseus-graphie.s3.amazonaws.com/05faa925d02e5effd3069bf24da4777e3ae1a28b",
        imageWidth: 360,
        imageHeight: 160,
        imageAlt:
            "A number line from negative 6 halves to negative 3 halves with three labeled points.",
        choices: ["$-\\dfrac{7}{3}$", "$-2\\dfrac{5}{8}$", "$-2.9$"],
        markers: [
            {answers: ["$-2.9$"], label: "Point a", x: 14.25, y: 50},
            {answers: ["$-2\\dfrac{5}{8}$"], label: "Point b", x: 29.5, y: 50},
            {answers: ["$-\\dfrac{7}{3}$"], label: "Point c", x: 45.5, y: 50},
        ],
        multipleAnswers: false,
        hideChoicesFromInstructions: false,
    } satisfies Partial<PerseusLabelImageWidgetOptions>,
};

// Verifies the incorrect marker state: marker dot renders with neutral
// background (semanticColor.core.border.neutral.default) when showCorrectness
// is "incorrect". No answer pill is shown because no answer is selected in
// this static state.
// Note: showCorrectness is runtime UI state injected by the renderer, not part
// of PerseusLabelImageMarker schema, so the marker requires a type cast.
export const IncorrectMarker: Story = {
    decorators: [labelImageRendererDecorator],
    args: {
        imageUrl:
            "web+graphie://ka-perseus-graphie.s3.amazonaws.com/56c60c72e96cd353e4a8b5434506cd3a21e717af",
        imageWidth: 415,
        imageHeight: 314,
        imageAlt: "A bar graph with four unlabeled bar lines.",
        choices: ["Trucks", "Vans", "Cars", "SUVs"],
        markers: [
            // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-restricted-syntax
            {
                answers: ["SUVs"],
                label: "The fourth unlabeled bar line.",
                x: 25,
                y: 17.7,
                showCorrectness: "incorrect",
            } as any,
        ],
        multipleAnswers: false,
        hideChoicesFromInstructions: true,
    } satisfies Partial<PerseusLabelImageWidgetOptions>,
};
