import {act, screen} from "@testing-library/react";

import {testDependencies} from "../../../../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";
import {scorePerseusItemTesting} from "../../util/test-utils";
import {renderQuestion} from "../__testutils__/renderQuestion";
import {Passage} from "../passage";

import {question1} from "./passage-ref.testdata";

const mockReference = (
    mock: null | {
        startLine: number;
        endLine: number;
        content: string;
    },
) => {
    jest.spyOn(Passage.prototype, "getReference").mockImplementation(() => {
        return mock;
    });
};

describe("passage-ref widget", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("should render with invalid reference", () => {
        // Arrange
        mockReference(null);

        // Act
        const {container} = renderQuestion(question1);
        act(() => jest.runOnlyPendingTimers());

        // Assert
        expect(container).toMatchSnapshot();
    });

    it("should render unkown line numbers with invalid reference", () => {
        // Arrange
        mockReference(null);

        // Act
        renderQuestion(question1);
        act(() => jest.runOnlyPendingTimers());

        // Assert
        expect(screen.getByText("lines ?–?", {exact: false})).toBeVisible();
    });

    it("should render with single-line reference", () => {
        // Arrange
        mockReference({
            startLine: 4,
            endLine: 4,
            content: "mocked reference content",
        });

        // Act
        const {container} = renderQuestion(question1);
        act(() => jest.runOnlyPendingTimers());

        // Assert
        expect(container).toMatchSnapshot();
    });

    it("should render correct line number with single-line reference", () => {
        // Arrange
        mockReference({
            startLine: 4,
            endLine: 4,
            content: "mocked reference content",
        });

        // Act
        renderQuestion(question1);
        act(() => jest.runOnlyPendingTimers());

        // Assert
        expect(screen.getByText("line 4", {exact: false})).toBeVisible();
    });

    it("should render with multi-line reference", () => {
        // Arrange
        mockReference({
            startLine: 4,
            endLine: 6,
            content: "mocked reference content",
        });

        // Act
        const {container} = renderQuestion(question1);
        act(() => jest.runOnlyPendingTimers());

        // Assert
        expect(container).toMatchSnapshot();
    });

    it("should render correct line numbers with multi-line reference", () => {
        // Arrange
        mockReference({
            startLine: 4,
            endLine: 6,
            content: "mocked reference content",
        });

        // Act
        renderQuestion(question1);
        act(() => jest.runOnlyPendingTimers());

        // Assert
        expect(screen.getByText("lines 4–6", {exact: false})).toBeVisible();
    });

    it("should render with summary text", () => {
        // Arrange
        mockReference({
            startLine: 4,
            endLine: 4,
            content: "mocked reference content",
        });

        // Act
        renderQuestion({
            ...question1,
            widgets: {
                ...question1.widgets,
                "passage-ref 1": {
                    options: {
                        passageNumber: 1,
                        referenceNumber: 1,
                        summaryText: "A **summary** of the _reference_",
                    },
                    type: "passage-ref",
                    version: {
                        major: 0,
                        minor: 1,
                    },
                },
            },
        });
        act(() => jest.runOnlyPendingTimers());

        // Assert
        expect(
            screen.getByText("of the", {
                exact: false,
            }),
        ).toHaveTextContent("A summary of the reference");
    });

    it("should not be answerable", () => {
        // Arrange

        // Act
        const {renderer} = renderQuestion(question1);
        act(() => jest.runOnlyPendingTimers());
        const score = scorePerseusItemTesting(
            question1,
            renderer.getUserInputMap(),
        );

        // Assert
        expect(score).toHaveBeenAnsweredIncorrectly();
    });
});
