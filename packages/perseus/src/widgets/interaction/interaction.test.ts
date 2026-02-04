import {testDependencies} from "../../testing/test-dependencies";
import {waitForInitialGraphieRender} from "../../testing/wait";
import * as Dependencies from "../../dependencies";
import {scorePerseusItemTesting} from "../../util/test-utils";
import {renderQuestion} from "../__testutils__/renderQuestion";

import {
    question1,
    questionWithMovablePointMissingConstraints,
} from "./interaction.testdata";

describe("interaction widget", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("should render", async () => {
        // Arrange/Act
        const {container} = renderQuestion(question1);
        await waitForInitialGraphieRender();

        // Assert
        expect(container).toMatchSnapshot();
    });

    it("should be unanswerable", async () => {
        // Arrange
        const {renderer} = renderQuestion(question1);
        await waitForInitialGraphieRender();

        // Act
        const score = scorePerseusItemTesting(
            question1,
            renderer.getUserInputMap(),
        );

        // Assert
        // Note that this widget can never be answered correctly, no matter
        // what state its in.
        expect(score).toHaveBeenAnsweredIncorrectly();
    });

    it("renders movable point elements with blank constraintXMin, constraintXMax, etc.", async () => {
        const {container} = renderQuestion(
            questionWithMovablePointMissingConstraints,
        );
        await waitForInitialGraphieRender();

        expect(container).toMatchSnapshot();
    });
});
