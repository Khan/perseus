import {getPromptJSON} from "./prompt-utils";

describe("Video getPromptJSON", () => {
    it("it returns JSON with the expected format and fields", () => {
        const resultJSON = getPromptJSON();

        expect(resultJSON).toEqual({
            type: "video",
            isSupported: false,
            message: "",
        });
    });
});
