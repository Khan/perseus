import {scoreQuestion} from "@khanacademy/perseus-score";
import invariant from "tiny-invariant";

import {renderQuestion} from "../../__testutils__/render-question";
import {waitForInitialGraphieRender} from "../../testing/wait";

import {
    question1,
    questionWithMovablePointMissingConstraints,
} from "./interaction.testdata";

describe("interaction widget", () => {
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
        const score = scoreQuestion(
            question1,
            renderer.getUserInputMap(),
            "en",
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
