import * as React from "react"
import {act, screen} from "@testing-library/react"
import * as Dependencies from "../../dependencies"
import {testDependencies} from "../../../../../testing/test-dependencies";
import {PerseusRenderer} from "@khanacademy/perseus-core";
import {renderQuestion} from "../__testutils__/renderQuestion";

describe("a LabelImage widget", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    })

    const questionWithLabelImage: PerseusRenderer = {
        content: "This is the question content. [[\u2603 label-image 1]]",
        images: {},
        widgets: {
            "label-image 1": {
                type: "label-image",
                options: {
                    choices: ["right", "wrong"],
                    imageUrl: "",
                    imageAlt: "",
                    imageHeight: 100,
                    imageWidth: 100,
                    // Hiding the choices from the instructions makes it easier
                    // to click on the actual choice in tests, instead of
                    // clicking on the instructions.
                    hideChoicesFromInstructions: true,
                    multipleAnswers: false,
                    static: false,
                    markers: [
                        {
                            answers: ["right"],
                            label: "Marker 1",
                            x: 37,
                            y: 42,
                        },
                    ],
                }
            }
        },
    }

    it("renders successfully", () => {
        renderQuestion(questionWithLabelImage);

        expect(screen.queryByText(/This is the question content/)).toBeInTheDocument();
    })

    it("does not initially show which answers are correct", () => {
        renderQuestion(questionWithLabelImage);

        expect(screen.queryByLabelText("Correct!")).not.toBeInTheDocument();
    });

    it("does not initially show the options for each marker", () => {
        // The options are hidden in a menu.
        renderQuestion(questionWithLabelImage);

        expect(screen.queryByLabelText("right")).not.toBeInTheDocument();
        expect(screen.queryByLabelText("wrong")).not.toBeInTheDocument();
    });

    it("shows the options when you click a marker", async () => {
        // Arrange
        renderQuestion(questionWithLabelImage);

        // Act
        act(() => screen.getByRole("button", {name: "Marker 1"}).click());

        // Assert
        expect(screen.queryByText("right")).toBeInTheDocument();
        expect(screen.queryByText("wrong")).toBeInTheDocument();
    });

    it("shows the answers when showRationalesForCurrentlySelectedChoices is called", async () => {
        // Arrange
        const {renderer} = renderQuestion(questionWithLabelImage);
        act(() => screen.getByRole("button", {name: "Marker 1"}).click());
        act(() => screen.getByText("right").click());

        // Pre-assert
        expect(screen.queryByLabelText("Correct!")).not.toBeInTheDocument();

        // Act
        act(() => renderer.showRationalesForCurrentlySelectedChoices());

        // Assert
        expect(screen.queryByLabelText("Correct!")).toBeInTheDocument();
    })

    it.todo("does not update the display of correctness if answers are changed after being shown")
})
