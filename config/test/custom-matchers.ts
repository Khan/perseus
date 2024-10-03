// Ok here we are

import type {PerseusScore} from "../../packages/perseus/src/types";

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace jest {
        interface Matchers<R> {
            toHaveBeenAnsweredCorrectly(options?: {
                // TODO: some non-interactive widgets have "validators"
                // that just return no points. They should probably just
                // not have validators if they're not interactive.
                shouldHavePoints: boolean;
            }): R;
            toHaveInvalidInput(message?: string | null): R;
            toHaveBeenAnsweredIncorrectly(): R;
            toBeHighlighted(): R;
        }
    }
}

type PerseusRenderer = {
    guessAndScore: () => [Array<any>, PerseusScore];
};

type Answerable = PerseusRenderer | PerseusScore;

function isRenderer(obj: Answerable): obj is PerseusRenderer {
    // @ts-expect-error - TS(2339) - TS is annoying
    return obj?.guessAndScore !== undefined;
}

function check(answerable: Answerable) {
    let widgetState: string = "";
    let score: PerseusScore;

    if (isRenderer(answerable)) {
        const result = answerable.guessAndScore();
        widgetState = JSON.stringify(result[0]);
        score = result[1];
    } else {
        score = answerable;
    }

    return {widgetState, score};
}

function maybeAddState(message: string, widgetState: string): string {
    if (!widgetState) {
        return message;
    }

    return message + `; widget state: ${widgetState}`;
}

expect.extend({
    toHaveBeenAnsweredCorrectly(
        answerable: Answerable,
        options: {
            shouldHavePoints: boolean;
        },
    ) {
        const shouldHavePoints = options?.shouldHavePoints ?? true;
        const {widgetState, score} = check(answerable);

        if (score.type === "invalid") {
            const errMessage = maybeAddState(
                `Invalid answer: ${score.message || "(no message)"}`,
                widgetState,
            );

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
            const errMessage = maybeAddState(
                "Problem was answered incorrectly",
                widgetState,
            );

            return {
                pass: false,
                message: () => errMessage,
            };
        }

        if (shouldHavePoints && score.total < 1) {
            const errMessage = maybeAddState(
                "Score did not have any points",
                widgetState,
            );

            return {
                pass: false,
                message: () => errMessage,
            };
        } else if (!shouldHavePoints && score.total > 0) {
            const errMessage = maybeAddState(
                "Score had points when it shouldn't have",
                widgetState,
            );

            return {
                pass: false,
                message: () => errMessage,
            };
        }

        return {pass: true, message: () => ""};
    },

    toHaveInvalidInput(answerable: Answerable, message: string | null) {
        const {widgetState, score} = check(answerable);

        if (score.type !== "invalid") {
            const errMessage = maybeAddState(
                `Answer state is not invalid. Score: ${JSON.stringify(score)}`,
                widgetState,
            );

            return {
                pass: false,
                message: () => errMessage,
            };
        }

        if (message && (!score.message || !score.message.includes(message))) {
            const errMessage = maybeAddState(
                `Message shown for invalid input did not include "${message}": ${
                    score.message || "(no message)"
                }. Score: ${JSON.stringify(score)}`,
                widgetState,
            );

            return {
                pass: false,
                message: () => errMessage,
            };
        }

        return {pass: true, message: () => ""};
    },

    toHaveBeenAnsweredIncorrectly(answerable: Answerable) {
        const {widgetState, score} = check(answerable);

        if (score.type === "invalid") {
            const errMessage = maybeAddState(
                `Invalid answer: ${score.message || "(no message)"}`,
                widgetState,
            );

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

        // Are we sure this is right? I wonder if it should be
        // score.earned === score.total
        // (in multi-widget questions, you can get some right and some wrong)
        if (score.earned !== 0) {
            return {
                pass: false,
                message: () =>
                    `Problem was answered correctly. Widget state: ${JSON.stringify(
                        widgetState,
                    )}`,
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
