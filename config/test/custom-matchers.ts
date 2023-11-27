// Ok here we are

import type {PerseusScore} from "../../packages/perseus/src/types";

type PerseusRenderer = {
    guessAndScore: () => [Array<any>, PerseusScore];
};

expect.extend({
    toHaveBeenAnsweredCorrectly(renderer: PerseusRenderer) {
        const [widgetState, score] = renderer.guessAndScore();
        if (score.type === "invalid") {
            return {
                pass: false,
                message: () =>
                    `Invalid answer: ${
                        score.message || "(no message)"
                    }; widget state ${JSON.stringify(widgetState)}`,
            };
        }
        if (score.type !== "points") {
            return {
                pass: false,
                message: () => `Problem was not fully answered`,
            };
        }
        if (score.earned !== score.total) {
            return {
                pass: false,
                message: () =>
                    `Problem was answered incorrectly. Widget state: ${JSON.stringify(
                        widgetState,
                    )}`,
            };
        }
        return {pass: true, message: () => ""};
    },

    toHaveInvalidInput(renderer: PerseusRenderer, message: string | null) {
        const [widgetState, score] = renderer.guessAndScore();
        if (score.type !== "invalid") {
            return {
                pass: false,
                message: () =>
                    `Answer state is not invalid. Score: ${JSON.stringify(
                        score,
                    )}; ${JSON.stringify(widgetState)}`,
            };
        }
        if (message && (!score.message || !score.message.includes(message))) {
            return {
                pass: false,
                message: () =>
                    `Message shown for invalid input did not include "${message}": ${
                        score.message || "(no message)"
                    }. ${JSON.stringify(score)} - ${JSON.stringify(
                        widgetState,
                    )}`,
            };
        }
        return {pass: true, message: () => ""};
    },

    toHaveBeenAnsweredIncorrectly(renderer: PerseusRenderer) {
        const [widgetState, score] = renderer.guessAndScore();
        if (score.type === "invalid") {
            return {
                pass: false,
                message: () =>
                    `Invalid answer: ${
                        score.message || "(no message)"
                    }; widget state ${JSON.stringify(widgetState)}`,
            };
        }
        if (score.type !== "points") {
            return {
                pass: false,
                message: () => `Problem was not fully answered`,
            };
        }
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
