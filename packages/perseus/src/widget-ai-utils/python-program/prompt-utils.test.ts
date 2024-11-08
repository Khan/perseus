import {getPromptJSON} from "./prompt-utils";

describe("Python Program getPromptJSON", () => {
    it("it returns JSON with the expected format and fields", () => {
        const resultJSON = getPromptJSON();

        expect(resultJSON).toEqual({
            type: "python-program",
            isSupported: false,
            message: "",
        });
    });
});
