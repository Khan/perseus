import {getPromptJSON} from "./prompt-utils";

import type {PerseusMatcherUserInput} from "../../validation.types";

describe("Matcher getPromptJSON", () => {
    it("it returns JSON with the expected format and fields", () => {
        const renderProps: any = {
            labels: {
                left: "Number",
                right: "Letter",
            },
            left: ["1", "2", "3"],
            right: ["a", "b", "c"],
            orderMatters: false,
        };

        const userInput: PerseusMatcherUserInput = {
            left: ["3", "1", "2"],
            right: ["a", "b", "c"],
        };

        const resultJSON = getPromptJSON(renderProps, userInput);

        expect(resultJSON).toEqual({
            type: "matcher",
            options: {
                labels: {
                    left: "Number",
                    right: "Letter",
                },
                left: ["1", "2", "3"],
                right: ["a", "b", "c"],
                orderMatters: false,
            },
            userInput: {
                left: ["3", "1", "2"],
                right: ["a", "b", "c"],
            },
        });
    });
});
