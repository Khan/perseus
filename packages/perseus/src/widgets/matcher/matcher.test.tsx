import {
    generateTestPerseusItem,
    splitPerseusItem,
} from "@khanacademy/perseus-core";
import {act} from "@testing-library/react";
import * as React from "react";

import {testDependencies} from "../../../../../testing/test-dependencies";
import {wait} from "../../../../../testing/wait";
import * as Dependencies from "../../dependencies";
import {scorePerseusItemTesting} from "../../util/test-utils";
import {renderQuestion} from "../__testutils__/renderQuestion";

import {question1} from "./matcher.testdata";

import type {Matcher} from "./matcher";
import type {APIOptions} from "../../types";

describe("matcher widget", () => {
    beforeEach(() => {
        /*
        Sortable misbehaves and sets state after the component has been
        unmounted. This is existing behavior and its safer to leave the existing
        implementation and swallow the warning in tests.
        */
        jest.spyOn(console, "warn").mockImplementation(() => {});
        jest.spyOn(console, "error").mockImplementation(() => {});

        jest.useRealTimers();

        jest.spyOn(Dependencies, "getDependencies").mockReturnValue({
            ...testDependencies,
            TeX: ({
                children,
                onRender: onLoad,
            }: {
                children: React.ReactNode;
                onRender?: () => unknown;
            }) => {
                React.useLayoutEffect(() => {
                    onLoad?.();
                }, [onLoad]);
                return <span className="tex-mock">{children}</span>;
            },
        });
    });

    it("should snapshot", async () => {
        // Arrange
        const apiOptions: APIOptions = {
            isMobile: false,
        };

        // Act
        const {container} = renderQuestion(question1, apiOptions);
        await wait();

        // Assert
        expect(container).toMatchSnapshot("first render");
    });

    it("should snapshot on mobile", async () => {
        // Arrange
        jest.useRealTimers();

        const apiOptions: APIOptions = {
            isMobile: true,
        };

        // Act
        const {container} = renderQuestion(question1, apiOptions);
        await wait();

        // Assert
        expect(container).toMatchSnapshot("first mobile render");
    });

    it("can reorder options", async () => {
        // Arrange
        const apiOptions: APIOptions = {
            isMobile: false,
        };
        const {container, renderer} = renderQuestion(question1, apiOptions);
        await wait();

        // Act
        const matcher: Matcher = renderer.findWidgets("matcher 1")[0];

        act(() => {
            matcher.moveRightOptionToIndex(
                "Rapid escalation of greenhouse gas emissions",
                0,
            );

            matcher.moveLeftOptionToIndex(
                "Average global temperatures will rise ",
                0,
            );
        });

        // Assert
        expect(container).toMatchSnapshot("moved items");
    });

    const answerfulItem = generateTestPerseusItem({question: question1});
    const answerlessItem = splitPerseusItem(answerfulItem);

    describe.each([
        ["answerful", answerfulItem],
        ["answerless", answerlessItem],
    ])("given an %s item", (_, {question}) => {
        it("can be answered correctly", () => {
            // Arrange
            const {renderer} = renderQuestion(question);

            // Act
            const matcher: Matcher = renderer.findWidgets("matcher 1")[0];

            // Put the right options in the correct order by repeatedly moving
            // answers to the end of the list
            [
                "Medium-sized stars typically exist for roughly 10 billion years",
                "The current trajectory of the Earth\u2019s tectonic plate movement",
                "The life cycle of medium-sized stars includes a red giant stage and ends in a whimper as a white dwarf",
                "Rapid escalation of greenhouse gas emissions",
                "The current trajectory of the Milky Way galaxy and those in its immediate proximity",
            ].forEach((option, index) => {
                act(() => matcher.moveRightOptionToIndex(option, 4));
            });
            const score = scorePerseusItemTesting(
                answerfulItem.question,
                renderer.getUserInput(),
            );

            // assert
            expect(score).toHaveBeenAnsweredCorrectly();
        });

        it("can be answered incorrectly", () => {
            // Arrange
            const {renderer} = renderQuestion(question);

            // Act
            const matcher: Matcher = renderer.findWidgets("matcher 1")[0];

            // Put the left options in reverse order
            [
                "Our Sun will run out of fuel and die in around 5 billion years ",
                "Plate tectonics will rearrange the continents: the Pacific will narrow, bringing Australia closer to the Americas, and the Atlantic will expand to form the largest of the oceans ",
                "Our Sun will run out of hydrogen, swell into a red giant, gobble up the inner rocky planets, and then collapse and die ",
                "Average global temperatures will rise ",
                "In 3 to 4 billion years, our galaxy will begin a slow collision with its closest large neighbor, Andromeda ",
            ].forEach((option, index) => {
                matcher.moveLeftOptionToIndex(option, 0);
            });
            const score = scorePerseusItemTesting(
                answerfulItem.question,
                renderer.getUserInput(),
            );

            // Assert
            expect(score).toHaveBeenAnsweredIncorrectly();
        });

        it("is scored incorrect if the math renderer hasn't loaded yet", () => {
            // Arrange: stub the TeX renderer to never call its onRender prop,
            // which is how the matcher knows the math renderer is ready.
            jest.spyOn(Dependencies, "getDependencies").mockReturnValue({
                ...testDependencies,
                TeX: () => {
                    return null;
                },
            });

            // Act
            const {renderer} = renderQuestion(question);
            const score = scorePerseusItemTesting(
                answerfulItem.question,
                renderer.getUserInput(),
            );

            // Assert
            expect(score).toHaveBeenAnsweredIncorrectly();
        });
    });
});
