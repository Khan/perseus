// Ok here we are

import type {PerseusScore} from "../../packages/perseus-core/src/validation.types";

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
            toBeHighlighted(): R;
        }
    }
}

expect.extend({
    toHaveBeenAnsweredCorrectly(
        score: PerseusScore,
        options: {
            shouldHavePoints: boolean;
        },
    ) {
        const shouldHavePoints = options?.shouldHavePoints ?? true;

        if (score.type === "invalid") {
            const errMessage = `Invalid answer: ${score.message || "(no message)"}`;
            return {
                pass: false,
                message: () => errMessage,
            };
        }

        if (score.type !== "points") {
            return {
                pass: false,
                message: () => `Problem was not fully answered`,
            };
        }

        if (score.earned !== score.total) {
            const errMessage = "Problem was answered incorrectly";

            return {
                pass: false,
                message: () => errMessage,
            };
        }

        if (shouldHavePoints && score.total < 1) {
            const errMessage = "Score did not have any points";

            return {
                pass: false,
                message: () => errMessage,
            };
        } else if (!shouldHavePoints && score.total > 0) {
            const errMessage = "Score had points when it shouldn't have";

            return {
                pass: false,
                message: () => errMessage,
            };
        }

        return {pass: true, message: () => ""};
    },

    toHaveInvalidInput(score: PerseusScore, message: string | null) {
        if (score.type !== "invalid") {
            const errMessage = `Answer state is not invalid. Score: ${JSON.stringify(score)}`;

            return {
                pass: false,
                message: () => errMessage,
            };
        }

        if (message && (!score.message || !score.message.includes(message))) {
            const errMessage = `Message shown for invalid input did not include "${message}": ${
                score.message || "(no message)"
            }. Score: ${JSON.stringify(score)}`;

            return {
                pass: false,
                message: () => errMessage,
            };
        }

        return {pass: true, message: () => ""};
    },

    toHaveBeenAnsweredIncorrectly(score: PerseusScore) {
        if (score.type === "invalid") {
            const errMessage = `Invalid answer: ${score.message || "(no message)"}`;

            return {
                pass: false,
                message: () => errMessage,
            };
        }

        if (score.type !== "points") {
            return {
                pass: false,
                message: () => `Problem was not fully answered`,
            };
        }

        if (score.earned >= score.total) {
            return {
                pass: false,
                message: () => `Problem was answered correctly.`,
            };
        }

        return {pass: true, message: () => ""};
    },

    // [Perseus-specific] Asserts that the given DOM element is somewhere
    // within a highlighted widget
    toBeHighlighted(el: HTMLElement) {
        let parent = el.parentElement;
        while (parent != null) {
            if (
                parent.tagName.toLowerCase() === "div" &&
                parent.classList.contains("perseus-widget-container")
            ) {
                if (parent.classList.contains("widget-highlight")) {
                    return {pass: true, message: () => ""};
                }

                return {
                    pass: false,
                    message: () => `Element is not highlighted`,
                };
            }
            parent = parent.parentElement;
        }

        return {
            pass: false,
            message: () => `Element does not appear to be a part of a widget`,
        };
    },
});
