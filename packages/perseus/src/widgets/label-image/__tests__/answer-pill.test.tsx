import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";
import {render} from "@testing-library/react";
import * as React from "react";

import {testDependencies} from "../../../testing/test-dependencies";
import * as Dependencies from "../../../dependencies";
import {AnswerPill} from "../answer-pill";

describe("AnswerPill", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("should display the correct answer string when there is only one selected answer", () => {
        const selectedAnswers = ["Answer 1"];
        const screen = render(
            <AnswerPill selectedAnswers={selectedAnswers} side={"top"} />,
            {wrapper: RenderStateRoot},
        );
        expect(screen.getByText("Answer 1")).toBeInTheDocument();
    });

    it("should display the correct answer string when there are multiple selected answers", () => {
        const selectedAnswers = ["Answer 1", "Answer 2", "Answer 3"];
        const screen = render(
            <AnswerPill selectedAnswers={selectedAnswers} side={"top"} />,
            {wrapper: RenderStateRoot},
        );
        expect(screen.getByText("3 answers")).toBeInTheDocument();
    });

    it("should be interactable when no right answer has been chosen", () => {
        // arrange
        const clickSpy = jest.fn();
        const selectedAnswers = ["Answer 1", "Answer 2", "Answer 3"];
        const screen = render(
            <AnswerPill
                selectedAnswers={selectedAnswers}
                side={"top"}
                onClick={clickSpy}
            />,
            {wrapper: RenderStateRoot},
        );

        // act
        screen.getByText("3 answers").click();

        // assert
        expect(clickSpy).toHaveBeenCalled();
    });

    it("should not be interactable when a correct answer has been chosen", () => {
        // arrange
        const clickSpy = jest.fn();
        const selectedAnswers = ["Answer 1", "Answer 2", "Answer 3"];
        const screen = render(
            <AnswerPill
                selectedAnswers={selectedAnswers}
                side={"top"}
                onClick={clickSpy}
                showCorrectness="correct"
            />,
            {wrapper: RenderStateRoot},
        );

        // act
        screen.getByText("3 answers").click();

        // assert
        expect(clickSpy).not.toHaveBeenCalled();
    });
});
