import {getPromptJSON} from "./prompt-utils";

describe("Interaction getPromptJSON", () => {
    it("it returns JSON with the expected format and fields", () => {
        const resultJSON = getPromptJSON();

        expect(resultJSON).toEqual({
            type: "interaction",
            isSupported: false,
            message: "",
        });
    });
});
