import {testDependencies} from "../../../../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";
import {scorePerseusItemTesting} from "../../util/test-utils";
import {renderQuestion} from "../__testutils__/renderQuestion";

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
        // Arrange
        const {renderer} = renderQuestion(question);

        // Act
        const score = scorePerseusItemTesting(
            question,
            renderer.getUserInput(),
        );

        // Assert
        expect(score).toHaveBeenAnsweredCorrectly();
    });
});
