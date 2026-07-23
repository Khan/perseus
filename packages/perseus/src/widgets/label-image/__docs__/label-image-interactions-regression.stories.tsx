import {within} from "storybook/test";

import {themeModes} from "../../../../../../.storybook/modes";

import {
    labelImageRendererDecorator,
    labelImageRendererDecoratorWithDebugUI,
} from "./label-image-renderer-decorator";

import type {PerseusLabelImageWidgetOptions} from "@khanacademy/perseus-core";
import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta<PerseusLabelImageWidgetOptions> = {
    title: "Widgets/Label Image/Visual Regression Tests/Interactions",
    tags: ["!autodocs", "!manifest"],
    parameters: {
        chromatic: {disableSnapshot: false, modes: themeModes},
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

/***********************************************************************
 *  Helper args
 ***********************************************************************/

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

// Shared args for the multiple-answer stories: a single marker whose dropdown
// is a multi-select (checkboxes) rather than a single-select.
const multipleAnswerArgs: Partial<PerseusLabelImageWidgetOptions> = {
    imageUrl:
        "web+graphie://ka-perseus-graphie.s3.amazonaws.com/56c60c72e96cd353e4a8b5434506cd3a21e717af",
    imageWidth: 415,
    imageHeight: 314,
    imageAlt: "A bar graph with four unlabeled bar lines.",
    choices: ["Trucks", "Vans", "Cars", "SUVs"],
    markers: [
        {
            answers: ["Trucks", "Vans"],
            label: "The fourth unlabeled bar line.",
            x: 25,
            y: 17.7,
        },
    ],
    multipleAnswers: true,
    hideChoicesFromInstructions: true,
};

// Long lorem ipsum choices for the layout stress tests, in two variants.
//
// When a choice is rendered inline (the open answer list and the selected
// answer pill), the Perseus Renderer puts each comma-separated clause and a
// trailing period in its own block-level element. So a punctuated choice wraps
// onto multiple lines, while an unpunctuated one renders as a single wrapped
// line. The two variants below isolate those cases into separate stories.
//
// Broken out into named constants so each `choices` array and the marker
// `answers` share the exact same strings (answers are matched to choices by
// string equality).
const longChoicesNoPunctuation = {
    a: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore",
    b: "Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo",
    c: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur",
    d: "Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est",
    e: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium",
    f: "Totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta",
    g: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed quia consequuntur magni",
    h: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet consectetur adipisci velit sed quia non",
    i: "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur",
};

const longChoicesWithPunctuation = {
    a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
    b: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    c: "Duis aute irure dolor in reprehenderit, in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    d: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id laborum.",
    e: "Sed ut perspiciatis unde omnis iste natus error, sit voluptatem accusantium doloremque laudantium.",
    f: "Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt.",
    g: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur, aut odit aut fugit, sed quia consequuntur magni.",
    h: "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.",
    i: "Quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse quam nihil molestiae consequatur.",
};

// Builds the shared args for a long-choice variant: nine long choices shown in
// the instructions, with four markers whose answers reference specific choices.
const makeLongChoicesArgs = (
    choices: typeof longChoicesNoPunctuation,
): Partial<PerseusLabelImageWidgetOptions> => ({
    imageUrl:
        "web+graphie://ka-perseus-graphie.s3.amazonaws.com/56c60c72e96cd353e4a8b5434506cd3a21e717af",
    imageWidth: 415,
    imageHeight: 314,
    imageAlt: "A bar graph with four unlabeled bar lines.",
    choices: Object.values(choices),
    markers: [
        {
            answers: [choices.d],
            label: "The fourth unlabeled bar line.",
            x: 25,
            y: 17.7,
        },
        {
            answers: [choices.a],
            label: "The third unlabeled bar line.",
            x: 25,
            y: 35.3,
        },
        {
            answers: [choices.e],
            label: "The second unlabeled bar line.",
            x: 25,
            y: 53,
        },
        {
            answers: [choices.i],
            label: "The first unlabeled bar line.",
            x: 25,
            y: 70.3,
        },
    ],
    multipleAnswers: false,
    hideChoicesFromInstructions: false,
});

const longChoicesNoPunctuationArgs = makeLongChoicesArgs(
    longChoicesNoPunctuation,
);
const longChoicesWithPunctuationArgs = makeLongChoicesArgs(
    longChoicesWithPunctuation,
);

/***********************************************************************
 *  Focus state stories
 ***********************************************************************/

// Verifies the keyboard focus state on an unanswered marker
export const FocusUnansweredMarker: Story = {
    name: "[Focus] Unanswered Marker",
    decorators: [labelImageRendererDecorator],
    args: barGraphArgs,
    play: async ({canvasElement, userEvent}) => {
        const canvas = within(canvasElement);
        const opener = canvas
            .getByLabelText("The fourth unlabeled bar line.")
            .closest("button");

        opener?.focus();
        await userEvent.keyboard(" "); // Space opens (marks interacted, stops pulsing).
        await userEvent.keyboard("{Escape}"); // Escape closes it, keeping focus.
    },
};

// Verifies the keyboard focus state on a selected marker, with another
// selected marker nearby.
export const FocusSelectedMarker: Story = {
    name: "[Focus] Selected marker",
    decorators: [labelImageRendererDecorator],
    args: barGraphArgs,
    play: async ({canvasElement, userEvent}) => {
        const canvas = within(canvasElement);
        const body = within(document.body);

        // Answer the fourth marker first, then the third, so focus ends on the
        // third marker's combobox.
        await userEvent.click(
            canvas.getByLabelText("The fourth unlabeled bar line."),
        );
        await userEvent.click(body.getByRole("option", {name: "SUVs"}));
        await userEvent.click(
            canvas.getByLabelText("The third unlabeled bar line."),
        );
        await userEvent.click(body.getByRole("option", {name: "Trucks"}));

        // Shift+Tab moves keyboard focus from the third marker back to the
        // neighboring fourth (selected) marker, so its focus outline renders via
        // :focus-visible. Both markers show their selected pills.
        await userEvent.tab({shift: true});
    },
};

/***********************************************************************
 *  Open state stories
 ***********************************************************************/

// Verifies the marker open/selected state: clicking a marker button opens the
// answer choices dropdown and shows the active marker styling.
export const OpenDefault: Story = {
    name: "[Open] Default",
    decorators: [labelImageRendererDecorator],
    args: barGraphArgs,
    play: async ({canvasElement, userEvent}) => {
        const canvas = within(canvasElement);
        const marker = canvas.getByLabelText("The fourth unlabeled bar line.");
        await userEvent.click(marker);
    },
};

export const OpenMathChoices: Story = {
    name: "[Open] Math Choices",
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
    },
    play: async ({canvasElement, userEvent}) => {
        const canvas = within(canvasElement);
        const marker = canvas.getByLabelText("The fourth unlabeled bar line.");
        await userEvent.click(marker);
    },
};

// Stress-tests the open options list with many long, unpunctuated choices.
export const OpenLongChoices: Story = {
    name: "[Open] Long Choices",
    decorators: [labelImageRendererDecorator],
    args: longChoicesNoPunctuationArgs,
    play: async ({canvasElement, userEvent}) => {
        const canvas = within(canvasElement);
        const marker = canvas.getByLabelText("The fourth unlabeled bar line.");
        await userEvent.click(marker);
    },
};

// Stress-tests the open options list with many long, punctuated choices.
export const OpenLongChoicesWithPunctuation: Story = {
    name: "[Open] Long Choices with Punctuation",
    decorators: [labelImageRendererDecorator],
    args: longChoicesWithPunctuationArgs,
    play: async ({canvasElement, userEvent}) => {
        const canvas = within(canvasElement);
        const marker = canvas.getByLabelText("The fourth unlabeled bar line.");
        await userEvent.click(marker);
    },
};

// Shows multi-select dropdown.
export const OpenMultipleAnswers: Story = {
    name: "[Open] Multiple Answers",
    decorators: [labelImageRendererDecorator],
    args: multipleAnswerArgs,
    play: async ({canvasElement, userEvent}) => {
        const canvas = within(canvasElement);
        await userEvent.click(
            canvas.getByLabelText("The fourth unlabeled bar line."),
        );
    },
};

/***********************************************************************
 *  Selected state stories
 ***********************************************************************/

export const SelectedDefault: Story = {
    name: "[Selected] Default",
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

// Stress-tests the selected pill with a long, unpunctuated choice.
export const SelectedLongChoices: Story = {
    name: "[Selected] Long Choices",
    decorators: [labelImageRendererDecorator],
    args: longChoicesNoPunctuationArgs,
    play: async ({canvasElement, userEvent}) => {
        const canvas = within(canvasElement);
        const marker = canvas.getByLabelText("The fourth unlabeled bar line.");
        await userEvent.click(marker);

        // WonderBlocks SingleSelect renders options into a React portal outside
        // the canvas, so we scope to document.body. A partial regex match on the
        // leading (punctuation-free) fragment finds the option in both variants.
        const choice = within(document.body).getByRole("option", {
            name: /Ut enim/,
        });
        await userEvent.click(choice);
    },
};

// Stress-tests the selected pill with a long, punctuated choice.
export const SelectedLongChoicesWithPunctuation: Story = {
    name: "[Selected] Long Choices with Punctuation",
    decorators: [labelImageRendererDecorator],
    args: longChoicesWithPunctuationArgs,
    play: async ({canvasElement, userEvent}) => {
        const canvas = within(canvasElement);
        const marker = canvas.getByLabelText("The fourth unlabeled bar line.");
        await userEvent.click(marker);

        // WonderBlocks SingleSelect renders options into a React portal outside
        // the canvas, so we scope to document.body. A partial regex match on the
        // leading (punctuation-free) fragment finds the option in both variants.
        const choice = within(document.body).getByRole("option", {
            name: /Ut enim/,
        });
        await userEvent.click(choice);
    },
};

// Verifies the zoomed image shows in front of the widget and its markers.
export const SelectedImageZoomed: Story = {
    name: "[Selected] Image Zoomed",
    decorators: [labelImageRendererDecorator],
    args: barGraphArgs,
    play: async ({canvasElement, userEvent}) => {
        const canvas = within(canvasElement);
        const body = within(document.body);

        await userEvent.click(
            canvas.getByLabelText("The fourth unlabeled bar line."),
        );
        await userEvent.click(body.getByRole("option", {name: "SUVs"}));

        // The zoom overlay is a Clickable layered over the image.
        await userEvent.click(
            canvas.getByRole("button", {name: "Make image bigger."}),
        );
    },
};

// Verifies the selected (closed) pill with mixed content (TeX and regular text).
export const SelectedMixedContent: Story = {
    name: "[Selected] Mixed text and TeX",
    decorators: [labelImageRendererDecorator],
    args: {
        imageUrl:
            "web+graphie://ka-perseus-graphie.s3.amazonaws.com/56c60c72e96cd353e4a8b5434506cd3a21e717af",
        imageWidth: 415,
        imageHeight: 314,
        imageAlt: "A bar graph with four unlabeled bar lines.",
        choices: [
            "$\\dfrac{1}{2}$ of the total",
            "$x^2$ square units",
            "about 3 whole apples",
            "$\\sqrt{9}$ or more",
        ],
        markers: [
            {
                answers: ["$x^2$ square units"],
                label: "The fourth unlabeled bar line.",
                x: 25,
                y: 17.7,
            },
        ],
        multipleAnswers: false,
        hideChoicesFromInstructions: true,
    },
    play: async ({canvasElement, userEvent}) => {
        const canvas = within(canvasElement);
        const marker = canvas.getByLabelText("The fourth unlabeled bar line.");
        await userEvent.click(marker);

        // Match on the plain-text fragment; the TeX portion contributes
        // hard-to-predict text to the option's accessible name.
        const choice = within(document.body).getByRole("option", {
            name: /square units/,
        });
        await userEvent.click(choice);
    },
};

// Verifies the marker's pill collapses to the "2 answers" count when the list
// is closed.
export const SelectedMultipleAnswers: Story = {
    name: "[Selected] Multiple Answers",
    decorators: [labelImageRendererDecorator],
    args: multipleAnswerArgs,
    play: async ({canvasElement, userEvent}) => {
        const canvas = within(canvasElement);
        const body = within(document.body);

        await userEvent.click(
            canvas.getByLabelText("The fourth unlabeled bar line."),
        );
        await userEvent.click(body.getByRole("option", {name: "Trucks"}));
        await userEvent.click(body.getByRole("option", {name: "Vans"}));
        await userEvent.keyboard("{Escape}");
    },
};

/***********************************************************************
 *  Miscellaneous stories
 ***********************************************************************/

// Verifies the correct answer state: after selecting the right answer and
// clicking Check, the marker and answer pill render in green (success.strong).
export const CorrectAnswerGraded: Story = {
    // Need debug UI to see the grading state.
    decorators: [labelImageRendererDecoratorWithDebugUI],
    args: {
        imageUrl:
            "web+graphie://ka-perseus-graphie.s3.amazonaws.com/56c60c72e96cd353e4a8b5434506cd3a21e717af",
        imageWidth: 415,
        imageHeight: 314,
        imageAlt: "A bar graph with four unlabeled bar lines.",
        choices: ["Trucks", "Vans", "Cars", "SUVs"],
        // Uses a single marker to avoid needing to fill all markers before checking.
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

        const checkButton = canvas.getByRole("button", {name: "Check answer"});
        await userEvent.click(checkButton);
    },
};

// Verifies the hide-answers toggle: after selecting answers on two markers, we
// flip the "Hide answer choices" switch on. The answer pills should disappear
// while the markers themselves stay visible.
export const HideAnswersToggleFlipped: Story = {
    decorators: [labelImageRendererDecorator],
    args: barGraphArgs,
    play: async ({canvasElement, userEvent}) => {
        const canvas = within(canvasElement);
        const body = within(document.body);

        // Select an answer on two markers so two pills are shown.
        await userEvent.click(
            canvas.getByLabelText("The fourth unlabeled bar line."),
        );
        await userEvent.click(body.getByRole("option", {name: "SUVs"}));
        await userEvent.click(
            canvas.getByLabelText("The third unlabeled bar line."),
        );
        await userEvent.click(body.getByRole("option", {name: "Trucks"}));

        // Flip the toggle on; the pills should disappear.
        await userEvent.click(canvas.getByRole("switch"));
    },
};
