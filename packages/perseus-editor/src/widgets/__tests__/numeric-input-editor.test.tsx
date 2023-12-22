import {Dependencies} from "@khanacademy/perseus";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";

import "@testing-library/jest-dom";

import {testDependencies} from "../../../../../testing/test-dependencies";
import NumericInputEditor from "../numeric-input-editor";

describe("numeric-input-editor", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("should render", async () => {
        render(<NumericInputEditor onChange={() => undefined} />);

        expect(await screen.findByText(/Add new answer/)).toBeInTheDocument();
    });

    it("should be possible to select normal width", async () => {
        const onChangeMock = jest.fn();

        render(<NumericInputEditor onChange={onChangeMock} />);

        userEvent.click(screen.getByRole("button", {name: "Normal (80px)"}));

        expect(onChangeMock).toBeCalledWith(
            expect.objectContaining({size: "normal"}),
            undefined,
        );
    });

    it("should be possible to select small width", async () => {
        const onChangeMock = jest.fn();

        render(<NumericInputEditor onChange={onChangeMock} />);

        userEvent.click(screen.getByRole("button", {name: "Small (40px)"}));

        expect(onChangeMock).toBeCalledWith(
            expect.objectContaining({size: "small"}),
            undefined,
        );
    });

    it("should be possible to select right alignment", async () => {
        const onChangeMock = jest.fn();

        render(<NumericInputEditor onChange={onChangeMock} />);

        userEvent.click(
            screen.getByRole("checkbox", {name: "Right alignment"}),
        );

        expect(onChangeMock).toBeCalledWith({rightAlign: true});
    });

    it("should be possible to select coefficient", async () => {
        const onChangeMock = jest.fn();

        render(<NumericInputEditor onChange={onChangeMock} />);

        userEvent.click(screen.getByRole("checkbox", {name: "Coefficient"}));

        expect(onChangeMock).toBeCalledWith({coefficient: true});
    });

    it("should be possible to update label text", async () => {
        const onChangeMock = jest.fn();

        render(<NumericInputEditor onChange={onChangeMock} />);

        const input = screen.getByRole("textbox", {
            name: "Label text:",
        });

        userEvent.type(input, "a");

        expect(onChangeMock).toBeCalledWith(
            expect.objectContaining({labelText: "a"}),
            undefined,
        );
    });

    it("should be possible to toggle options", async () => {
        render(<NumericInputEditor onChange={() => {}} />);

        userEvent.click(screen.getByRole("link", {name: "Toggle options"}));

        expect(
            screen.getByText("Unsimplified answers are"),
        ).toBeInTheDocument();
    });

    it("should be possible to set unsimplified answers to ungraded", async () => {
        const onChangeMock = jest.fn();

        render(<NumericInputEditor onChange={onChangeMock} />);

        userEvent.click(screen.getByRole("link", {name: "Toggle options"}));
        userEvent.click(screen.getByRole("button", {name: "ungraded"}));

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

        userEvent.click(screen.getByRole("link", {name: "Toggle options"}));
        userEvent.click(screen.getByRole("button", {name: "accepted"}));

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

        userEvent.click(screen.getByRole("link", {name: "Toggle options"}));
        userEvent.click(screen.getByRole("button", {name: "wrong"}));

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

            userEvent.click(screen.getByRole("link", {name: "Toggle options"}));
            userEvent.click(screen.getByTitle(name));

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
