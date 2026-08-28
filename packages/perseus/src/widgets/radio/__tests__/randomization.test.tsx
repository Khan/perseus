import {
    StatefulKeypadContextProvider,
    KeypadContext,
} from "@khanacademy/keypad-context";
import {
    generateGradedGroupOptions,
    generateGradedGroupWidget,
    generateRadioChoice,
    generateRadioOptions,
    generateRadioWidget,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";
import {screen, render, within} from "@testing-library/react";
import * as React from "react";

import ArticleRenderer from "../../../article-renderer";
import * as Dependencies from "../../../dependencies";
import {
    testDependencies,
    testDependenciesV2,
} from "../../../testing/test-dependencies";
import {registerAllWidgetsForTesting} from "../../../util/register-all-widgets-for-testing";

import type {
    PerseusArticle,
    PerseusWidgetsMap,
} from "@khanacademy/perseus-core";

const CAPITALS = ["Paris", "London", "Rome", "Madrid"];
const PLANETS = ["Mercury", "Venus", "Earth", "Mars"];
const AUTHORED_ORDER = [0, 1, 2, 3];
const CORRECT_ANSWER_INDEX = 0;

function renderArticle(json: PerseusArticle): void {
    render(
        <RenderStateRoot>
            <StatefulKeypadContextProvider>
                <KeypadContext.Consumer>
                    {({keypadElement}) => (
                        <ArticleRenderer
                            json={json}
                            dependencies={testDependenciesV2}
                            apiOptions={{}}
                            keypadElement={keypadElement}
                        />
                    )}
                </KeypadContext.Consumer>
            </StatefulKeypadContextProvider>
        </RenderStateRoot>,
    );
}

function buildArticle(
    questions: ReadonlyArray<{choices: string[]; randomize?: boolean}>,
): PerseusArticle {
    const widgets: PerseusWidgetsMap = {};

    questions.forEach(({choices, randomize = true}, index) => {
        widgets[`graded-group ${index + 1}`] = generateGradedGroupWidget({
            options: generateGradedGroupOptions({
                title: `Question ${index + 1}`,
                content: "[[☃ radio 1]]",
                widgets: {
                    "radio 1": generateRadioWidget({
                        options: generateRadioOptions({
                            numCorrect: 1,
                            randomize,
                            // Ids are set explicitly because the seed hashes
                            // them and `generateRadioChoice` randomises them.
                            choices: choices.map((content, choiceIndex) =>
                                generateRadioChoice(content, {
                                    id: `radio-choice-${choiceIndex}`,
                                    correct:
                                        choiceIndex === CORRECT_ANSWER_INDEX,
                                }),
                            ),
                        }),
                    }),
                },
            }),
        });
    });

    return generateTestPerseusRenderer({
        content: questions
            .map((_, index) => `[[☃ graded-group ${index + 1}]]`)
            .join("\n\n"),
        widgets,
    });
}

function renderedOrdersByAuthoredIndex(
    questions: ReadonlyArray<{choices: string[]}>,
): number[][] {
    // Choices are a role="list" per question; their buttons hold only the letter.
    const lists = screen.getAllByRole("list");

    return questions.map(({choices}, questionIndex) =>
        within(lists[questionIndex])
            .getAllByRole("listitem")
            .map((item) =>
                choices.findIndex((content) =>
                    item.textContent?.includes(content),
                ),
            ),
    );
}

describe("radio randomization in an article", () => {
    beforeAll(() => {
        registerAllWidgetsForTesting();
    });

    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("renders the authored order when randomize is off", () => {
        const questions = [{choices: CAPITALS, randomize: false}];

        renderArticle(buildArticle(questions));

        expect(renderedOrdersByAuthoredIndex(questions)).toEqual([
            AUTHORED_ORDER,
        ]);
    });

    it("shuffles the choices when randomize is on", () => {
        const questions = [{choices: CAPITALS}];

        renderArticle(buildArticle(questions));

        expect(renderedOrdersByAuthoredIndex(questions)).not.toEqual([
            AUTHORED_ORDER,
        ]);
    });

    it("gives two questions in the same article different orders", () => {
        const questions = [{choices: CAPITALS}, {choices: PLANETS}];

        renderArticle(buildArticle(questions));

        const [firstOrder, secondOrder] =
            renderedOrdersByAuthoredIndex(questions);
        expect(firstOrder).not.toEqual(secondOrder);
    });

    it("does not put the correct answer in the same position in every question", () => {
        const questions = [{choices: CAPITALS}, {choices: PLANETS}];

        renderArticle(buildArticle(questions));

        const correctAnswerPositions = renderedOrdersByAuthoredIndex(
            questions,
        ).map((order) => order.indexOf(CORRECT_ANSWER_INDEX));
        expect(new Set(correctAnswerPositions).size).toBeGreaterThan(1);
    });
});
