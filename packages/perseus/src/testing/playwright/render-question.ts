import {expect} from "@internal/playwright";

import type {Question} from "./question.story";
import type {APIOptions} from "../../types";
import type {PerseusRenderer, UserInputMap} from "@khanacademy/perseus-core";
import type {Locator, PlaywrightTestArgs} from "@playwright/test";

// See config/playwright/gallery/main.tsx for how story ids are formed.
const QUESTION_STORY = "perseus/testing/playwright/question/Question";

/** A question mounted by `renderQuestion()`. */
export type RenderedQuestion = {
    /** The mounted story. */
    component: Locator;
    /**
     * The hidden field the story records the question's user input in, as
     * JSON. Its value changes whenever the question reports new user input,
     * so a test can wait for an interaction to land with
     * `expect(userInputField).not.toHaveValue(previousValue)`.
     */
    userInputField: Locator;
    /** Read the question's current user input. */
    getUserInputMap: () => Promise<UserInputMap>;
};

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
