import {Dependencies} from "@khanacademy/perseus";
import {act, render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {testDependencies} from "../../../../../testing/test-dependencies";
import ExpressionEditor from "../expression-editor";

import type {PropsFor} from "@khanacademy/wonder-blocks-core";
import type {UserEvent} from "@testing-library/user-event";

describe("expression-editor", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });

        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
        jest.useFakeTimers();
    });

    it("should render", async () => {
        render(<ExpressionEditor onChange={() => undefined} />);
        act(() => jest.runOnlyPendingTimers());

        expect(await screen.findByText(/Add new answer/)).toBeInTheDocument();
    });

    it("should render answerForms missing a key", async () => {
        const answerForms: PropsFor<typeof ExpressionEditor>["answerForms"] = [
            {
                value: "x\\cdot3=y",
                form: true,
                simplify: true,
                considered: "correct",
                key: "0",
            },
            {
                value: "x^2=y",
                form: true,
                simplify: true,
                considered: "wrong",
                key: "1",
            },
            {
                value: "x=y\\cdotπ",
                form: true,
                simplify: true,
                considered: "wrong",
                key: "2",
            },
        ];

        render(
            <ExpressionEditor
                onChange={() => undefined}
                answerForms={answerForms}
            />,
        );
        act(() => jest.runOnlyPendingTimers());

        expect(await screen.findByText(/π/)).toBeInTheDocument();
    });

    it("should toggle multiplication checkbox", async () => {
        const onChangeMock = jest.fn();

        render(<ExpressionEditor onChange={onChangeMock} />);
        act(() => jest.runOnlyPendingTimers());

        await userEvent.click(
            screen.getByRole("checkbox", {
                name: "Use × instead of ⋅ for multiplication",
            }),
        );

        expect(onChangeMock).toBeCalledWith(
            {
                answerForms: [],
                buttonSets: ["basic"],
                functions: ["f", "g", "h"],
                times: true,
            },
            undefined,
        );
    });

    it("should be possible to change function variables", async () => {
        const onChangeMock = jest.fn();

        render(<ExpressionEditor onChange={onChangeMock} functions={[]} />);
        act(() => jest.runOnlyPendingTimers());

        const input = screen.getByRole("textbox", {
            name: "Function variables",
        });

        // make sure we can add things
        await userEvent.type(input, "x y z");

        expect(onChangeMock).lastCalledWith({functions: ["x", "y", "z"]});

        // make sure we can remove things
        await userEvent.type(input, "{backspace}");

        expect(onChangeMock).lastCalledWith({functions: ["x", "y"]});
    });

    it("should toggle division checkbox", async () => {
        const onChangeMock = jest.fn();

        render(<ExpressionEditor onChange={onChangeMock} />);
        act(() => jest.runOnlyPendingTimers());

        await userEvent.click(
            screen.getByRole("checkbox", {
                name: "show ÷ button",
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

    it("should toggle trig checkbox", async () => {
        const onChangeMock = jest.fn();

        render(<ExpressionEditor onChange={onChangeMock} />);
        act(() => jest.runOnlyPendingTimers());

        await userEvent.click(
            screen.getByRole("checkbox", {
                name: "trig",
            }),
        );

        expect(onChangeMock).toBeCalledWith({
            buttonSets: ["basic", "trig"],
        });
    });

    it("should toggle prealgebra checkbox", async () => {
        const onChangeMock = jest.fn();

        render(<ExpressionEditor onChange={onChangeMock} />);
        act(() => jest.runOnlyPendingTimers());

        await userEvent.click(
            screen.getByRole("checkbox", {
                name: "prealgebra",
            }),
        );

        expect(onChangeMock).toBeCalledWith({
            buttonSets: ["basic", "prealgebra"],
        });
    });

    it("should toggle prealgebra checkbox", async () => {
        const onChangeMock = jest.fn();

        render(<ExpressionEditor onChange={onChangeMock} />);
        act(() => jest.runOnlyPendingTimers());

        await userEvent.click(
            screen.getByRole("checkbox", {
                name: "logarithms",
            }),
        );

        expect(onChangeMock).toBeCalledWith({
            buttonSets: ["basic", "logarithms"],
        });
    });

    it("should toggle prealgebra checkbox", async () => {
        const onChangeMock = jest.fn();

        render(<ExpressionEditor onChange={onChangeMock} />);
        act(() => jest.runOnlyPendingTimers());

        await userEvent.click(
            screen.getByRole("checkbox", {
                name: "basic relations",
            }),
        );

        expect(onChangeMock).toBeCalledWith({
            buttonSets: ["basic", "basic relations"],
        });
    });

    it("should toggle prealgebra checkbox", async () => {
        const onChangeMock = jest.fn();

        render(<ExpressionEditor onChange={onChangeMock} />);
        act(() => jest.runOnlyPendingTimers());

        await userEvent.click(
            screen.getByRole("checkbox", {
                name: "advanced relations",
            }),
        );

        expect(onChangeMock).toBeCalledWith({
            buttonSets: ["basic", "advanced relations"],
        });
    });

    it("should be possible to add an answer", async () => {
        const onChangeMock = jest.fn();

        render(<ExpressionEditor onChange={onChangeMock} />);
        act(() => jest.runOnlyPendingTimers());

        await userEvent.click(
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

    it("should be possible to update answer", async () => {
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
        act(() => jest.runOnlyPendingTimers());

        await userEvent.click(
            screen.getByRole("button", {
                name: "open math keypad",
            }),
        );

        await userEvent.click(
            screen.getByRole("button", {
                name: "9",
            }),
        );
        act(() => jest.runOnlyPendingTimers());

        expect(onChangeMock).toBeCalledWith(
            {
                answerForms: [
                    {
                        considered: "correct",
                        form: false,
                        key: "0",
                        simplify: false,
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

    it("should be possible to toggle same form", async () => {
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
        act(() => jest.runOnlyPendingTimers());

        await userEvent.click(
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

    it("should be possible to toggle expanded and simplified", async () => {
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
        act(() => jest.runOnlyPendingTimers());

        await userEvent.click(
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

    it("should be possible to delete answer", async () => {
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
        act(() => jest.runOnlyPendingTimers());

        await userEvent.click(
            screen.getByRole("button", {
                name: "Delete",
            }),
        );

        await userEvent.click(
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
