import {testDependencies} from "../../../../../../testing/test-dependencies";
import * as Dependencies from "../../../dependencies";
import {renderQuestion} from "../../__testutils__/renderQuestion";

const question = {
    content:
        "Read the excerpt and answer the question below. \n\nThe Governor and Council of the Massachusetts had much conference many days; and at last . . . . concluded a peace and friendship with [[\u2603 widget 1]], upon these conditions.",
    images: {},
    widgets: {
        "widget 1": {
            graded: true,
            version: {
                major: 0,
                minor: 0,
            },
            static: false,
            type: "deprecated-standin",
            options: {
                static: false,
            },
            alignment: "default",
        },
    },
} as const;

describe("Deprecated Standin widget", () => {
    beforeEach(() => {
        jest.useRealTimers();

        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("should have a default snapshot", () => {
        // Arrange & Act
        const {container} = renderQuestion(question);

        // Assert
        expect(container).toMatchSnapshot("first render");
    });

    it("should be scorable and always give points", () => {
        // Arrange and act
        const {renderer} = renderQuestion(question);
        const result = renderer.scoreWidgets();

        // Assert
        expect(result["widget 1"]).toMatchObject({
            type: "points",
            earned: 1,
            total: 1,
            message: null,
        });
    });

    it("should return an empty object for getUserInput()", () => {
        // Arrange
        const {renderer} = renderQuestion(question);

        // Act
        const userInput = renderer.getUserInput();

        // Assert
        expect(userInput).toMatchInlineSnapshot(`
            [
              {},
            ]
        `);
    });

    it("should return a correct answer score for simpleValidate()", () => {
        // Arrange
        const {renderer} = renderQuestion(question);

        // Act
        const score = renderer.scoreWidgets();

        // Assert
        expect(score).toMatchInlineSnapshot(`
            {
              "widget 1": {
                "earned": 1,
                "message": null,
                "total": 1,
                "type": "points",
              },
            }
        `);
    });
});
