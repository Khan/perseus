import {getPromptJSON} from "./prompt-utils";

describe("Measurer getPromptJSON", () => {
    it("it returns JSON with the expected format and fields", () => {
        const resultJSON = getPromptJSON();

        expect(resultJSON).toEqual({
            type: "measurer",
            isSupported: false,
            message: "",
        });
    });
});
