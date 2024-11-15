import {getPromptJSON} from "./measurer-ai-utils";

describe("Measurer AI utils", () => {
    it("it returns JSON with the expected format and fields", () => {
        const resultJSON = getPromptJSON();

        expect(resultJSON).toEqual({
            type: "measurer",
            isSupported: false,
            message: "",
        });
    });
});
