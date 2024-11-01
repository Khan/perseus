import {getPromptJSON} from "./prompt-utils";

describe("PhET Simulation getPromptJSON", () => {
    it("it returns JSON with the expected format and fields", () => {
        const resultJSON = getPromptJSON();

        expect(resultJSON).toEqual({
            type: "phet-simulation",
            isSupported: false,
        });
    });
});
