import {Dependencies} from "@khanacademy/perseus";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";

import "@testing-library/jest-dom";

import {testDependencies} from "../../../../../testing/test-dependencies";
import ExpressionEditor from "../expression-editor";

import type {PropsFor} from "@khanacademy/wonder-blocks-core";

describe("expression-editor", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("should render", async () => {
        render(<ExpressionEditor onChange={() => undefined} />);

        expect(await screen.findByText(/Add new answer/)).toBeInTheDocument();
    });

    it("should render answerForms missing a key", async () => {
        const answerForms: PropsFor<typeof ExpressionEditor>["answerForms"] = [
            {
                value: "x\\cdot3=y",
                form: true,
                simplify: true,
                considered: "correct",
            },
            {
                value: "x^2=y",
                form: true,
                simplify: true,
                considered: "wrong",
            },
            {
                value: "x=y\\cdotπ",
                form: true,
                simplify: true,
                considered: "wrong",
            },
        ];

        render(
            <ExpressionEditor
                onChange={() => undefined}
                answerForms={answerForms}
            />,
        );

        expect(await screen.findByText(/π/)).toBeInTheDocument();
    });

    it("should toggle multiplication checkbox", () => {
        const onChangeMock = jest.fn();

        render(<ExpressionEditor onChange={onChangeMock} />);

        userEvent.click(
            screen.getByRole("checkbox", {
                name: "Use × for rendering multiplication instead of a center dot.",
            }),
        );

        expect(onChangeMock).toBeCalledWith({times: true});
    });

    it("should be possible to change function variables", () => {
        const onChangeMock = jest.fn();

        render(<ExpressionEditor onChange={onChangeMock} functions={[]} />);

        const input = screen.getByRole("textbox", {
            name: "Function variables:",
        });

        userEvent.type(input, "x");

        expect(onChangeMock).toBeCalledWith({functions: ["x"]});
    });

    it("should toggle division checkbox", () => {
        const onChangeMock = jest.fn();

        render(<ExpressionEditor onChange={onChangeMock} />);

        userEvent.click(
            screen.getByRole("checkbox", {
                name: "show \\div button",
            }),
        );

        expect(onChangeMock).toBeCalledWith(
            {
                answerForms: [],
                buttonSets: ["basic+div"],
                functions: ["f", "g", "h"],
                times: false,
            },
            undefined,
        );
    });

    it("should toggle trig checkbox", () => {
        const onChangeMock = jest.fn();

        render(<ExpressionEditor onChange={onChangeMock} />);

        userEvent.click(
            screen.getByRole("checkbox", {
                name: "trig",
            }),
        );

        expect(onChangeMock).toBeCalledWith({
            buttonSets: ["basic", "trig"],
        });
    });

    it("should toggle prealgebra checkbox", () => {
        const onChangeMock = jest.fn();

        render(<ExpressionEditor onChange={onChangeMock} />);

        userEvent.click(
            screen.getByRole("checkbox", {
                name: "prealgebra",
            }),
        );

        expect(onChangeMock).toBeCalledWith({
            buttonSets: ["basic", "prealgebra"],
        });
    });

    it("should toggle prealgebra checkbox", () => {
        const onChangeMock = jest.fn();

        render(<ExpressionEditor onChange={onChangeMock} />);

        userEvent.click(
            screen.getByRole("checkbox", {
                name: "logarithms",
            }),
        );

        expect(onChangeMock).toBeCalledWith({
            buttonSets: ["basic", "logarithms"],
        });
    });

    it("should toggle prealgebra checkbox", () => {
        const onChangeMock = jest.fn();

        render(<ExpressionEditor onChange={onChangeMock} />);

        userEvent.click(
            screen.getByRole("checkbox", {
                name: "basic relations",
            }),
        );

        expect(onChangeMock).toBeCalledWith({
            buttonSets: ["basic", "basic relations"],
        });
    });

    it("should toggle prealgebra checkbox", () => {
        const onChangeMock = jest.fn();

        render(<ExpressionEditor onChange={onChangeMock} />);

        userEvent.click(
            screen.getByRole("checkbox", {
                name: "advanced relations",
            }),
        );

        expect(onChangeMock).toBeCalledWith({
            buttonSets: ["basic", "advanced relations"],
        });
    });

    it("should be possible to add an answer", () => {
        const onChangeMock = jest.fn();

        render(<ExpressionEditor onChange={onChangeMock} />);

        userEvent.click(
            screen.getByRole("button", {
                name: "Add new answer",
            }),
        );

        expect(onChangeMock).toBeCalledWith(
            {
                answerForms: [
                    {
                        considered: "correct",
                        form: false,
                        key: 0,
                        simplify: false,
                        value: "",
                    },
                ],
                buttonSets: ["basic"],
                functions: ["f", "g", "h"],
                times: false,
            },
            undefined,
        );
    });

    it("should be possible to update answer", () => {
        const onChangeMock = jest.fn();

        render(
            <ExpressionEditor
                onChange={onChangeMock}
                answerForms={[
                    {
                        considered: "correct",
                        form: false,
                        key: "0",
                        simplify: false,
                        value: "",
                    },
                ]}
            />,
        );

        userEvent.click(
            screen.getByRole("switch", {
                name: "open math keypad",
            }),
        );

        userEvent.click(
            screen.getByRole("button", {
                name: "9",
            }),
        );

        expect(onChangeMock).toBeCalledWith(
            {
                answerForms: [
                    {
                        buttonSets: ["basic"],
                        buttonsVisible: "focused",
                        considered: "correct",
                        form: false,
                        functions: ["f", "g", "h"],
                        key: "0",
                        linterContext: {
                            contentType: "",
                            highlightLint: false,
                            paths: [],
                            stack: [],
                        },
                        simplify: false,
                        times: false,
                        value: "9",
                    },
                ],
                buttonSets: ["basic"],
                functions: ["f", "g", "h"],
                times: false,
            },
            undefined,
        );
    });

    it("should be possible to toggle same form", () => {
        const onChangeMock = jest.fn();

        render(
            <ExpressionEditor
                onChange={onChangeMock}
                answerForms={[
                    {
                        considered: "correct",
                        form: false,
                        key: "0",
                        simplify: false,
                        value: "",
                    },
                ]}
            />,
        );

        userEvent.click(
            screen.getByRole("checkbox", {
                name: "Answer expression must have the same form.",
            }),
        );

        expect(onChangeMock).toBeCalledWith(
            {
                answerForms: [
                    {
                        considered: "correct",
                        form: true,
                        key: "0",
                        simplify: false,
                        value: "",
                    },
                ],
                buttonSets: ["basic"],
                functions: ["f", "g", "h"],
                times: false,
            },
            undefined,
        );
    });

    it("should be possible to toggle expanded and simplified", () => {
        const onChangeMock = jest.fn();

        render(
            <ExpressionEditor
                onChange={onChangeMock}
                answerForms={[
                    {
                        considered: "correct",
                        form: false,
                        key: "0",
                        simplify: false,
                        value: "",
                    },
                ]}
            />,
        );

        userEvent.click(
            screen.getByRole("checkbox", {
                name: "Answer expression must be fully expanded and simplified.",
            }),
        );

        expect(onChangeMock).toBeCalledWith(
            {
                answerForms: [
                    {
                        considered: "correct",
                        form: false,
                        key: "0",
                        simplify: true,
                        value: "",
                    },
                ],
                buttonSets: ["basic"],
                functions: ["f", "g", "h"],
                times: false,
            },
            undefined,
        );
    });

    it("should be possible to delete answer", () => {
        const onChangeMock = jest.fn();

        render(
            <ExpressionEditor
                onChange={onChangeMock}
                answerForms={[
                    {
                        considered: "correct",
                        form: false,
                        key: "0",
                        simplify: false,
                        value: "",
                    },
                ]}
            />,
        );

        userEvent.click(
            screen.getByRole("button", {
                name: "Delete",
            }),
        );

        userEvent.click(
            screen.getByRole("button", {
                name: "I'm sure!",
            }),
        );

        expect(onChangeMock).toBeCalledWith(
            {
                answerForms: [],
                buttonSets: ["basic"],
                functions: ["f", "g", "h"],
                times: false,
            },
            undefined,
        );
    });
});
