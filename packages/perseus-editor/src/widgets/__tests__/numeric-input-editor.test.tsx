import {Dependencies} from "@khanacademy/perseus";
import {render, screen, waitFor, within} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {testDependencies} from "../../../../../testing/test-dependencies";
import NumericInputEditor from "../numeric-input-editor";

import type {UserEvent} from "@testing-library/user-event";

describe("numeric-input-editor", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });

        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("should render", async () => {
        render(<NumericInputEditor onChange={() => undefined} />);

        await waitFor(async () =>
            expect(
                await screen.findByText(/Add new answer/),
            ).toBeInTheDocument(),
        );
    });

    it("should be possible to select normal width", async () => {
        const onChangeMock = jest.fn();

        render(<NumericInputEditor onChange={onChangeMock} />);

        await userEvent.click(
            within(screen.getByRole("group", {name: /^Width/})).getByRole(
                "radio",
                {name: "Normal (80px)"},
            ),
        );

        expect(onChangeMock).toBeCalledWith(
            expect.objectContaining({size: "normal"}),
            undefined,
        );
    });

    it("should be possible to select small width", async () => {
        const onChangeMock = jest.fn();

        render(<NumericInputEditor onChange={onChangeMock} />);

        await userEvent.click(
            within(screen.getByRole("group", {name: /^Width/})).getByRole(
                "radio",
                {name: "Small (40px)"},
            ),
        );

        expect(onChangeMock).toBeCalledWith(
            expect.objectContaining({size: "small"}),
            undefined,
        );
    });

    it("should be possible to select right alignment", async () => {
        const onChangeMock = jest.fn();

        render(<NumericInputEditor onChange={onChangeMock} />);

        await userEvent.click(
            within(screen.getByRole("group", {name: /^Alignment/})).getByRole(
                "radio",
                {name: "Right"},
            ),
        );

        expect(onChangeMock).toBeCalledWith({rightAlign: true});
    });

    it("should be possible to select coefficient", async () => {
        const onChangeMock = jest.fn();

        render(<NumericInputEditor onChange={onChangeMock} />);

        await userEvent.click(
            within(
                screen.getByRole("group", {name: /^Number style/}),
            ).getByRole("radio", {name: "Coefficient"}),
        );

        expect(onChangeMock).toBeCalledWith({coefficient: true});
    });

    it("should be possible to select strictly match only these formats", async () => {
        const onChangeMock = jest.fn();

        render(<NumericInputEditor onChange={onChangeMock} />);

        await userEvent.click(
            within(
                screen.getByRole("group", {name: /^Answer formats are/}),
            ).getByRole("radio", {name: "Required"}),
        );

        expect(onChangeMock).toBeCalledWith({
            answers: [
                {
                    answerForms: [],
                    maxError: null,
                    message: "",
                    simplify: "required",
                    status: "correct",
                    strict: true,
                    value: null,
                },
            ],
        });
    });

    it("should be possible to update label text", async () => {
        const onChangeMock = jest.fn();

        render(<NumericInputEditor onChange={onChangeMock} />);

        const input = screen.getByRole("textbox", {
            name: "aria label",
        });

        await userEvent.type(input, "a");

        expect(onChangeMock).toBeCalledWith(
            expect.objectContaining({labelText: "a"}),
            undefined,
        );
    });

    it("should be possible to set unsimplified answers to ungraded", async () => {
        const onChangeMock = jest.fn();

        render(<NumericInputEditor onChange={onChangeMock} />);

        await userEvent.click(
            within(
                screen.getByRole("group", {name: /^Unsimplified answers are/}),
            ).getByRole("radio", {name: "Ungraded"}),
        );

        expect(onChangeMock).toBeCalledWith(
            expect.objectContaining({
                answers: expect.arrayContaining([
                    expect.objectContaining({simplify: "required"}),
                ]),
            }),
        );
    });

    it("should be possible to set unsimplified answers to accepted", async () => {
        const onChangeMock = jest.fn();

        render(<NumericInputEditor onChange={onChangeMock} />);

        await userEvent.click(
            within(
                screen.getByRole("group", {name: /^Unsimplified answers are/}),
            ).getByRole("radio", {name: "Accepted"}),
        );

        expect(onChangeMock).toBeCalledWith(
            expect.objectContaining({
                answers: expect.arrayContaining([
                    expect.objectContaining({simplify: "optional"}),
                ]),
            }),
        );
    });

    it("should be possible to set unsimplified answers to wrong", async () => {
        const onChangeMock = jest.fn();

        render(<NumericInputEditor onChange={onChangeMock} />);

        await userEvent.click(
            within(
                screen.getByRole("group", {name: /^Unsimplified answers are/}),
            ).getByRole("radio", {name: "Wrong"}),
        );

        expect(onChangeMock).toBeCalledWith(
            expect.objectContaining({
                answers: expect.arrayContaining([
                    expect.objectContaining({simplify: "enforced"}),
                ]),
            }),
        );
    });

    const answerFormats = {
        integer: "Integers",
        decimal: "Decimals",
        proper: "Proper fractions",
        improper: "Improper fractions",
        mixed: "Mixed numbers",
        pi: "Numbers with π",
    };

    Object.entries(answerFormats).forEach(([key, name]) => {
        it(`should be possible to set suggested answer format to: ${name}`, async () => {
            const onChangeMock = jest.fn();

            render(<NumericInputEditor onChange={onChangeMock} />);

            await userEvent.click(screen.getByRole("checkbox", {name: name}));

            expect(onChangeMock).toBeCalledWith(
                expect.objectContaining({
                    answers: expect.arrayContaining([
                        expect.objectContaining({answerForms: [key]}),
                    ]),
                }),
            );
        });
    });
});
