import {generateTestPerseusItem} from "@khanacademy/perseus-core";
import {within} from "storybook/test";

import {themeModes} from "../../../../../../.storybook/modes";
import {ServerItemRendererWithDebugUI} from "../../../testing/server-item-renderer-with-debug-ui";
import {
    incorrectAnswerQuestion,
    mathQuestion,
    shortTextQuestion,
    textQuestion,
} from "../__tests__/label-image.testdata";

import type {Meta} from "@storybook/react-vite";

const meta: Meta = {
    title: "Widgets/Label Image/Visual Regression Tests/Interactions",
    component: ServerItemRendererWithDebugUI,
    tags: ["!autodocs"],
    parameters: {
        chromatic: {disableSnapshot: false, modes: themeModes},
    },
};

export default meta;

// Verifies the marker open/selected state: clicking a marker button opens the
// answer choices dropdown and shows the active marker styling.
export const MarkerOpened = {
    args: {
        item: generateTestPerseusItem({question: textQuestion}),
    },
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
    args: {
        item: generateTestPerseusItem({question: textQuestion}),
    },
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
// Uses shortTextQuestion (single marker) to avoid needing to fill all markers.
// Check is clicked twice due to a server-side scoring quirk in Storybook.
export const CorrectAnswerGraded = {
    args: {
        item: generateTestPerseusItem({question: shortTextQuestion}),
    },
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

        // eslint-disable-next-line testing-library/prefer-screen-queries
        const checkButton = canvas.getByRole("button", {name: "Check answer"});
        await userEvent.click(checkButton);
        await userEvent.click(checkButton);
    },
};

// Verifies the incorrect answer state: marker dot renders with neutral
// background (background.neutral.default) and the answer pill shows the wrong
// selection with the same neutral styling. Uses incorrectAnswerQuestion, which
// has showCorrectness "incorrect" pre-set on the marker in the question data,
// matching how this state is passed in from review/show-solutions contexts.
// The play function selects an answer so the pill becomes visible.
export const IncorrectAnswerWithPill = {
    args: {
        item: generateTestPerseusItem({question: incorrectAnswerQuestion}),
    },
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
    args: {
        item: generateTestPerseusItem({question: mathQuestion}),
    },
    play: async ({canvasElement, userEvent}) => {
        const canvas = within(canvasElement);
        const marker = canvas.getByLabelText("The fourth unlabeled bar line.");
        await userEvent.click(marker);
    },
};
