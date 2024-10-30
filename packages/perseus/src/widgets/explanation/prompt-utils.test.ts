import {WidgetType} from "../../prompt-types";

import {getPromptJSON} from "./prompt-utils";

describe("Explanation getPromptJSON", () => {
    it("it returns JSON with the expected format and fields", () => {
        const renderProps: any = {
            showPrompt: "showPrompt",
            hidePrompt: "hidePrompt",
            explanation: "explanation",
        };

        const resultJSON = getPromptJSON(renderProps);

        expect(resultJSON).toEqual({
            type: WidgetType.EXPLANATION,
            showPrompt: renderProps.showPrompt,
            hidePrompt: renderProps.hidePrompt,
            explanation: renderProps.explanation,
        });
    });
});
