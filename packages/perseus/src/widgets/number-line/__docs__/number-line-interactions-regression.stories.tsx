import {expect, fireEvent} from "storybook/test";

import {themeModes} from "../../../../../../.storybook/modes";

import {numberLineRendererDecorator} from "./number-line-renderer-decorator";
import {waitForNumberLine} from "./number-line-story-helpers";

import type {
    PerseusNumberLineWidgetOptions,
    UserInputMap,
} from "@khanacademy/perseus-core";
import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta<PerseusNumberLineWidgetOptions> = {
    title: "Widgets/Number Line/Visual Regression Tests/Interactions",
    tags: ["!autodocs", "!manifest"],
    parameters: {
        docs: {
            description: {
                component:
                    "Regression tests for the Number Line widget that require an " +
                    "interaction (hover, click, type, drag, or focus) to reach " +
                    "the tested visual state.",
            },
        },
        // The movable point animates to its highlight style over 50ms; the delay
        // lets that animation (and any post-interaction redraw) settle before
        // the snapshot.
        chromatic: {disableSnapshot: false, modes: themeModes, delay: 300},
    },
};
export default meta;

type Story = StoryObj<typeof meta>;

// Shared configuration for the inequality stories: a range that crosses zero
// with one tick per unit so the ray direction reads clearly.
const inequalityArgs = {
    isInequality: true,
    range: [-5, 5],
    divisionRange: [1, 12],
    snapDivisions: 1,
    tickStep: 1,
} satisfies Partial<PerseusNumberLineWidgetOptions>;

// getStartUserInput always initializes an inequality's relation to "ge", so a
// story starting from any other relation must seed the whole userInput map
// itself (initialUserInput fully replaces the computed start input).
const inequalityInput = (rel: "ge" | "gt" | "le" | "lt"): UserInputMap => ({
    "number-line 1": {rel, numDivisions: 10, numLinePosition: 0},
});

// The vmouseover handler is bound to the movable point's inner Raphael
// <ellipse>, not the data-attribute wrapper, so hover that node directly.
const hoverPoint: Story["play"] = async ({canvasElement, userEvent}) => {
    await waitForNumberLine(canvasElement);
    const point = canvasElement.querySelector(
        '[data-interactive-kind-for-testing="movable-point"] ellipse',
    );
    if (point == null) {
        throw new Error("movable point has not rendered yet");
    }
    await userEvent.hover(point);
};

// Verifies the highlighted (hovered) state of the interactive closed point.
export const PointHovered: Story = {
    decorators: [numberLineRendererDecorator],
    args: {
        range: [0, 10],
        numDivisions: 5,
    } satisfies Partial<PerseusNumberLineWidgetOptions>,
    play: hoverPoint,
};

// Verifies the highlighted (hovered) state of the open (strict inequality) dot:
// the hollow dot keeps its background fill while the highlight stroke renders.
export const OpenDotHovered: Story = {
    decorators: [numberLineRendererDecorator],
    args: inequalityArgs,
    parameters: {
        initialUserInput: inequalityInput("gt"),
    },
    play: hoverPoint,
};

// Verifies that clicking "Switch direction" flips the ray from right to left.
export const SwitchDirectionButtonClicked: Story = {
    decorators: [numberLineRendererDecorator],
    args: inequalityArgs,
    parameters: {
        initialUserInput: inequalityInput("ge"),
    },
    play: async ({canvas, canvasElement, userEvent}) => {
        await waitForNumberLine(canvasElement);
        await userEvent.click(
            canvas.getByRole("button", {name: "Switch direction"}),
        );
        await waitForNumberLine(canvasElement);
    },
};

// Clicking "Make circle open" switches the closed dot to an open one, and the
// button label itself flips to "Make circle filled".
export const MakeCircleOpen: Story = {
    decorators: [numberLineRendererDecorator],
    args: inequalityArgs,
    parameters: {
        initialUserInput: inequalityInput("ge"),
    },
    play: async ({canvas, canvasElement, userEvent}) => {
        await waitForNumberLine(canvasElement);
        await userEvent.click(
            canvas.getByRole("button", {name: "Make circle open"}),
        );
        // The label flips once the relation toggles to the open (strict) form.
        await expect(
            canvas.findByRole("button", {name: "Make circle filled"}),
        ).resolves.toBeInTheDocument();
        await waitForNumberLine(canvasElement);
    },
};

// Verifies that changing the number of divisions in the tick controller
// redraws the tick marks.
export const TickDivisionsChanged: Story = {
    decorators: [numberLineRendererDecorator],
    args: {
        range: [0, 10],
        numDivisions: 5,
        isTickCtrl: true,
        divisionRange: [1, 10],
    } satisfies Partial<PerseusNumberLineWidgetOptions>,
    play: async ({canvas, canvasElement, userEvent}) => {
        await waitForNumberLine(canvasElement);
        const input = canvas.getByRole("textbox");
        await userEvent.clear(input);
        await userEvent.type(input, "8");
        await waitForNumberLine(canvasElement);
    },
};

// Verifies the point renders in a new position after being dragged away from
// its default (the left endpoint).
export const PointMoved: Story = {
    decorators: [numberLineRendererDecorator],
    args: {
        range: [0, 10],
        numDivisions: 5,
    } satisfies Partial<PerseusNumberLineWidgetOptions>,
    play: async ({canvasElement}) => {
        await waitForNumberLine(canvasElement);
        const point = canvasElement.querySelector(
            '[data-interactive-kind-for-testing="movable-point"] ellipse',
        );
        if (point == null) {
            throw new Error("movable point has not rendered yet");
        }
        const {x, y, width, height} = point.getBoundingClientRect();
        const startX = x + width / 2;
        const startY = y + height / 2;
        const endX = startX + 200;
        // The legacy movable binds its drag to jQuery-mobile vmouse events,
        // whose handlers read pageX/pageY and live on `document`. Fire native
        // mouse events with those coords set — down on the point (vmouse
        // translates it and it bubbles to document), move/up on document — so
        // the drag actually registers.
        // eslint-disable-next-line testing-library/prefer-user-event
        fireEvent.mouseDown(point, {
            button: 0,
            clientX: startX,
            clientY: startY,
            pageX: startX,
            pageY: startY,
        });
        // eslint-disable-next-line testing-library/prefer-user-event
        fireEvent.mouseMove(document, {
            button: 0,
            clientX: endX,
            clientY: startY,
            pageX: endX,
            pageY: startY,
        });
        // eslint-disable-next-line testing-library/prefer-user-event
        fireEvent.mouseUp(document, {
            button: 0,
            clientX: endX,
            clientY: startY,
            pageX: endX,
            pageY: startY,
        });
        await waitForNumberLine(canvasElement);
    },
};

// Verifies the keyboard focus outline on the "Switch direction" button.
export const SwitchDirectionButtonFocused: Story = {
    decorators: [numberLineRendererDecorator],
    args: inequalityArgs,
    parameters: {
        initialUserInput: inequalityInput("ge"),
    },
    play: async ({canvas, canvasElement}) => {
        await waitForNumberLine(canvasElement);
        canvas.getByRole("button", {name: "Switch direction"}).focus();
    },
};
