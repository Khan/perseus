// @flow
import {ApiOptions, Dependencies, Widgets} from "@khanacademy/perseus";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import "@testing-library/jest-dom"; // Imports custom mathers

import {testDependencies} from "../../../../testing/test-dependencies.js";
import {question1} from "../__testdata__/numeric-input_testdata.js";
import Editor from "../editor.jsx";

describe("Editor", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    describe("numeric-input widget", () => {
        beforeEach(async () => {
            const [NumericInput, NumericInputEditor] = await Promise.all([
                import("@khanacademy/perseus").then((m) => m.NumericInput),
                import("../widgets/numeric-input-editor.jsx").then(
                    (m) => m.default,
                ),
            ]);
            Widgets.registerWidgets([NumericInput]);
            Widgets.registerEditors([NumericInputEditor]);
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
                name: "numeric-input 1",
            });
            userEvent.click(widgetDisclosure);

            // Assert
            expect(
                screen.getByText("Message shown to user on attempt"),
            ).toBeVisible();
        });

        it("should update values", async () => {
            // Arrange
            const changeFn = jest.fn();
            testDependencies.shouldUseFutureKaTeX(false);
            render(
                <Editor
                    apiOptions={ApiOptions.defaults}
                    content={question1.content}
                    placeholder="Hello World"
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
                name: "numeric-input 1",
            });
            userEvent.click(widgetDisclosure);

            const correctAnswerInput = screen.getByPlaceholderText("answer");
            userEvent.clear(correctAnswerInput);
            userEvent.paste(correctAnswerInput, "0.75");
            userEvent.tab(); // blurring the input triggers onChange to be called

            const messageInput = screen.getByPlaceholderText(
                "Why is this answer correct? (reinforce the user's understanding)",
            );
            userEvent.clear(messageInput);
            userEvent.type(messageInput, "Because its 0.75");
            userEvent.tab();

            // Assert
            expect(changeFn).toHaveBeenCalledWith(
                {
                    widgets: {
                        "numeric-input 1": {
                            graded: true,
                            version: {major: 1, minor: 0},
                            type: "numeric-input",
                            options: {
                                answers: [
                                    {
                                        maxError: null,
                                        message: "",
                                        simplify: "required",
                                        status: "correct",
                                        strict: false,
                                        value: 0.75,
                                    },
                                ],
                                coefficient: false,
                                size: "normal",
                                multipleNumberInput: false,
                                labelText: "",
                                rightAlign: false,
                                static: false,
                            },
                            static: false,
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
