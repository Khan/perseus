import {screen} from "@testing-library/react";
import * as React from "react";

import {testDependencies} from "../../testing/test-dependencies";
import {renderQuestion} from "../__testutils__/render-question";

import {BlankContext} from "./blank-context";
import {basicBlankQuestion, superscriptQuestion} from "./blank.testdata";

import type {PerseusRenderer} from "@khanacademy/perseus-core";

/** Wraps the question in a BlankContext provider, as a parent widget does. */
function blankContextWrapper(value: React.ContextType<typeof BlankContext>) {
    return function BlankContextWrapper({
        children,
    }: {
        children: React.ReactNode;
    }) {
        return (
            <BlankContext.Provider value={value}>
                {children}
            </BlankContext.Provider>
        );
    };
}

function renderQuestionWithContext(
    question: PerseusRenderer,
    context: React.ContextType<typeof BlankContext> = {
        renderPlacedTile: () => null,
    },
) {
    renderQuestion(question, {wrapper: blankContextWrapper(context)});
}

describe("Blank Widget", function () {
    it("Verify the Blank Widget Renders", async () => {
        // Arrange and Act
        renderQuestionWithContext(basicBlankQuestion);

        // Assert
        // TODO(LEMS-4448): replace `getByTestId` when the UI is more fleshed out
        expect(screen.getByTestId("blank-widget")).toBeInTheDocument();
        //NOTE: We aim to replace getByTestId with a different check (current idea is using a role)
    });

    it("applies the super-sub styling when displayType is not normal", () => {
        // Arrange, Act
        renderQuestionWithContext(superscriptQuestion);

        // Assert
        expect(screen.getByTestId("blank-widget").className).toContain(
            "superSub",
        );
    });

    it("omits the super-sub styling when displayType is normal", () => {
        // Arrange, Act
        renderQuestionWithContext(basicBlankQuestion);

        // Assert
        expect(screen.getByTestId("blank-widget").className).not.toContain(
            "superSub",
        );
    });

    it("renders the placed tile the context supplies for its blank", () => {
        // Arrange, Act
        renderQuestionWithContext(basicBlankQuestion, {
            renderPlacedTile: (blankId) => `tile in ${blankId}`,
        });

        // Assert
        expect(screen.getByTestId("blank-widget")).toHaveTextContent(
            "tile in blank 1",
        );
    });

    it("throws when rendered without a BlankContext provider", () => {
        // Arrange
        jest.spyOn(console, "error").mockImplementation(() => {});
        const logErrorSpy = jest.spyOn(testDependencies.Log, "error");

        // Act
        renderQuestion(basicBlankQuestion);

        // Assert
        // The widget's error boundary catches the throw and logs it.
        expect(logErrorSpy).toHaveBeenCalledWith(
            expect.stringContaining(
                "must be rendered inside a BlankContext provider",
            ),
            expect.anything(),
            expect.anything(),
        );
        expect(screen.queryByTestId("blank-widget")).not.toBeInTheDocument();
    });
});
