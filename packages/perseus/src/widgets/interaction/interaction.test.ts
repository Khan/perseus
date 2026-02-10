import invariant from "tiny-invariant";

import * as Dependencies from "../../dependencies";
import {testDependencies} from "../../testing/test-dependencies";
import {waitForInitialGraphieRender} from "../../testing/wait";
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

    it("should score zero points", async () => {
        // Arrange
        const {renderer} = renderQuestion(question1);
        await waitForInitialGraphieRender();

        // Act
        const score = scorePerseusItemTesting(
            question1,
            renderer.getUserInputMap(),
        );

        invariant(
            score.type === "points",
            `score.type should be "points", but was ${score.type}`,
        );

        // Assert
        expect(score.earned).toBe(0);
    });

    it("renders movable point elements with blank constraintXMin, constraintXMax, etc.", async () => {
        const {container} = renderQuestion(
            questionWithMovablePointMissingConstraints,
        );
        await waitForInitialGraphieRender();

        expect(container).toMatchSnapshot();
    });
});
