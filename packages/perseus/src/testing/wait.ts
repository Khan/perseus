import {screen} from "@testing-library/react";

if (typeof jest === "undefined") {
    /**
     * This file is for test use only.
     */
    throw new Error("Invalid import - for use in tests only");
}

/**
 * Checks that jest is configured to use real timers.
 */
const verifyRealTimers = () => {
    // Jest may warn if calling timer methods when real timers are used.
    // We need to silence that, but without impacting folks testing, so we'll be
    // cheeky. We don't use this to detect the timers though because if they
    // change this behavior we would silently start just working.
    // eslint-disable-next-line no-console
    const oldWarn = console.warn;
    console.warn = () => {}; // eslint-disable-line no-console

    try {
        const timerCount = jest.getTimerCount();
        // eslint-disable-next-line no-restricted-syntax
        const timeoutID = setTimeout(() => {}, 0);
        const newTimerCount = jest.getTimerCount();
        // eslint-disable-next-line no-restricted-syntax
        clearTimeout(timeoutID);
        if (timerCount !== newTimerCount) {
            throw new Error(
                "Cannot use wait() with fake timers. Call jest.useRealTimers() in test case or in a beforeEach.",
            );
        }
    } finally {
        console.warn = oldWarn; // eslint-disable-line no-console
    }
};

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
            // eslint-disable-next-line no-restricted-syntax
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
 * This will throw if jest.useRealTimers() is not used.
 */
export const wait: (options?: WaitOptions) => Promise<void> = ({
    delay = 0,
    count = 1,
} = {}) => {
    verifyRealTimers();

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
