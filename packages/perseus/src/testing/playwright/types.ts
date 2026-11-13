import type {UserInputMap} from "@khanacademy/perseus-core";
import type {Locator} from "@playwright/test";

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
