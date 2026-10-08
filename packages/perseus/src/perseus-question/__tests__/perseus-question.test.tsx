import {splitPerseusItem} from "@khanacademy/perseus-core";
import Button from "@khanacademy/wonder-blocks-button";
import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";
import {act, render, screen} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";
import * as React from "react";

import {PerseusI18nContextProvider} from "../../components/i18n-context";
import {DependenciesContext, setDependencies} from "../../dependencies";
import {mockStrings} from "../../strings";
import {
    testDependencies,
    testDependenciesV2,
} from "../../testing/test-dependencies";
import {registerAllWidgetsForTesting} from "../../util/register-all-widgets-for-testing";
import {PerseusQuestion, PerseusQuestionFeedback} from "../perseus-question";
import {
    generateNumericInputItem,
    generateRadioItem,
} from "../perseus-question.testdata";
import {usePerseusQuestion} from "../use-perseus-question";

import type {
    PerseusQuestionResult,
    UsePerseusQuestionOptions,
} from "../use-perseus-question";

const correct: PerseusQuestionResult = {
    score: {type: "points", earned: 1, total: 1},
};
const incorrect: PerseusQuestionResult = {
    score: {type: "points", earned: 0, total: 1},
};

type HostProps = UsePerseusQuestionOptions & {withFeedback?: boolean};

// A minimal host: the Check button and feedback placement belong to the
// wrapping experience, not PerseusQuestion.
function TestHost({withFeedback = true, ...options}: HostProps) {
    const question = usePerseusQuestion(options);
    return (
        <>
            <PerseusQuestion question={question} />
            <Button
                onClick={() => void question.check()}
                aria-label="Check"
                spinner={question.isChecking}
                disabled={question.isFinished}
            >
                Check
            </Button>
            {withFeedback ? (
                <PerseusQuestionFeedback question={question} />
            ) : (
                <p>Host saw: {question.status.type}</p>
            )}
        </>
    );
}

function renderPerseusQuestion(props: HostProps) {
    setDependencies(testDependencies);
    registerAllWidgetsForTesting();
    const ui = (p: HostProps) => (
        <RenderStateRoot>
            <PerseusI18nContextProvider strings={mockStrings} locale="en">
                <DependenciesContext.Provider value={testDependenciesV2}>
                    <TestHost {...p} />
                </DependenciesContext.Provider>
            </PerseusI18nContextProvider>
        </RenderStateRoot>
    );
    const {rerender} = render(ui(props));
    return {rerender: (p: HostProps) => rerender(ui(p))};
}

