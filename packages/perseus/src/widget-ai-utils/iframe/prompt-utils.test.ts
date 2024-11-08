import {getPromptJSON} from "./prompt-utils";

describe("Iframe getPromptJSON", () => {
    it("it returns JSON with the expected format and fields", () => {
        const resultJSON = getPromptJSON();

        expect(resultJSON).toEqual({
            type: "iframe",
            isSupported: false,
            message: "",
        });
    });
});
