import {testDependencies} from "../../../../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";
import {renderQuestion} from "../../widgets/__testutils__/renderQuestion";

import type {DefinitionPromptJSON} from "./prompt-utils";

const question = {
    content:
        "Read the excerpt and answer the question below. \n\nThe Governor and Council of the Massachusetts had much conference many days; and at last . . . . concluded a peace and friendship with [[\u2603 definition 1]], upon these conditions.",
    images: {},
    widgets: {
        "definition 1": {
            graded: true,
            version: {
                major: 0,
                minor: 0,
            },
            static: false,
            type: "definition",
            options: {
                definition: "Definition text",
                togglePrompt: "the Pequots",
                static: false,
            },
            alignment: "default",
        },
    },
} as const;

describe("definition widget", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("Should get prompt json which matches the state of the UI", async () => {
        // Arrange
        const {renderer} = renderQuestion(question);
        const widget = renderer.getWidgetInstance("definition 1");
        const widgetOptions = question.widgets["definition 1"].options;

        // Act
        const json = widget?.getPromptJSON?.() as DefinitionPromptJSON;

        // Assert
        expect(json).toEqual({
            type: "definition",
            definition: widgetOptions.definition,
            togglePrompt: widgetOptions.togglePrompt,
        });
    });
});
