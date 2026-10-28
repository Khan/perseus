import {expect} from "@playwright/test";

import type {Question} from "./perseus-question.story";
import type {APIOptions} from "../types";
import type {PerseusRenderer, UserInputMap} from "@khanacademy/perseus-core";
import type {Locator, PlaywrightTestArgs} from "@playwright/test";

const QUESTION_STORY = "perseus/src/testing/perseus-question/Question";

/**
 * Renders the given question in a Playwright component test. Waits until all
 * assets have been "rendered/loaded" before it returns.
 *
 * Returns the mounted component, and a function that reads the question's
 * current user input back out of the browser.
 */
const renderQuestion = async (
    mount: PlaywrightTestArgs["mount"],
    question: PerseusRenderer,
    apiOptions: APIOptions = Object.freeze({}),
    reviewMode = false,
): Promise<{
    component: Locator;
    getUserInputMap: () => Promise<UserInputMap>;
}> => {
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

    return {
        component,
        getUserInputMap: async () =>
            JSON.parse(await component.getByTestId("user-input").inputValue()),
    };
};

export default renderQuestion;
