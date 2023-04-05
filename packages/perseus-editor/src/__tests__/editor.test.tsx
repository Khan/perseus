import {ApiOptions, Dependencies, Widgets} from "@khanacademy/perseus";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import "@testing-library/jest-dom"; // Imports custom mathers

import {testDependencies} from "../../../../testing/test-dependencies";
import {question1} from "../__testdata__/input-number.testdata";
import Editor from "../editor";

describe("Editor", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    describe("input-number widget", () => {
        beforeEach(async () => {
            const [InputNumberWidget, InputNumberEditor] = await Promise.all([
                import("@khanacademy/perseus").then((m) => m.InputNumber),
                import("../widgets/input-number-editor").then((m) => m.default),
            ]);
            Widgets.registerWidgets([InputNumberWidget]);
            Widgets.registerEditors([InputNumberEditor]);
        });

        test("clicking on the widget editor should open it", async () => {
            // Arrange
            testDependencies.shouldUseFutureKaTeX(false);
            render(
                <Editor
                    apiOptions={ApiOptions.defaults}
                    content={question1.content}
                    placeholder=""
                    widgets={question1.widgets}
                    images={question1.images}
                    disabled={false}
                    widgetEnabled={true}
                    immutableWidgets={false}
                    showWordCount={true}
                    warnNoPrompt={true}
                    warnNoWidgets={true}
                    onChange={(props) => {}}
                />,
            );
            await testDependencies.getKaTeX();

            // Act
            const widgetDisclosure = screen.getByRole("link", {
                name: "input-number 1",
            });
            userEvent.click(widgetDisclosure);
            const correctAnswerInput = screen.getByLabelText("Correct answer:");

            // Assert
            expect(correctAnswerInput).toHaveValue("0.5");
        });

        it("should update values", async () => {
            // Arrange
            const changeFn = jest.fn();
            testDependencies.shouldUseFutureKaTeX(false);
            render(
                <Editor
                    apiOptions={ApiOptions.defaults}
                    content={question1.content}
                    placeholder=""
                    widgets={question1.widgets}
                    images={question1.images}
                    disabled={false}
                    widgetEnabled={true}
                    immutableWidgets={false}
                    showWordCount={true}
                    warnNoPrompt={true}
                    warnNoWidgets={true}
                    onChange={changeFn}
                />,
            );
            await testDependencies.getKaTeX();

            // Act
            const widgetDisclosure = screen.getByRole("link", {
                name: "input-number 1",
            });
            userEvent.click(widgetDisclosure);
            const correctAnswerInput = screen.getByLabelText("Correct answer:");

            userEvent.clear(correctAnswerInput);
            userEvent.paste(correctAnswerInput, "0.75");
            userEvent.tab(); // blurring the input triggers onChange to be called

            // Assert
            expect(changeFn).toHaveBeenCalledWith(
                {
                    widgets: {
                        "input-number 1": {
                            graded: true,
                            version: {major: 0, minor: 0},
                            static: false,
                            type: "input-number",
                            options: {
                                value: 0.75,
                                simplify: "required",
                                size: "normal",
                                inexact: false,
                                maxError: 0.1,
                                answerType: "number",
                                rightAlign: false,
                            },
                            alignment: "default",
                        },
                    },
                },
                undefined,
                undefined,
            );
        });
    });
});
