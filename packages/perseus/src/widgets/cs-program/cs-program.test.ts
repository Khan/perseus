import {testDependencies} from "../../../../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";
import {renderQuestion} from "../__testutils__/renderQuestion";

import {CSProgram} from "./cs-program";
import {question1} from "./cs-program.testdata";

describe("cs-program widget", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("should snapshot", () => {
        // Arrange
        const apiOptions = {
            isMobile: false,
        } as const;

        // Act
        const {container} = renderQuestion(question1, apiOptions);

        // Assert
        expect(container).toMatchSnapshot("first render");
    });

    it("should snapshot on mobile", () => {
        // Arrange
        const apiOptions = {
            isMobile: true,
        } as const;

        // Act
        const {container} = renderQuestion(question1, apiOptions);

        // Assert
        expect(container).toMatchSnapshot("first mobile render");
    });

    it("can get user input from props", () => {
        // Arrange
        // Based on cs-program render props, combining
        // PerseusCSProgramWidgetOptions with status and message
        const widgetProps: any = {
            programID: "6293105639817216",
            settings: [
                {name: "", value: ""},
                {name: "", value: ""},
            ],
            height: 540,
            width: 640,
            static: false,
            showButtons: false,
            showEditor: false,
            status: "correct",
            message: "good job!",
        };

        // Act
        const userInput = CSProgram.getUserInputFromProps(widgetProps);

        // Assert
        expect(userInput).toEqual({
            status: "correct",
            message: "good job!",
        });
    });
});
