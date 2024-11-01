import {getPromptJSON} from "./prompt-utils";

describe("Plotter getPromptJSON", () => {
    it("it returns JSON with the expected format and fields", () => {
        const resultJSON = getPromptJSON();

        expect(resultJSON).toEqual({
            type: "plotter",
            isSupported: false,
        });
    });
});
