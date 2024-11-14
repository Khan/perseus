import {getPromptJSON} from "./plotter-ai-utils";

describe("Plotter AI utils", () => {
    it("it returns JSON with the expected format and fields", () => {
        const resultJSON = getPromptJSON();

        expect(resultJSON).toEqual({
            type: "plotter",
            isSupported: false,
            message: "",
        });
    });
});
