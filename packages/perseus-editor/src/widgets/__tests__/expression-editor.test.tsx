import {Dependencies} from "@khanacademy/perseus";
import {expressionLogic} from "@khanacademy/perseus-core";
import {act, render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {testDependencies} from "../../testing/test-dependencies";
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
        render(
            <ExpressionEditor
                {...expressionLogic.initializeWidgetOptions()}
                onChange={() => undefined}
            />,
        );
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
                key: "0-0-0-0-0",
            },
            {
                value: "x^2=y",
                form: true,
                simplify: true,
                considered: "wrong",
                key: "0-0-0-0-1",
            },
            {
                value: "x=y\\cdotπ",
                form: true,
                simplify: true,
                considered: "wrong",
                key: "0-0-0-0-2",
            },
        ];

        render(
            <ExpressionEditor
                {...expressionLogic.initializeWidgetOptions()}
                onChange={() => undefined}
                answerForms={answerForms}
            />,
        );
        act(() => jest.runOnlyPendingTimers());

        expect(await screen.findByText(/π/)).toBeInTheDocument();
    });

    it("should toggle multiplication checkbox", async () => {
        const onChangeMock = jest.fn();

        render(
            <ExpressionEditor
                {...expressionLogic.initializeWidgetOptions()}
                onChange={onChangeMock}
            />,
        );
        act(() => jest.runOnlyPendingTimers());

        await userEvent.click(
            screen.getByRole("checkbox", {
                name: "Use × instead of ⋅ for multiplication",
            }),
        );

        expect(onChangeMock).toHaveBeenCalledWith({
            times: true,
        });
    });

    it("should be possible to change function variables", async () => {
        const onChangeMock = jest.fn();

        render(
            <ExpressionEditor
                {...expressionLogic.initializeWidgetOptions()}
                onChange={onChangeMock}
                functions={[]}
            />,
        );
        act(() => jest.runOnlyPendingTimers());

        const input = screen.getByRole("textbox", {
            name: "Function variables",
        });

        // make sure we can add things
        await userEvent.type(input, "x y z");

        expect(onChangeMock).toHaveBeenLastCalledWith({
            functions: ["x", "y", "z"],
        });

        // make sure we can remove things
        await userEvent.type(input, "{backspace}");

        expect(onChangeMock).toHaveBeenLastCalledWith({functions: ["x", "y"]});
    });

    it("should toggle division checkbox", async () => {
        const onChangeMock = jest.fn();

        render(
            <ExpressionEditor
                {...expressionLogic.initializeWidgetOptions()}
                onChange={onChangeMock}
            />,
        );
        act(() => jest.runOnlyPendingTimers());

        await userEvent.click(
            screen.getByRole("checkbox", {
                name: "show ÷ button",
            }),
        );

        expect(onChangeMock).toHaveBeenCalledWith({
            buttonSets: ["basic+div"],
        });
    });

    it("should toggle trig checkbox", async () => {
        const onChangeMock = jest.fn();

        render(
            <ExpressionEditor
                {...expressionLogic.initializeWidgetOptions()}
                onChange={onChangeMock}
            />,
        );
        act(() => jest.runOnlyPendingTimers());

        await userEvent.click(
            screen.getByRole("checkbox", {
                name: "trig",
            }),
        );

        expect(onChangeMock).toHaveBeenCalledWith({
            buttonSets: ["basic", "trig"],
        });
    });

    it("should toggle prealgebra checkbox", async () => {
        const onChangeMock = jest.fn();

        render(
            <ExpressionEditor
                {...expressionLogic.initializeWidgetOptions()}
                onChange={onChangeMock}
            />,
        );
        act(() => jest.runOnlyPendingTimers());

        await userEvent.click(
            screen.getByRole("checkbox", {
                name: "prealgebra",
            }),
        );

        expect(onChangeMock).toHaveBeenCalledWith({
            buttonSets: ["basic", "prealgebra"],
        });
    });

    it("should toggle logarithms checkbox", async () => {
        const onChangeMock = jest.fn();
        render(
            <ExpressionEditor
                {...expressionLogic.initializeWidgetOptions()}
                onChange={onChangeMock}
            />,
        );
        act(() => jest.runOnlyPendingTimers());

        await userEvent.click(
            screen.getByRole("checkbox", {
                name: "logarithms",
            }),
        );

        expect(onChangeMock).toHaveBeenCalledWith({
            buttonSets: ["basic", "logarithms"],
        });
    });

    it("should toggle basic relations checkbox", async () => {
        const onChangeMock = jest.fn();
        render(
            <ExpressionEditor
                {...expressionLogic.initializeWidgetOptions()}
                onChange={onChangeMock}
            />,
        );
        act(() => jest.runOnlyPendingTimers());

        await userEvent.click(
            screen.getByRole("checkbox", {
                name: "basic relations",
            }),
        );

        expect(onChangeMock).toHaveBeenCalledWith({
            buttonSets: ["basic", "basic relations"],
        });
    });

    it("should toggle advanced relations checkbox", async () => {
        const onChangeMock = jest.fn();

        render(
            <ExpressionEditor
                {...expressionLogic.initializeWidgetOptions()}
                onChange={onChangeMock}
            />,
        );
        act(() => jest.runOnlyPendingTimers());

        await userEvent.click(
            screen.getByRole("checkbox", {
                name: "advanced relations",
            }),
        );

        expect(onChangeMock).toHaveBeenCalledWith({
            buttonSets: ["basic", "advanced relations"],
        });
    });

    it("should toggle scientific checkbox", async () => {
        const onChangeMock = jest.fn();

        render(
            <ExpressionEditor
                {...expressionLogic.initializeWidgetOptions()}
                onChange={onChangeMock}
            />,
        );
        act(() => jest.runOnlyPendingTimers());

        await userEvent.click(
            screen.getByRole("checkbox", {
                name: "scientific",
            }),
        );

        expect(onChangeMock).toHaveBeenCalledWith({
            buttonSets: ["basic", "scientific"],
        });
    });

    it("should be possible to add an answer", async () => {
        const onChangeMock = jest.fn();
        crypto.randomUUID = jest.fn(() => "0-0-0-0-0");

        render(
            <ExpressionEditor
                {...expressionLogic.initializeWidgetOptions()}
                onChange={onChangeMock}
            />,
        );
        act(() => jest.runOnlyPendingTimers());

        await userEvent.click(
            screen.getByRole("button", {
                name: "Add new answer",
            }),
        );

        expect(crypto.randomUUID).toHaveBeenCalled();
        expect(onChangeMock).toHaveBeenCalledWith({
            answerForms: [
                {
                    considered: "correct",
                    form: false,
                    key: "0-0-0-0-0",
                    simplify: false,
                    value: "",
                },
            ],
        });
    });

    it("should be possible to update answer", async () => {
        const onChangeMock = jest.fn();

        render(
            <ExpressionEditor
                {...expressionLogic.initializeWidgetOptions()}
                onChange={onChangeMock}
                answerForms={[
                    {
                        considered: "correct",
                        form: false,
                        key: "0-0-0-0-0",
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

        expect(onChangeMock).toHaveBeenCalledWith({
            answerForms: [
                {
                    considered: "correct",
                    form: false,
                    key: "0-0-0-0-0",
                    simplify: false,
                    value: "9",
                },
            ],
            extraKeys: ["PI"],
        });
    });

    it("should be possible to toggle same form", async () => {
        const onChangeMock = jest.fn();

        render(
            <ExpressionEditor
                {...expressionLogic.initializeWidgetOptions()}
                onChange={onChangeMock}
                answerForms={[
                    {
                        considered: "correct",
                        form: false,
                        key: "0-0-0-0-0",
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

        expect(onChangeMock).toHaveBeenCalledWith({
            answerForms: [
                {
                    considered: "correct",
                    form: true,
                    key: "0-0-0-0-0",
                    simplify: false,
                    value: "",
                },
            ],
            extraKeys: ["PI"],
        });
    });

    it("should be possible to toggle expanded and simplified", async () => {
        const onChangeMock = jest.fn();

        render(
            <ExpressionEditor
                {...expressionLogic.initializeWidgetOptions()}
                onChange={onChangeMock}
                answerForms={[
                    {
                        considered: "correct",
                        form: false,
                        key: "0-0-0-0-0",
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

        expect(onChangeMock).toHaveBeenCalledWith({
            answerForms: [
                {
                    considered: "correct",
                    form: false,
                    key: "0-0-0-0-0",
                    simplify: true,
                    value: "",
                },
            ],
            extraKeys: ["PI"],
        });
    });

    it("should be possible to delete answer", async () => {
        const onChangeMock = jest.fn();

        render(
            <ExpressionEditor
                {...expressionLogic.initializeWidgetOptions()}
                onChange={onChangeMock}
                answerForms={[
                    {
                        considered: "correct",
                        form: false,
                        key: "0-0-0-0-0",
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

        expect(onChangeMock).toHaveBeenCalledWith({
            answerForms: [],
        });
    });

    it("serializes", () => {
        const editorRef = React.createRef<ExpressionEditor>();

        render(
            <ExpressionEditor
                {...expressionLogic.initializeWidgetOptions()}
                ref={editorRef}
                onChange={() => {}}
            />,
        );

        const options = editorRef.current?.serialize();

        expect(options).toEqual({
            answerForms: [],
            buttonSets: ["basic"],
            extraKeys: ["PI"],
            functions: ["f", "g", "h"],
            times: false,
        });
    });

    it("derives extra keys when serializing", () => {
        const editorRef = React.createRef<ExpressionEditor>();

        render(
            <ExpressionEditor
                {...expressionLogic.initializeWidgetOptions()}
                ref={editorRef}
                onChange={() => {}}
                answerForms={[
                    {
                        // deriveExtraKeys should find x
                        value: "42x",
                        considered: "correct",
                        form: false,
                        key: "0-0-0-0-0",
                        simplify: false,
                    },
                ]}
            />,
        );

        const options = editorRef.current?.serialize();

        expect(options?.extraKeys).toEqual(["x"]);
    });

    it("calls onChange with extra keys", async () => {
        let options: any;

        render(
            <ExpressionEditor
                {...expressionLogic.initializeWidgetOptions()}
                onChange={(o) => {
                    options = o;
                }}
                answerForms={[
                    {
                        considered: "correct",
                        form: false,
                        key: "0-0-0-0-0",
                        simplify: false,
                        value: "",
                    },
                ]}
            />,
        );
        act(() => jest.runOnlyPendingTimers());

        const input = screen.getByRole("textbox", {name: /Math input/});
        await userEvent.type(input, "42");
        act(() => jest.runOnlyPendingTimers());

        // default extra keys, since "42" doesn't have variables
        expect(options?.extraKeys).toEqual(["PI"]);

        await userEvent.type(input, "x");
        act(() => jest.runOnlyPendingTimers());

        // derived extra keys, since "42x" has a variable
        expect(options?.extraKeys).toEqual(["x"]);
    });
});
