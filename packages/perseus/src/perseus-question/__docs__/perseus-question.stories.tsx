import {splitPerseusItem} from "@khanacademy/perseus-core";
import {scorePerseusItem} from "@khanacademy/perseus-score";
import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import * as React from "react";

import {usePerseusI18n} from "../../components/i18n-context";
import {isCorrect} from "../../util/scoring";
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
import type {PerseusItem, UserInputMap} from "@khanacademy/perseus-core";
import type {Meta, StoryObj} from "@storybook/react-vite";

type StoryArgs = {showFeedback: boolean; failCheck: boolean};

/**
 * Stands in for the host's own UI. PerseusQuestion renders only the item;
 * the Check button (and where feedback goes) belongs to the wrapping
 * experience, so every story needs one to be demoable.
 */
function HostFrame({
    item,
    onCheck,
    showFeedback,
}: UsePerseusQuestionOptions & {showFeedback: boolean}) {
    const {strings} = usePerseusI18n();
    const question = usePerseusQuestion({item, onCheck});
    return (
        <View style={{gap: sizing.size_160}}>
            <PerseusQuestion question={question} />
            <View
                style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    alignItems: "center",
                    gap: sizing.size_160,
                }}
            >
                <Button
                    onClick={() => void question.check()}
                    // The spinner replaces the visible label, so keep the
                    // accessible name explicit.
                    aria-label={strings.check}
                    spinner={question.isChecking}
                    // WB sets aria-disabled, so focus stays on the button.
                    disabled={question.isFinished}
                >
                    {strings.check}
                </Button>
                {showFeedback && (
                    <PerseusQuestionFeedback question={question} />
                )}
            </View>
        </View>
    );
}

const meta: Meta<StoryArgs> = {
    title: "Renderers/Perseus Question",
    args: {showFeedback: true, failCheck: false},
    argTypes: {
        showFeedback: {
            description:
                "Whether the host renders PerseusQuestionFeedback. Turn off to see a host that gives its own feedback.",
        },
        failCheck: {
            description: "Makes onCheck throw, to show the error state.",
        },
    },
    parameters: {
        docs: {
            description: {
                component:
                    "`usePerseusQuestion` owns the check/feedback/reveal state; `PerseusQuestion` renders the item; `PerseusQuestionFeedback` is optional accessible result text. The Check button belongs to the host (here, a story-only frame). Where scoring happens is up to the caller, via `onCheck`.",
            },
        },
    },
};

export default meta;

type Story = StoryObj<StoryArgs>;

const sumItem = generateNumericInputItem({
    prompt: "What is $2 + 2$?",
    answer: 4,
});

const score = (item: PerseusItem, userInput: UserInputMap) =>
    scorePerseusItem(item.question, userInput, "en");

function failIf(failCheck: boolean) {
    if (failCheck) {
        throw new Error("Simulated onCheck failure");
    }
}

export const LocalScoring: Story = {
    render: ({showFeedback, failCheck}) => (
        <HostFrame
            item={sumItem}
            showFeedback={showFeedback}
            onCheck={(userInput) => {
                failIf(failCheck);
                return {score: score(sumItem, userInput)};
            }}
        />
    ),
};

const answerlessSumItem = splitPerseusItem(sumItem);

// Stands in for a server that holds the full item and only sends the
// answers back once the learner is correct.
async function fakeServerCheck(
    userInput: UserInputMap,
    failCheck: boolean,
): Promise<PerseusQuestionResult> {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    failIf(failCheck);
    const result = score(sumItem, userInput);
    return {score: result, solutions: isCorrect(result) ? sumItem : undefined};
}

export const SlowBackend: Story = {
    render: ({showFeedback, failCheck}) => (
        <HostFrame
            item={answerlessSumItem}
            showFeedback={showFeedback}
            onCheck={(userInput) => fakeServerCheck(userInput, failCheck)}
        />
    ),
};

const radioItem = generateRadioItem({
    prompt:
        "A recipe calls for $\\dfrac{3}{4}$ cup of sugar. Maya wants to make " +
        "half of the recipe.\n\n**How much sugar does Maya need?**",
    choices: [
        {
            content: "$\\dfrac{3}{8}$ cup",
            correct: true,
            rationale:
                "Half of $\\dfrac{3}{4}$ is $\\dfrac{1}{2} \\times \\dfrac{3}{4} = \\dfrac{3}{8}$.",
        },
        {
            content: "$\\dfrac{3}{2}$ cups",
            rationale:
                "That's double the recipe. Making half means multiplying by $\\dfrac{1}{2}$, not $2$.",
        },
        {
            content: "$\\dfrac{1}{4}$ cup",
            rationale:
                "That subtracts $\\dfrac{1}{2}$ from $\\dfrac{3}{4}$ instead of taking half of it.",
        },
        {
            content: "$\\dfrac{2}{3}$ cup",
            rationale:
                "Halving a fraction doubles its denominator: $\\dfrac{3}{4}$ becomes $\\dfrac{3}{8}$.",
        },
    ],
});
const answerlessRadioItem = splitPerseusItem(radioItem);

export const RevealSolutions: Story = {
    render: ({showFeedback, failCheck}) => (
        <HostFrame
            item={answerlessRadioItem}
            showFeedback={showFeedback}
            // Revealing on any answer finishes the question even when it's
            // wrong, e.g. when the learner is out of attempts.
            onCheck={(userInput) => {
                failIf(failCheck);
                return {
                    score: score(radioItem, userInput),
                    solutions: radioItem,
                };
            }}
        />
    ),
};
