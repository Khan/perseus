// @flow

import "@testing-library/jest-dom";
import {render, screen} from "@testing-library/react";
import React from "react";

import {testDependencies} from "../../../../../testing/test-dependencies.js";
import * as Dependencies from "../../dependencies.js";
import {ApiOptions} from "../../perseus-api.jsx";
import {question1, question2} from "../__testdata__/passage_testdata.js";
import PassageWidgetExport from "../passage.jsx";

import {renderQuestion} from "./renderQuestion.jsx";

import type {APIOptions} from "../../types.js";

function renderPassage(overwrite) {
    const widgetPropsBase = {
        footnotes: "",
        passageText: "",
        passageTitle: "",
        showLineNumbers: false,
        static: true,
    };

    const base = {
        ...widgetPropsBase,
        alignment: null,
        apiOptions: {
            ...ApiOptions.defaults,
        },
        containerSizeClass: "small",
        findWidgets: (callback) => [],
        isLastUsedWidget: false,
        onBlur: () => {},
        onChange: () => {},
        onFocus: () => {},
        problemNum: 1,
        reviewModeRubric: {
            ...widgetPropsBase,
        },
        static: true,
        trackInteraction: () => {},
        widgetId: "passage",
    };

    const extended = {...base, ...overwrite};
    return render(<PassageWidgetExport.widget {...extended} />);
}

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

        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
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
            jest.runOnlyPendingTimers();

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
            jest.runOnlyPendingTimers();

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
        jest.runOnlyPendingTimers();

        // Act
        const score = renderer.score();

        // Assert
        expect(score).toMatchInlineSnapshot(`
            Object {
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
        jest.runOnlyPendingTimers();

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
        jest.runOnlyPendingTimers();

        const [passage1]: [PassageWidgetExport.widget] =
            renderer.findWidgets("passage 1");

        // Act
        const reference = passage1.getReference(999);

        // Assert
        expect(reference).toBe(null);
    });

    it("should render passage title", () => {
        renderPassage({passageTitle: "Passage title"});

        expect(screen.getByText("Passage title")).toBeInTheDocument();
    });

    it("should render passage text", () => {
        renderPassage({passageText: "Passage text"});

        expect(screen.getByText("Passage text")).toBeInTheDocument();
    });

    it("should render footnotes", () => {
        renderPassage({footnotes: "Footnote text"});

        expect(screen.getByText("Footnote text")).toBeInTheDocument();
    });

    it("should render first question instructions", () => {
        renderPassage({passageText: "[[test]] Passage text"});

        expect(screen.getByText("The symbol")).toBeInTheDocument();
        expect(screen.getAllByText("[Marker for question test]")).toHaveLength(
            2,
        );
        expect(
            screen.getByText(
                "indicates that question test references this portion of the passage",
            ),
        ).toBeInTheDocument();
    });

    it("should render first sentence instructions", () => {
        renderPassage({passageText: "[[1]] Passage text"});

        expect(screen.getByText("The symbol")).toBeInTheDocument();
        expect(screen.getAllByText("[Marker for question 1]")).toHaveLength(2);
        expect(
            screen.getByText(
                "indicates that question 1 references this portion of the passage",
            ),
        ).toBeInTheDocument();
    });
});
