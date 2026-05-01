import {within} from "storybook/test";

import {themeModes} from "../../../../../../.storybook/modes";
import {getWidget} from "../../../widgets";
import {labelImageRendererDecorator} from "../../__testutils__/label-image-renderer-decorator";

import type {PerseusLabelImageWidgetOptions} from "@khanacademy/perseus-core";
import type {Meta} from "@storybook/react-vite";

const LabelImageWidget = getWidget("label-image")!;

const meta: Meta<typeof LabelImageWidget> = {
    title: "Widgets/Label Image/Visual Regression Tests/Interactions",
    component: LabelImageWidget,
    tags: ["!autodocs"],
    parameters: {
        chromatic: {disableSnapshot: false, modes: themeModes},
    },
};

export default meta;

const barGraphArgs = {
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
} satisfies Partial<PerseusLabelImageWidgetOptions>;

// Verifies the marker open/selected state: clicking a marker button opens the
// answer choices dropdown and shows the active marker styling.
export const MarkerOpened = {
    decorators: [labelImageRendererDecorator],
    args: barGraphArgs,
    play: async ({canvasElement, userEvent}) => {
        const canvas = within(canvasElement);
        const marker = canvas.getByLabelText("The fourth unlabeled bar line.");
        await userEvent.click(marker);
    },
};

// Verifies the post-interaction marker state: after selecting an answer and
// closing the dropdown, all markers render as white circles (not the default
// pulsing blue).
export const AnswerSelected = {
    decorators: [labelImageRendererDecorator],
    args: barGraphArgs,
    play: async ({canvasElement, userEvent}) => {
        const canvas = within(canvasElement);
        const marker = canvas.getByLabelText("The fourth unlabeled bar line.");
        await userEvent.click(marker);

        // WonderBlocks SingleSelect renders options into a React portal outside
        // the canvas, so we scope to document.body.
        const suvsChoice = within(document.body).getByRole("option", {
            name: "SUVs",
        });
        await userEvent.click(suvsChoice);
    },
};

// Verifies the correct answer state: after selecting the right answer and
// clicking Check, the marker and answer pill render in green (success.strong).
// Uses a single marker to avoid needing to fill all markers before checking.
// Check is clicked twice due to a server-side scoring quirk in Storybook.
export const CorrectAnswerGraded = {
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
        ],
        multipleAnswers: false,
        hideChoicesFromInstructions: true,
    } satisfies Partial<PerseusLabelImageWidgetOptions>,
    play: async ({canvasElement, userEvent}) => {
        const canvas = within(canvasElement);

        const marker = canvas.getByLabelText("The fourth unlabeled bar line.");
        await userEvent.click(marker);

        // WonderBlocks SingleSelect renders options into a React portal outside
        // the canvas, so we scope to document.body.
        const suvsChoice = within(document.body).getByRole("option", {
            name: "SUVs",
        });
        await userEvent.click(suvsChoice);

        const checkButton = canvas.getByRole("button", {name: "Check answer"});
        await userEvent.click(checkButton);
        await userEvent.click(checkButton);
    },
};

// Verifies the incorrect answer state: marker dot renders with neutral
// background (semanticColor.core.border.neutral.default) and the answer pill
// shows the wrong selection with the same neutral styling.
// showCorrectness is runtime UI state injected by the renderer, not part of
// PerseusLabelImageMarker schema, so the marker requires a type cast.
// The play function selects an answer so the pill becomes visible.
export const IncorrectAnswerWithPill = {
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
    play: async ({canvasElement, userEvent}) => {
        const canvas = within(canvasElement);

        const marker = canvas.getByLabelText("The fourth unlabeled bar line.");
        await userEvent.click(marker);

        // WonderBlocks SingleSelect renders options into a React portal outside
        // the canvas, so we scope to document.body.
        const trucksChoice = within(document.body).getByRole("option", {
            name: "Trucks",
        });
        await userEvent.click(trucksChoice);
    },
};

// Verifies that math choices render correctly inside an open marker dropdown.
// The math choices are only visible after opening a marker, so we capture
// the open state here.
export const MathChoicesVisible = {
    decorators: [labelImageRendererDecorator],
    args: {
        imageUrl:
            "web+graphie://ka-perseus-graphie.s3.amazonaws.com/56c60c72e96cd353e4a8b5434506cd3a21e717af",
        imageWidth: 415,
        imageHeight: 314,
        imageAlt: "A bar graph with four unlabeled bar lines.",
        choices: [
            "$\\dfrac{1}{2}$",
            "$\\dfrac{3}{4}$",
            "$\\dfrac{5}{6}$",
            "$\\dfrac{7}{8}$",
        ],
        markers: [
            {
                answers: ["$\\dfrac{1}{2}$"],
                label: "The fourth unlabeled bar line.",
                x: 25,
                y: 17.7,
            },
            {
                answers: ["$\\dfrac{3}{4}$"],
                label: "The third unlabeled bar line.",
                x: 25,
                y: 35.3,
            },
            {
                answers: ["$\\dfrac{5}{6}$"],
                label: "The second unlabeled bar line.",
                x: 25,
                y: 53,
            },
            {
                answers: ["$\\dfrac{7}{8}$"],
                label: "The first unlabeled bar line.",
                x: 25,
                y: 70.3,
            },
        ],
        multipleAnswers: false,
        hideChoicesFromInstructions: true,
    } satisfies Partial<PerseusLabelImageWidgetOptions>,
    play: async ({canvasElement, userEvent}) => {
        const canvas = within(canvasElement);
        const marker = canvas.getByLabelText("The fourth unlabeled bar line.");
        await userEvent.click(marker);
    },
};
