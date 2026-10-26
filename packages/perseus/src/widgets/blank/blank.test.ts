import {screen} from "@testing-library/react";
import * as React from "react";

import {renderQuestion} from "../__testutils__/render-question";

import {BlankContext} from "./blank-context";
import {basicBlankQuestion, superscriptQuestion} from "./blank.testdata";

/** Wraps the question in a BlankContext provider, as a parent widget does. */
function blankContextWrapper(value: React.ContextType<typeof BlankContext>) {
    return function BlankContextWrapper({
        children,
    }: {
        children: React.ReactNode;
    }) {
        return React.createElement(BlankContext.Provider, {value}, children);
    };
}

describe("Blank Widget", function () {
    it("Verify the Blank Widget Renders", async () => {
        // Arrange and Act
        renderQuestion(basicBlankQuestion);

        // Assert
        // TODO(LEMS-4448): replace `getByTestId` when the UI is more fleshed out
        expect(screen.getByTestId("blank-widget")).toBeInTheDocument();
        //NOTE: We aim to replace getByTestId with a different check (current idea is using a role)
    });

    it("applies the super-sub styling when displayType is not normal", () => {
        // Arrange, Act
        renderQuestion(superscriptQuestion);

        expect(screen.getByTestId("blank-widget").className).toContain(
            "superSub",
        );
    });

    it("omits the super-sub styling when displayType is normal", () => {
        // Arrange, Act
        renderQuestion(basicBlankQuestion);

        expect(screen.getByTestId("blank-widget").className).not.toContain(
            "superSub",
        );
    });

    it("renders the placed tile the context supplies for its blank", () => {
        // Arrange, Act
        renderQuestion(basicBlankQuestion, {
            wrapper: blankContextWrapper({
                renderPlacedTile: (blankId) => `tile in ${blankId}`,
                minWidth: undefined,
            }),
        });

        expect(screen.getByTestId("blank-widget")).toHaveTextContent(
            "tile in blank 1",
        );
    });

    it("uses the context's minWidth as the blank's minimum width", () => {
        // Arrange, Act
        renderQuestion(basicBlankQuestion, {
            wrapper: blankContextWrapper({
                renderPlacedTile: () => null,
                minWidth: 120,
            }),
        });

        expect(screen.getByTestId("blank-widget").style.cssText).toContain(
            "--blank-min-inline-size: 120px",
        );
    });

    it("renders an empty blank with no minimum width when there is no provider", () => {
        // Arrange, Act
        renderQuestion(basicBlankQuestion);

        const blank = screen.getByTestId("blank-widget");
        expect(blank).toBeEmptyDOMElement();
        expect(blank.style.cssText).not.toContain("--blank-min-inline-size");
    });
});
