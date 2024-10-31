import {WidgetType} from "../../prompt-types";

import {getPromptJSON} from "./prompt-utils";

describe("CS Program getPromptJSON", () => {
    it("it returns JSON with the expected format and fields", () => {
        const resultJSON = getPromptJSON();

        expect(resultJSON).toEqual({
            type: WidgetType.CS_PROGRAM,
            isSupported: false,
        });
    });
});
