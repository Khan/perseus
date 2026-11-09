import {expect} from "@internal/playwright";

import type {Question} from "./question.story";
import type {RenderedQuestion} from "./types";
import type {APIOptions} from "../../types";
import type {PerseusRenderer} from "@khanacademy/perseus-core";
import type {PlaywrightTestArgs} from "@playwright/test";

// See config/playwright/gallery/main.tsx for how story ids are formed.
const QUESTION_STORY = "perseus/testing/playwright/question/Question";

/**
 * Renders the given question in a Playwright component test. Waits until all
 * assets have been "rendered/loaded" before it returns.
 *
 * Returns a handle on the rendered question (see RenderedQuestion).
 */
const renderQuestion = async (
    mount: PlaywrightTestArgs["mount"],
    question: PerseusRenderer,
    apiOptions: APIOptions = Object.freeze({}),
    reviewMode = false,
): Promise<RenderedQuestion> => {
    const component = await mount<typeof Question>(QUESTION_STORY, {
        question,
        apiOptions,
        reviewMode,
    });

    // Wait for everything to load (spinner gone!)
    // See svg-image.jsx
    await expect(
        component.locator('span[style*="images/spinner.gif"]'),
    ).toHaveCount(0);

    // Wait for all widgets to finish rendering.
    await expect(component.getByTestId("is-rendered-and-loaded")).toHaveValue(
        "true",
    );

    const userInputField = component.getByTestId("user-input");
    return {
        component,
        userInputField,
        getUserInputMap: async () =>
            JSON.parse(await userInputField.inputValue()),
    };
};

export default renderQuestion;
