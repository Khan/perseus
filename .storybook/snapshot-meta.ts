import {themeModes} from "./modes";

/**
 * How many consecutive frames must look identical before we call a story
 * settled. One is not enough: a style flush and the relayout it triggers land
 * on different frames.
 */
const STABLE_FRAMES = 3;

/**
 * Give up after this long and let the snapshot happen anyway. A story that
 * never settles should produce a diff someone can look at, not a timed-out
 * build.
 */
const MAX_WAIT_MS = 2000;

/**
 * A cheap fingerprint of everything a snapshot can see change.
 *
 * Dimensions catch layout still settling (measure-then-scale passes, images
 * arriving late). Child and text counts catch content still being added. The
 * stylesheet rule count catches styles injected after render: Aphrodite
 * buffers its injection, and until it flushes, stories here lay out as much as
 * 45px taller than their final size.
 */
function fingerprint(root: HTMLElement): string {
    const {width, height} = root.getBoundingClientRect();

    let cssRuleCount = 0;
    Array.from(document.styleSheets).forEach((sheet) => {
        try {
            cssRuleCount += sheet.cssRules.length;
        } catch {
            // Cross-origin sheets can't be read, and can't change either.
        }
    });

    return [
        Math.round(width),
        Math.round(height),
        root.scrollHeight,
        root.childElementCount,
        root.textContent?.length ?? 0,
        cssRuleCount,
    ].join(":");
}

function nextFrame(): Promise<void> {
    return new Promise((resolve) => {
        requestAnimationFrame(() => resolve());
    });
}

async function waitForStableFrames(
    root: HTMLElement,
    deadline: number,
): Promise<void> {
    let previous = fingerprint(root);
    let stableFrames = 0;

    while (stableFrames < STABLE_FRAMES && performance.now() < deadline) {
        await nextFrame();
        const current = fingerprint(root);
        stableFrames = current === previous ? stableFrames + 1 : 0;
        previous = current;
    }
}

/**
 * Waits until a story stops changing, so that Chromatic captures the same
 * pixels on every run.
 *
 * Chromatic decides when to snapshot on its own and offers no "ready" signal,
 * but it does await a story's play function — so this is the hook we have.
 *
 * It watches for stability rather than waiting on components to report in
 * (e.g. via `AssetContext`) for two reasons: the things that have actually
 * caused churn here — buffered style injection, a measure-then-scale pass —
 * don't report anywhere, and a component that fails to report would hang the
 * wait rather than merely produce a diff.
 */
export async function waitForStableLayout(root: HTMLElement): Promise<void> {
    const deadline = performance.now() + MAX_WAIT_MS;

    await waitForStableFrames(root, deadline);
}

/**
 * Spread into a regression story file's `meta` to opt it into Chromatic
 * snapshots.
 *
 * Opting in and waiting for the story to settle are deliberately the same act,
 * so a file can't get one without the other. Note that `parameters` needs
 * merging by hand if the file has its own.
 */
export const snapshotMeta = {
    parameters: {
        chromatic: {disableSnapshot: false, modes: themeModes},
    },
    play: async ({canvasElement}: {canvasElement: HTMLElement}) => {
        await waitForStableLayout(canvasElement);
    },
};
