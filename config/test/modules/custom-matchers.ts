// Ok here we are

import {scoreMatchers} from "./score-matchers";

interface CustomMatchers<R = unknown> {
    toHaveBeenAnsweredCorrectly(options?: {
        // TODO: some non-interactive widgets have scoring functions
        // that just return no points. They should probably just
        // not have scoring functions if they're not interactive.
        shouldHavePoints: boolean;
    }): R;
    toHaveInvalidInput(message?: string | null): R;
    toHaveBeenAnsweredIncorrectly(): R;
}

// Rstest types `expect(x)` as `Assertion`, and asymmetric matchers such as
// `expect.not.*` as `AsymmetricMatchersContaining`. `expect.extend()` below
// adds the matchers only at runtime, so both interfaces need them for
// TypeScript to accept them.
declare module "@rstest/core" {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type -- rstest custom matcher augmentation
    interface Assertion<T = any> extends CustomMatchers<T> {}
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type -- rstest custom matcher augmentation
    interface AsymmetricMatchersContaining extends CustomMatchers {}
}

expect.extend(scoreMatchers);
