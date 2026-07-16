import {themeModes} from "../../../../../../.storybook/modes";
import {
    mobileDecorator,
    reducedMotionDecorator,
    rtlDecorator,
} from "../../__testutils__/story-decorators";

import {labelImageRendererDecorator} from "./label-image-renderer-decorator";

import type {PerseusLabelImageWidgetOptions} from "@khanacademy/perseus-core";
import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta<PerseusLabelImageWidgetOptions> = {
    title: "Widgets/Label Image/Visual Regression Tests/Initial State",
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

type Story = StoryObj<typeof meta>;

const barGraphArgs: PerseusLabelImageWidgetOptions = {
    static: false,
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
};

// Verifies the default unanswered state: all markers visible and pulsating,
// no answers selected, text choices hidden from instructions.
export const DefaultUnanswered: Story = {
    decorators: [labelImageRendererDecorator],
    args: barGraphArgs,
};

// Verifies the "select all that apply" instruction variant.
// Markers can carry more than one correct answer.
export const MultipleAnswers: Story = {
    decorators: [labelImageRendererDecorator],
    args: {...barGraphArgs, multipleAnswers: true},
};

export const RightToLeft: Story = {
    decorators: [labelImageRendererDecorator, rtlDecorator],
    args: {
        imageUrl:
            "web+graphie://ka-perseus-graphie.s3.amazonaws.com/56c60c72e96cd353e4a8b5434506cd3a21e717af",
        imageWidth: 415,
        imageHeight: 314,
        imageAlt: "A bar graph with four unlabeled bar lines.",
        choices: [
            "الشاحنات",
            "الحافلات الصغيرة",
            "السيارات",
            "سيارات الدفع الرباعي",
        ],
        markers: [
            {
                answers: ["سيارات الدفع الرباعي"],
                label: "الخط الرابع غير المعنون.",
                x: 25,
                y: 17.7,
            },
            {
                answers: ["الشاحنات"],
                label: "الخط الثالث غير المعنون.",
                x: 25,
                y: 35.3,
            },
            {
                answers: ["السيارات"],
                label: "الخط الثاني غير المعنون.",
                x: 25,
                y: 53,
            },
            {
                answers: ["الحافلات الصغيرة"],
                label: "الخط الأول غير المعنون.",
                x: 25,
                y: 70.3,
            },
        ],
        multipleAnswers: false,
        hideChoicesFromInstructions: false,
    },
};

// Verifies the reduced-motion rendering of the markers. The markers use the
// finite "pulsate once" animation and settle rather than pulsating infinitely.
export const ReducedMotionMarkers: Story = {
    decorators: [labelImageRendererDecorator, reducedMotionDecorator],
    args: barGraphArgs,
    // Only take the snapshot after the singular pulse animation has finished.
    play: async ({canvasElement}) => {
        const finiteAnimations = canvasElement
            .getAnimations({subtree: true})
            .filter(
                (animation) =>
                    animation.effect?.getTiming().iterations !== Infinity,
            );
        await Promise.all(
            finiteAnimations.map((animation) => animation.finished),
        );
    },
};

// Verifies the mobile instruction text. On mobile, the caption reads
// `strings.tapSingle` ("Tap each dot ...") instead of the desktop "Click ..."
export const MobileInstructions: Story = {
    decorators: [labelImageRendererDecorator, mobileDecorator],
    parameters: {
        apiOptions: {isMobile: true},
    },
    args: barGraphArgs,
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
    },
};
