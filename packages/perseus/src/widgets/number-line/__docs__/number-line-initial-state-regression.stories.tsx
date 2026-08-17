import {themeModes} from "../../../../../../.storybook/modes";
import {mobileDecorator} from "../../__testutils__/story-decorators";

import {numberLineRendererDecorator} from "./number-line-renderer-decorator";
import {waitForError, waitForNumberLine} from "./number-line-story-helpers";

import type {
    PerseusNumberLineWidgetOptions,
    UserInputMap,
} from "@khanacademy/perseus-core";
import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta<PerseusNumberLineWidgetOptions> = {
    title: "Widgets/Number Line/Visual Regression Tests/Initial State",
    tags: ["!autodocs", "!manifest"],
    parameters: {
        docs: {
            description: {
                component:
                    "Regression tests for the Number Line widget that do NOT " +
                    "need any interactions to test. Each story's play function " +
                    "only waits for the asynchronous graphie/TeX render to " +
                    "settle before the snapshot is taken.",
            },
        },
        chromatic: {disableSnapshot: false, modes: themeModes},
    },
};
export default meta;

type Story = StoryObj<typeof meta>;

// Wait-only play: every static story shares the same "wait until fully drawn"
// step so Chromatic never snapshots a half-rendered number line.
const waitForRender: Story["play"] = async ({canvasElement}) => {
    await waitForNumberLine(canvasElement);
};

// Shared configuration for the inequality stories: a range that crosses zero
// with one tick per unit so the ray direction and length read clearly.
const inequalityArgs = {
    isInequality: true,
    range: [-5, 5],
    divisionRange: [1, 12],
    snapDivisions: 1,
    tickStep: 1,
} satisfies Partial<PerseusNumberLineWidgetOptions>;

const inequalityInput = (rel: "ge" | "gt" | "le" | "lt"): UserInputMap => ({
    "number-line 1": {rel, numDivisions: 10, numLinePosition: 0},
});

// Shared configuration for the fraction-label stories: 0–2 in half-unit steps
// produces both whole-number and fractional tick values so the difference
// between label styles is visible.
const fractionArgs = {
    range: [0, 2],
    divisionRange: [1, 10],
    numDivisions: 4,
    snapDivisions: 1,
} satisfies Partial<PerseusNumberLineWidgetOptions>;

export const Default: Story = {
    decorators: [numberLineRendererDecorator],
    args: {
        range: [0, 10],
        numDivisions: 5,
        initialX: 3,
    } satisfies Partial<PerseusNumberLineWidgetOptions>,
    play: waitForRender,
};

export const ImproperFractionLabels: Story = {
    decorators: [numberLineRendererDecorator],
    args: {
        ...fractionArgs,
        labelStyle: "improper",
    } satisfies Partial<PerseusNumberLineWidgetOptions>,
    play: waitForRender,
};

export const MixedFractionLabels: Story = {
    decorators: [numberLineRendererDecorator],
    args: {
        ...fractionArgs,
        labelStyle: "mixed",
    } satisfies Partial<PerseusNumberLineWidgetOptions>,
    play: waitForRender,
};

export const NonReducedFractionLabels: Story = {
    decorators: [numberLineRendererDecorator],
    args: {
        ...fractionArgs,
        labelStyle: "non-reduced",
    } satisfies Partial<PerseusNumberLineWidgetOptions>,
    play: waitForRender,
};

// Interior tick labels are hidden; the two highlighted endpoint labels still
// render.
export const TickLabelsHidden: Story = {
    decorators: [numberLineRendererDecorator],
    args: {
        range: [0, 10],
        numDivisions: 5,
        labelTicks: false,
    } satisfies Partial<PerseusNumberLineWidgetOptions>,
    play: waitForRender,
};

// The highlighted endpoint labels (2 and 8) differ from the range endpoints
// (0 and 10).
export const CustomEndLabels: Story = {
    decorators: [numberLineRendererDecorator],
    args: {
        range: [0, 10],
        numDivisions: 5,
        labelRange: [2, 8],
    } satisfies Partial<PerseusNumberLineWidgetOptions>,
    play: waitForRender,
};

export const TickController: Story = {
    decorators: [numberLineRendererDecorator],
    args: {
        range: [0, 10],
        numDivisions: 5,
        isTickCtrl: true,
        divisionRange: [1, 10],
    } satisfies Partial<PerseusNumberLineWidgetOptions>,
    play: waitForRender,
};

// The number of divisions (15) is outside the allowed division range (1–10),
// so the widget shows an error message in place of the line.
export const TickControllerInvalid: Story = {
    decorators: [numberLineRendererDecorator],
    args: {
        range: [0, 10],
        numDivisions: 15,
        isTickCtrl: true,
        divisionRange: [1, 10],
    } satisfies Partial<PerseusNumberLineWidgetOptions>,
    play: async ({canvasElement}) => {
        await waitForError(canvasElement);
    },
};

export const InequalityClosedRight: Story = {
    decorators: [numberLineRendererDecorator],
    args: inequalityArgs,
    parameters: {
        initialUserInput: inequalityInput("ge"),
    },
    play: waitForRender,
};

export const InequalityOpenRight: Story = {
    decorators: [numberLineRendererDecorator],
    args: inequalityArgs,
    parameters: {
        initialUserInput: inequalityInput("gt"),
    },
    play: waitForRender,
};

export const InequalityClosedLeft: Story = {
    decorators: [numberLineRendererDecorator],
    args: inequalityArgs,
    parameters: {
        initialUserInput: inequalityInput("le"),
    },
    play: waitForRender,
};

export const InequalityOpenLeft: Story = {
    decorators: [numberLineRendererDecorator],
    args: inequalityArgs,
    parameters: {
        initialUserInput: inequalityInput("lt"),
    },
    play: waitForRender,
};

export const StaticPoint: Story = {
    decorators: [numberLineRendererDecorator],
    args: {
        range: [0, 10],
        numDivisions: 5,
        correctX: 6,
    } satisfies Partial<PerseusNumberLineWidgetOptions>,
    parameters: {
        static: true,
    },
    play: waitForRender,
};

export const Mobile: Story = {
    decorators: [numberLineRendererDecorator, mobileDecorator],
    args: {
        range: [0, 10],
        numDivisions: 5,
    } satisfies Partial<PerseusNumberLineWidgetOptions>,
    parameters: {
        apiOptions: {isMobile: true},
    },
    play: waitForRender,
};

export const MobileInequalityClosed: Story = {
    decorators: [numberLineRendererDecorator, mobileDecorator],
    args: inequalityArgs,
    parameters: {
        apiOptions: {isMobile: true},
        initialUserInput: inequalityInput("ge"),
    },
    play: waitForRender,
};

export const MobileInequalityOpen: Story = {
    decorators: [numberLineRendererDecorator, mobileDecorator],
    args: inequalityArgs,
    parameters: {
        apiOptions: {isMobile: true},
        initialUserInput: inequalityInput("gt"),
    },
    play: waitForRender,
};
