import {WidgetType} from "../../prompt-types";

import {getPromptJSON} from "./prompt-utils";

describe("Definition getPromptJSON", () => {
    it("it returns JSON with the expected format and fields", () => {
        const renderProps: any = {
            definition: "to confuse or fluster",
            togglePrompt: "bumfuzzle",
        };

        const resultJSON = getPromptJSON(renderProps);

        expect(resultJSON).toEqual({
            type: WidgetType.DEFINITION,
            definition: renderProps.definition,
            togglePrompt: renderProps.togglePrompt,
        });
    });
});
