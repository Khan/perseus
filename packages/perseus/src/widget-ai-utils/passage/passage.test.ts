import {renderQuestion} from "../../widgets/__testutils__/renderQuestion";

import type {PerseusRenderer} from "../../perseus-types";

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
                passageTitle: "Why do sociologists study folktales?",
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

        // Act
        const json = renderer.getPromptJSON();

        // Assert
        expect(json).toEqual({
            content: "[[☃ passage 1]]\n\n",
            widgets: {
                "passage 1": {
                    type: "passage",
                    options: {
                        footnotes: "",
                        passageText:
                            "Sociologists study folktales because they provide a means of understanding the distinctive values of a culture. However, the folktales in almost all cultures are adaptations of the same ancient narratives to the local milieu.\n",
                        passageTitle: "Why do sociologists study folktales?",
                    },
                },
            },
        });
    });
});
