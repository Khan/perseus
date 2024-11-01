import {renderQuestion} from "../../widgets/__testutils__/renderQuestion";

import type {PerseusRenderer} from "../../perseus-types";
import type {PassageRefPromptJSON} from "../passage-ref/prompt-utils";

const question1: PerseusRenderer = {
    content: "[[☃ passage 1]]\n\n",
    images: {},
    widgets: {
        "passage 1": {
            alignment: "default",
            graded: true,
            options: {
                footnotes: "",
                passageText:
                    "Sociologists study folktales because they provide a means of understanding the distinctive values of a culture. However, the folktales in almost all cultures are adaptations of the same ancient narratives to the local milieu.\n",
                passageTitle: "",
                showLineNumbers: false,
                static: false,
            },
            static: false,
            type: "passage",
            version: {
                major: 0,
                minor: 0,
            },
        },
    },
};

describe("passage widget", () => {
    it("should get prompt json which matches the state of the UI", async () => {
        // Arrange
        const {renderer} = renderQuestion(question1);
        const widget = renderer.getWidgetInstance("passage 1");
        const questionOptions = question1.widgets["passage 1"].options;

        // Act
        const json = widget?.getPromptJSON?.() as PassageRefPromptJSON;

        // Assert
        expect(json).toEqual({
            type: "passage",
            options: {
                footnotes: questionOptions.footnotes,
                passageText: questionOptions.passageText,
                passageTitle: questionOptions.passageTitle,
            },
        });
    });
});
