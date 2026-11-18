import {rs} from "@rstest/core";
import {screen} from "@testing-library/react";

type WaitOptions = {
    /**
     * The time in milliseconds to wait on each wait.
     * Defaults to 0. Any number less than 0 will be treated as 0.
     */
    delay?: number;
    /**
     * The number of times to wait.
     * Defaults to 1. Any number below 1 will be treated as 1.
     */
    count?: number;
};

const unverifiedWait = (delay: number, count: number) =>
    new Promise(
        (
            resolve: (result: Promise<undefined> | undefined) => void,
            reject: (error?: any) => void,
        ) => {
            setTimeout(() => {
                if (count > 1) {
                    resolve(unverifiedWait(delay, count - 1));
                } else {
                    // @ts-expect-error - TS2794 - Expected 1 arguments, but got 0. Did you forget to include 'void' in your type argument to 'Promise'?
                    resolve();
                }
            }, delay);
        },
    );

/**
 * Wait for the given delay as many times as indicated.
 *
 * This will throw if rs.useRealTimers() is not used.
 */
export const wait: (options?: WaitOptions) => Promise<void> = ({
    delay = 0,
    count = 1,
} = {}) => {
    if (rs.isFakeTimers()) {
        throw new Error(
            "Cannot use wait() with fake timers. Call rs.useRealTimers() in test case or in a beforeEach.",
        );
    }

    const normalizedDelay = delay < 0 ? 0 : delay;
    const normalizedCount = count < 1 ? 1 : count;
    return unverifiedWait(normalizedDelay, normalizedCount);
};

/**
 * Waits for the initial Graphie render.
 *
 * @returns a Promise<void> that resolves when the Graphie graph has renderred.
 * The behaviour is undefined if there are multiple Graphies on the page (which
 * is unlikely in tests).
 */
export async function waitForInitialGraphieRender() {
    // Graphie uses Raphaël.js to render SVG. We can tell that Graphie has done
    // at least the first render by the existence of this text in the DOM.

    // Note(jeremy): findAllBy will throw if there are no matches!
    // See: https://testing-library.com/docs/dom-testing-library/cheatsheet

    // eslint-disable-next-line testing-library/prefer-explicit-assert
    await screen.findAllByText("Created with Raphaël");
}
