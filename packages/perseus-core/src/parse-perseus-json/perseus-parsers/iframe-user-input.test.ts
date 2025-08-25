import {parse} from "../parse";
import {success} from "../result";

import {parseIFrameUserInput} from "./iframe-user-input";

describe("parseIframeUserInput", () => {
    it("accepts an object with no 'message' property", () => {
        const userInput = {status: "correct"};
        expect(parse(userInput, parseIFrameUserInput)).toEqual(
            success(userInput),
        );
    });
});
