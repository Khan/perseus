import {it, describe, beforeEach} from "@jest/globals";
import {scorePerseusItem} from "@khanacademy/perseus-score";
import {act, screen} from "@testing-library/react";

import {
    testDependencies,
    testDependenciesV2,
} from "../../../../../../testing/test-dependencies";
import * as Dependencies from "../../../dependencies";
import {renderQuestion} from "../../__testutils__/renderQuestion";
import {LineHeightMeasurer} from "../passage";

import {question1, question2, question3} from "./passage.testdata";

import type {APIOptions, PerseusDependenciesV2} from "../../../types";
import type PassageWidgetExport from "../passage";

describe("passage widget", () => {
    beforeEach(() => {
        // passage widget uses the height of the entire rendered passage along
        // with the above line height calculations to determine the number of
        // lines rendered (as a way to provide line numbering).
        jest.spyOn(
            HTMLDivElement.prototype,
            "offsetHeight",
            "get",
        ).mockReturnValue(200.0);

        jest.spyOn(
            LineHeightMeasurer.prototype,
            "measureLineHeight",
        ).mockReturnValue(20);

        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );

        // Our simple-markdown renderer (used by Passage) doesn't always add
        // keys to children in a list. Just suppress it for now.
        // eslint-disable-next-line no-console
        const originalError = console.error;
        jest.spyOn(console, "error").mockImplementation((...args) => {
            if (
                !args[0].startsWith(
                    'Warning: Each child in a list should have a unique "key" prop.',
                )
            ) {
                originalError(...args);
            }
        });
    });

    it.each([true, false])(
        "should snapshot simple passage (mobile: %s)",
        (isMobile: boolean) => {
            // Arrange
            const apiOptions: APIOptions = {
                isMobile,
            };

            // Act
            const {container} = renderQuestion(question1, apiOptions);
            act(() => jest.runOnlyPendingTimers());

            // Assert
            expect(container).toMatchSnapshot();
        },
    );

    it.each([true, false])(
        "should snapshot multiple passages (mobile: %s)",
        (isMobile: boolean) => {
            // Arrange
            const apiOptions: APIOptions = {
                isMobile,
            };

            // Act
            const {container} = renderQuestion(question2, apiOptions);
            act(() => jest.runOnlyPendingTimers());

            // Assert
            expect(container).toMatchSnapshot();
        },
    );

    it("should not be answerable", () => {
        // Arrange
        const apiOptions: APIOptions = {
            isMobile: false,
        };
        const {renderer} = renderQuestion(question2, apiOptions);
        act(() => jest.runOnlyPendingTimers());

        // Act
        const score = scorePerseusItem(
            question2,
            renderer.getUserInputMap(),
            "en",
        );

        // Assert
        expect(score).toMatchInlineSnapshot(`
            {
              "earned": 0,
              "message": null,
              "total": 0,
              "type": "points",
            }
        `);
    });

    it("should be able to return a valid reference", () => {
        // Arrange
        const apiOptions: APIOptions = {
            isMobile: false,
        };
        const {renderer} = renderQuestion(question2, apiOptions);
        act(() => jest.runOnlyPendingTimers());

        // @ts-expect-error - TS2503 - Cannot find namespace 'PassageWidgetExport'
        const [passage1]: [PassageWidgetExport.widget] =
            renderer.findWidgets("passage 1");

        // Act
        const reference = passage1.getReference(3);

        // Assert
        // Why not use toMatchInlineSnapshot() here? Well, because one of the
        // react elements that is rendered into the snapshot has a trailing
        // space which is significant and if we use inline snapshots, many
        // editors will strip that trailing whitespace and cause a test
        // failure.
        expect(reference).toMatchSnapshot();
    });

    it("should return null if reference number is not valid", () => {
        // Arrange
        const apiOptions: APIOptions = {
            isMobile: false,
        };
        const {renderer} = renderQuestion(question2, apiOptions);
        act(() => jest.runOnlyPendingTimers());

        // @ts-expect-error - TS2503 - Cannot find namespace 'PassageWidgetExport'
        const [passage1]: [PassageWidgetExport.widget] =
            renderer.findWidgets("passage 1");

        // Act
        const reference = passage1.getReference(999);

        // Assert
        expect(reference).toBe(null);
    });

    it("should render passage title", () => {
        renderQuestion(
            question3,
            undefined,
            undefined,
            undefined,
            testDependenciesV2,
        );
        expect(screen.getByText("Passage 1")).toBeInTheDocument();
    });

    it("should render passage text", () => {
        renderQuestion(
            question1,
            undefined,
            undefined,
            undefined,
            testDependenciesV2,
        );

        expect(
            screen.getByText(
                "Sociologists study folktales because they provide a means of understanding the distinctive values of a culture",
            ),
        ).toBeInTheDocument();
    });

    it("should render footnotes", () => {
        renderQuestion(
            question3,
            undefined,
            undefined,
            undefined,
            testDependenciesV2,
        );
        expect(screen.getByText("An example footnote")).toBeInTheDocument();
    });

    it("should render first question instructions", () => {
        renderQuestion(
            question2,
            undefined,
            undefined,
            undefined,
            testDependenciesV2,
        );

        expect(screen.getAllByText("The symbol")).toHaveLength(2);
        expect(screen.getAllByText("[Marker for question 1]")).toHaveLength(2);
        expect(
            screen.getByText(
                "indicates that question 1 references this portion of the passage",
            ),
        ).toBeInTheDocument();
    });

    it("should render first sentence instructions", () => {
        renderQuestion(
            question2,
            undefined,
            undefined,
            undefined,
            testDependenciesV2,
        );

        expect(screen.getAllByText("The symbol")).toHaveLength(2);
        expect(screen.getAllByText("[Marker for question 1]")).toHaveLength(2);
        expect(
            screen.getByText(
                "indicates that question 1 references this portion of the passage",
            ),
        ).toBeInTheDocument();
    });

    it("should send analytics event when widget is rendered", () => {
        // Arrange
        const onAnalyticsEventSpy = jest.fn();
        const depsV2: PerseusDependenciesV2 = {
            ...testDependenciesV2,
            analytics: {onAnalyticsEvent: onAnalyticsEventSpy},
        };

        // Act
        renderQuestion(question2, undefined, undefined, undefined, depsV2);

        // Assert
        expect(onAnalyticsEventSpy).toHaveBeenCalledWith({
            type: "perseus:widget:rendered:ti",
            payload: {
                widgetSubType: "null",
                widgetType: "passage",
                widgetId: "passage 1",
            },
        });
    });
});
