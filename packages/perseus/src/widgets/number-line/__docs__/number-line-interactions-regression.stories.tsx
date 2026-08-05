import {userEvent, waitFor} from "storybook/test";

import {themeModes} from "../../../../../../.storybook/modes";

import {numberLineRendererDecorator} from "./number-line-renderer-decorator";

import type {PerseusNumberLineWidgetOptions} from "@khanacademy/perseus-core";
import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta<PerseusNumberLineWidgetOptions> = {
    title: "Widgets/Number Line/Visual Regression Tests/Interactions",
    tags: ["!autodocs", "!manifest"],
    parameters: {
        docs: {
            description: {
                component:
                    "Regression tests for the Number Line widget that require an " +
                    "interaction (hover) to reach the tested visual state.",
            },
        },
        // delay: the movable point animates to its highlight style over 50ms,
        // and Graphie builds its Raphael layers asynchronously — wait for both
        // to settle before snapshotting.
        chromatic: {disableSnapshot: false, modes: themeModes, delay: 300},
    },
};
export default meta;

type Story = StoryObj<typeof meta>;

// Hover the legacy graphie movable point by targeting its inner Raphael
// <ellipse> (the vmouseover handler is bound to that node, not the wrapper).
// waitFor because Graphie builds its Raphael layers asynchronously.
const hoverPoint = async ({canvasElement}: {canvasElement: HTMLElement}) => {
    const point = await waitFor(() => {
        const el = canvasElement.querySelector(
            '[data-interactive-kind-for-testing="movable-point"] ellipse',
        );
        if (el == null) {
            throw new Error("movable point has not rendered yet");
        }
        return el;
    });
    await userEvent.hover(point);
};

// Verifies the highlighted (hovered) state of the interactive closed point:
// the point animates to its highlight fill/stroke in instructive color.
export const PointHovered: Story = {
    decorators: [numberLineRendererDecorator],
    args: {} satisfies Partial<PerseusNumberLineWidgetOptions>,
    play: hoverPoint,
};

// Verifies the highlighted (hovered) state of the open (strict inequality)
// dot: the hollow dot keeps its background fill while the highlight stroke
// renders in instructive color.
export const OpenDotHovered: Story = {
    decorators: [numberLineRendererDecorator],
    args: {
        isInequality: true,
        range: [-5, 5],
        divisionRange: [1, 12],
        snapDivisions: 1,
        tickStep: 1,
        correctRel: "gt",
        correctX: 0,
    } satisfies Partial<PerseusNumberLineWidgetOptions>,
    parameters: {
        initialUserInput: {
            "number-line 1": {
                rel: "gt",
                numDivisions: 10,
                numLinePosition: -5,
            },
        },
    },
    play: hoverPoint,
};
