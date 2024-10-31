import {testDependencies} from "../../../../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";
import {WidgetType} from "../../prompt-types";
import {renderQuestion} from "../__testutils__/renderQuestion";

import {question1} from "./iframe.testdata";

import type {IFramePromptJSON} from "./prompt-utils";
import type {APIOptions} from "../../types";

describe("iframe widget", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("should snapshot", () => {
        // Arrange
        const apiOptions: APIOptions = {
            isMobile: false,
        };

        // Act
        const {container} = renderQuestion(question1, apiOptions);

        // Assert
        expect(container).toMatchSnapshot("first render");
    });

    it("should snapshot on mobile", () => {
        // Arrange
        const apiOptions: APIOptions = {
            isMobile: true,
        };

        // Act
        const {container} = renderQuestion(question1, apiOptions);

        // Assert
        expect(container).toMatchSnapshot("first mobile render");
    });

    it("should get prompt json which matches the state of the UI", async () => {
        // Arrange
        const {renderer} = renderQuestion(question1, {isMobile: false});
        const widget = renderer.getWidgetInstance("iframe 1");

        // Act
        const json = widget?.getPromptJSON?.() as IFramePromptJSON;

        // Assert
        expect(json).toEqual({
            type: WidgetType.IFRAME,
            options: {
                url: question1.widgets["iframe 1"].options.url,
            },
            userInput: {
                message: null,
                status: "incomplete",
            },
        });
    });

    //There isn't testable behavior for this widget
});
