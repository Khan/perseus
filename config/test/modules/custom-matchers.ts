// Ok here we are

import {scoreMatchers} from "./score-matchers";

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace jest {
        interface Matchers<R> {
            toHaveBeenAnsweredCorrectly(options?: {
                // TODO: some non-interactive widgets have scoring functions
                // that just return no points. They should probably just
                // not have scoring functions if they're not interactive.
                shouldHavePoints: boolean;
            }): R;
            toHaveInvalidInput(message?: string | null): R;
            toHaveBeenAnsweredIncorrectly(): R;
        }
    }
}

expect.extend(scoreMatchers);
