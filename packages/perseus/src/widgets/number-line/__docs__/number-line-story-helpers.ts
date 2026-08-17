import {waitFor} from "storybook/test";
import invariant from "tiny-invariant";

// The number line draws in two asynchronous passes: Raphael builds the SVG
// layers (including the movable point <ellipse>), and every label — decimal
// AND fraction — is rendered as LaTeX into a `.tex-holder` span via an async
// TeX pass. A screenshot taken before both finish captures a half-drawn line,
// which is the flakiness this widget is prone to. These helpers gate the
// Chromatic snapshot on the widget being fully drawn.

// Waits until the movable point has rendered and every label has finished its
// async TeX render. Used as a wait-only `play` for static stories and as the
// pre-interaction wait for interactions stories.
export const waitForNumberLine = (canvasElement: HTMLElement): Promise<void> =>
    waitFor(() => {
        const point = canvasElement.querySelector(
            '[data-interactive-kind-for-testing="movable-point"] ellipse',
        );
        if (point == null) {
            throw new Error("number line point has not rendered yet");
        }

        const labels = canvasElement.querySelectorAll(".graphie-label");
        if (labels.length === 0) {
            throw new Error("number line labels have not been created yet");
        }

        // Each label renders as MathJax, which emits an <mjx-container> only
        // once it has produced its typeset output. Gating on that node (rather
        // than on a generic child count) ties the wait to the math actually
        // being rendered.
        const allLabelsRendered = Array.from(labels).every(
            (label) => label.querySelector(".tex-holder mjx-container") != null,
        );
        if (!allLabelsRendered) {
            throw new Error("number line labels are still rendering");
        }
    });

export function assertPointRendered(
    point: Element | null,
): asserts point is Element {
    invariant(point != null, "movable point has not rendered yet");
}

// The invalid-divisions configuration renders an error message in place of the
// line, so there is no point or labels to wait for — gate on the error text.
export const waitForError = (canvasElement: HTMLElement): Promise<void> =>
    waitFor(() => {
        if (canvasElement.querySelector(".perseus-error") == null) {
            throw new Error("error message has not rendered yet");
        }
    });
