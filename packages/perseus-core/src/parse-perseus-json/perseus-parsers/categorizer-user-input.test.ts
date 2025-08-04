import {parse} from "../parse";
import {success} from "../result";

import {parseCategorizerUserInput} from "./categorizer-user-input";

describe("parseCategorizerUserInput", () => {
    it("handles undefined", () => {
        const userInput = {
            values: [undefined, 2],
        };

        expect(parse(userInput, parseCategorizerUserInput)).toEqual(
            success({
                values: [undefined, 2],
            }),
        );
    });

    it("handles null", () => {
        const userInput = {
            values: [null, 2],
        };

        expect(parse(userInput, parseCategorizerUserInput)).toEqual(
            success({
                values: [null, 2],
            }),
        );
    });
});
