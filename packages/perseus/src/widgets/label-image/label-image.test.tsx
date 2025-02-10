import * as React from "react"
import {render, screen} from "@testing-library/react"
import {LabelImage} from "./label-image";
import * as Dependencies from "../../dependencies"
import {testDependencies} from "../../../../../testing/test-dependencies";
import {PerseusItem, PerseusRenderer} from "@khanacademy/perseus-core";
import Renderer from "../../renderer";
import {mockStrings} from "../../strings";
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
        renderQuestion(questionWithLabelImage);

        screen.getByLabelText("Marker 1").click();

        expect(await screen.findByLabelText("right")).toBeInTheDocument();
        // expect(screen.queryByLabelText("wrong")).toBeInTheDocument();
    });

    it("shows the answers when showRationalesForCurrentlySelectedChoices is called", async () => {
        const {renderer} = renderQuestion(questionWithLabelImage);

        screen.getByText("right").click();

        renderer.showRationalesForCurrentlySelectedChoices();

        expect(await screen.findByLabelText("Correct!")).toBeInTheDocument();
    })
    //
    // it("shows which answers are correct when showRationalesForCurrentlySelectedChoices is called", () => {
    //     let component: LabelImage
    //     render(
    //         <LabelImage
    //             ref={(_component) => component = _component}
    //             apiOptions={{}}
    //             choices={["a", "b"]}
    //             imageUrl={""}
    //             imageAlt={""}
    //             imageHeight={100}
    //             imageWidth={100}
    //             markers={[{answers: ["a"]}]}
    //         />
    //     )
    //
    //     component.showRationalesForCurrentlySelectedChoices();
    //
    //     expect(screen.queryByLabelText("Correct!")).toBeInTheDocument();
    // });
    //
    // it("shows the correctness of each answer when showSolutions is true", () => {
    //     render(
    //         <LabelImage
    //             apiOptions={{}}
    //             choices={["a", "b"]}
    //             imageUrl={""}
    //             imageAlt={""}
    //             imageHeight={100}
    //             imageWidth={100}
    //             markers={[{answers: ["a"]}]}
    //             showSolutions={true}
    //         />
    //     )
    //
    //     expect(screen.getByLabelText("Correct!")).toBeInTheDocument();
    // });
    //
    // it("does not show correctness when showSolutions is false", () => {
    //     render(
    //         <LabelImage
    //             apiOptions={{}}
    //             choices={["a", "b"]}
    //             imageUrl={""}
    //             imageAlt={""}
    //             imageHeight={100}
    //             imageWidth={100}
    //             markers={[{answers: ["a"]}]}
    //             showSolutions={false}
    //         />
    //     )
    //
    //     expect(screen.getByLabelText("Correct!")).not.toBeInTheDocument();
    // })
})
