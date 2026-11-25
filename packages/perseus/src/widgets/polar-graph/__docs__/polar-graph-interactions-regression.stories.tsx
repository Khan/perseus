import {
    PolarMath,
    generatePolarGraphAngleGraph,
    generatePolarGraphLimaconGraph,
    generatePolarGraphOptions,
    generatePolarGraphPointGraph,
    generatePolarGraphRoseGraph,
} from "@khanacademy/perseus-core";

import {themeModes} from "../../../../../../.storybook/modes";

import {polarGraphRendererDecorator} from "./polar-graph-renderer-decorator";

import type {PerseusPolarGraphWidgetOptions} from "@khanacademy/perseus-core";
import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta<PerseusPolarGraphWidgetOptions> = {
    title: "Widgets/Polar Graph/Visual Regression Tests/Interactions",
    tags: ["!autodocs", "!manifest"],
    decorators: [polarGraphRendererDecorator],
    parameters: {
        docs: {
            description: {
                component:
                    "Regression tests for the polar graph after keyboard " +
                    "and button interactions, used with Chromatic.",
            },
        },
        chromatic: {disableSnapshot: false, modes: themeModes},
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

type PlayContext = Pick<
    Parameters<NonNullable<Story["play"]>>[0],
    "canvas" | "userEvent"
>;

/** Focuses the handle whose name starts with `name` and presses `keys`. */
async function pressOnHandle(
    {canvas, userEvent}: PlayContext,
    name: RegExp,
    keys: string,
): Promise<void> {
    canvas.getByRole("button", {name}).focus();
    await userEvent.keyboard(keys);
}

export const PointMovedByKeyboard: Story = {
    args: generatePolarGraphOptions({
        graph: generatePolarGraphPointGraph({numPoints: 1}),
    }),
    play: async (ctx) => {
        // Two circles out and three spokes round: the focus ring stays on.
        await pressOnHandle(
            ctx,
            /^Point 1/,
            "{ArrowUp}{ArrowUp}{ArrowLeft}{ArrowLeft}{ArrowLeft}",
        );
    },
};

export const LimaconTurnedAndStretched: Story = {
    args: generatePolarGraphOptions({
        graph: generatePolarGraphLimaconGraph(),
    }),
    play: async (ctx) => {
        await pressOnHandle(
            ctx,
            /^Far tip/,
            "{ArrowUp}{ArrowUp}{ArrowRight}{ArrowRight}",
        );
        await pressOnHandle(ctx, /^Near point/, "{ArrowUp}");
    },
};

export const RoseWithMorePetals: Story = {
    args: generatePolarGraphOptions({
        graph: generatePolarGraphRoseGraph({k: 2, startCoords: [[4, 0]]}),
    }),
    play: async ({canvas, userEvent}) => {
        await userEvent.click(canvas.getByRole("button", {name: "Increase k"}));
        await userEvent.click(canvas.getByRole("button", {name: "Increase k"}));
    },
};

export const AngleOpenedWithMeasure: Story = {
    args: generatePolarGraphOptions({
        angleUnit: "radians",
        angleStepDegrees: 30,
        graph: generatePolarGraphAngleGraph({
            showAngles: true,
            startCoords: [
                PolarMath.fromPolar(3, 0),
                PolarMath.fromPolar(3, 90),
            ],
        }),
    }),
    play: async (ctx) => {
        await pressOnHandle(ctx, /^Terminal side/, "{ArrowLeft}{ArrowLeft}");
    },
};