describe("PerseusQuestion", () => {
    let user: ReturnType<typeof userEvent.setup>;

    beforeEach(() => {
        user = userEvent.setup({advanceTimers: jest.advanceTimersByTime});
    });

    it("renders the question without a Check button of its own", () => {
        // Arrange, Act
        renderPerseusQuestion({
            item: generateNumericInputItem({
                prompt: "What is 2 + 2?",
                answer: 4,
            }),
            onCheck: () => correct,
        });

        expect(screen.getByText("What is 2 + 2?")).toBeInTheDocument();
        // The only Check button is the test host's.
        expect(screen.getAllByRole("button", {name: "Check"})).toHaveLength(1);
    });

    it("announces Correct! when onCheck returns a correct score", async () => {
        renderPerseusQuestion({
            item: generateNumericInputItem({
                prompt: "What is 2 + 2?",
                answer: 4,
            }),
            onCheck: () => correct,
        });

        await user.click(screen.getByRole("button", {name: "Check"}));

        expect(await screen.findByText("Correct!")).toBeInTheDocument();
    });

    it("announces Incorrect and Try again and keeps Check enabled", async () => {
        renderPerseusQuestion({
            item: generateNumericInputItem({
                prompt: "What is 2 + 2?",
                answer: 4,
            }),
            onCheck: () => incorrect,
        });

        await user.click(screen.getByRole("button", {name: "Check"}));

        expect(await screen.findByText("Incorrect")).toBeInTheDocument();
        expect(screen.getByText("Try again")).toBeInTheDocument();
        expect(screen.getByRole("button", {name: "Check"})).not.toHaveAttribute(
            "aria-disabled",
            "true",
        );
    });

    it("shows the mapped message when onCheck returns an invalid score", async () => {
        renderPerseusQuestion({
            item: generateNumericInputItem({
                prompt: "What is 2 + 2?",
                answer: 4,
            }),
            onCheck: () => ({
                score: {
                    type: "invalid",
                    message: "NEEDS_TO_BE_SIMPLIFIED_ERROR",
                },
            }),
        });

        await user.click(screen.getByRole("button", {name: "Check"}));

        expect(await screen.findByText("Keep trying")).toBeInTheDocument();
        expect(
            screen.getByText(/it needs to be simplified/),
        ).toBeInTheDocument();
    });

    it("tells the learner their answer is empty when an invalid score has no message", async () => {
        renderPerseusQuestion({
            item: generateNumericInputItem({
                prompt: "What is 2 + 2?",
                answer: 4,
            }),
            onCheck: () => ({score: {type: "invalid", message: null}}),
        });

        await user.click(screen.getByRole("button", {name: "Check"}));

        expect(await screen.findByText("Keep trying")).toBeInTheDocument();
        expect(screen.getByText("Your answer is empty.")).toBeInTheDocument();
    });

    it("re-announces when the same wrong answer is checked twice", async () => {
        // Arrange
        const onCheck = jest.fn(() => incorrect);
        renderPerseusQuestion({
            item: generateNumericInputItem({
                prompt: "What is 2 + 2?",
                answer: 4,
            }),
            onCheck,
        });
        await user.click(screen.getByRole("button", {name: "Check"}));
        expect(await screen.findByText("Incorrect")).toBeInTheDocument();

        // Act
        await user.click(screen.getByRole("button", {name: "Check"}));

        // Assert
        expect(screen.queryByText("Incorrect")).not.toBeInTheDocument();
        expect(await screen.findByText("Incorrect")).toBeInTheDocument();
        expect(onCheck).toHaveBeenCalledTimes(2);
    });

    it("shows a retryable error when onCheck rejects", async () => {
        renderPerseusQuestion({
            item: generateNumericInputItem({
                prompt: "What is 2 + 2?",
                answer: 4,
            }),
            onCheck: () => Promise.reject(new Error("Network down")),
        });

        await user.click(screen.getByRole("button", {name: "Check"}));

        expect(
            await screen.findByText(
                "We couldn't check your answer. Please try again.",
            ),
        ).toBeInTheDocument();
        expect(screen.getByRole("button", {name: "Check"})).not.toHaveAttribute(
            "aria-disabled",
            "true",
        );
    });

    it("locks the question and shows solutions when onCheck returns them, keeping the learner's input", async () => {
        // Arrange
        const fullItem = generateRadioItem({
            prompt: "What is two plus two?",
            choices: [
                {
                    content: "Four",
                    correct: true,
                    rationale: "Two and two make four.",
                },
                {content: "Five"},
            ],
        });
        renderPerseusQuestion({
            item: splitPerseusItem(fullItem),
            onCheck: () => ({
                ...correct,
                // Round-trip as if it came from a server.
                solutions: JSON.parse(JSON.stringify(fullItem)),
            }),
        });
        await user.click(screen.getByRole("button", {name: /Four/}));

        // Act
        await user.click(screen.getByRole("button", {name: "Check"}));

        // Assert
        expect(
            await screen.findByText("Two and two make four."),
        ).toBeInTheDocument();
        expect(screen.getByRole("button", {name: /Four/})).toHaveAttribute(
            "aria-pressed",
            "true",
        );
        expect(screen.getByRole("button", {name: "Check"})).toHaveAttribute(
            "aria-disabled",
            "true",
        );
    });

    it("resets feedback and the revealed solutions when the host passes a different question, and ignores a pending onCheck result from the old question", async () => {
        // Arrange
        const firstItem = generateNumericInputItem({
            prompt: "What is 2 + 2?",
            answer: 4,
        });
        let resolvePending: (result: PerseusQuestionResult) => void = () => {};
        const onCheck = jest
            .fn()
            .mockReturnValueOnce({...incorrect, solutions: firstItem})
            .mockReturnValueOnce(
                new Promise<PerseusQuestionResult>((resolve) => {
                    resolvePending = resolve;
                }),
            );
        const {rerender} = renderPerseusQuestion({item: firstItem, onCheck});
        await user.click(screen.getByRole("button", {name: "Check"}));
        expect(await screen.findByText("Incorrect")).toBeInTheDocument();

        // Act
        rerender({
            item: generateNumericInputItem({
                prompt: "What is 3 + 3?",
                answer: 6,
            }),
            onCheck,
        });
        await user.click(screen.getByRole("button", {name: "Check"}));
        rerender({
            item: generateNumericInputItem({
                prompt: "What is 4 + 4?",
                answer: 8,
            }),
            onCheck,
        });
        await act(async () => {
            resolvePending(correct);
            await jest.advanceTimersByTimeAsync(200);
        });

        // Assert
        expect(screen.getByText("What is 4 + 4?")).toBeInTheDocument();
        expect(screen.queryByText("What is 2 + 2?")).not.toBeInTheDocument();
        expect(screen.getByRole("status")).toBeEmptyDOMElement();
        expect(screen.getByRole("button", {name: "Check"})).not.toHaveAttribute(
            "aria-disabled",
            "true",
        );
    });

    it("exposes the result in status for hosts that skip PerseusQuestionFeedback", async () => {
        renderPerseusQuestion({
            item: generateNumericInputItem({
                prompt: "What is 2 + 2?",
                answer: 4,
            }),
            onCheck: () => incorrect,
            withFeedback: false,
        });

        await user.click(screen.getByRole("button", {name: "Check"}));

        expect(
            await screen.findByText("Host saw: incorrect"),
        ).toBeInTheDocument();
        expect(screen.queryByRole("status")).not.toBeInTheDocument();
    });
});
