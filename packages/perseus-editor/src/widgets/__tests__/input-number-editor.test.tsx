import {Dependencies} from "@khanacademy/perseus";
import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {testDependencies} from "../../testing/test-dependencies";
import InputNumberEditor from "../input-number-editor";

import type {UserEvent} from "@testing-library/user-event";

describe("input-number-editor", () => {
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
        render(<InputNumberEditor onChange={() => undefined} />);

        expect(await screen.findByText("Correct answer:")).toBeInTheDocument();
    });

    it("should be possible to change the correct answer", async () => {
        const onChangeMock = jest.fn();

        render(<InputNumberEditor onChange={onChangeMock} />);

        const input = screen.getByRole("textbox", {name: "Correct answer:"});
        await userEvent.type(input, "1");
        input.blur();

        expect(onChangeMock).toHaveBeenCalledWith(
            expect.objectContaining({value: 1}),
        );
    });

    it("should be possible to change allow inexact answers", async () => {
        const onChangeMock = jest.fn();

        render(<InputNumberEditor onChange={onChangeMock} />);

        await userEvent.click(
            screen.getByRole("checkbox", {name: "Allow inexact answers"}),
        );

        expect(onChangeMock).toHaveBeenCalledWith(
            expect.objectContaining({inexact: true}),
        );
    });

    it("should be possible to change right alignment", async () => {
        const onChangeMock = jest.fn();

        render(<InputNumberEditor onChange={onChangeMock} />);

        await userEvent.click(
            screen.getByRole("checkbox", {name: "Right alignment"}),
        );

        expect(onChangeMock).toHaveBeenCalledWith(
            expect.objectContaining({rightAlign: true}),
        );
    });

    const unsimplifiedOptions = ["required", "optional", "enforced"];
    unsimplifiedOptions.forEach((opt) => {
        it(`should be possible to set unsimplified answers to: ${opt}`, async () => {
            const onChangeMock = jest.fn();

            render(<InputNumberEditor onChange={onChangeMock} />);

            const select = screen.getByRole("combobox", {
                name: "Unsimplified answers",
            });
            await userEvent.selectOptions(select, opt);

            expect(onChangeMock).toHaveBeenCalledWith(
                expect.objectContaining({simplify: opt}),
            );
        });
    });

    const answerTypeOptions = [
        "number",
        "decimal",
        "integer",
        "rational",
        "improper",
        "mixed",
        "percent",
        "pi",
    ];
    answerTypeOptions.forEach((opt) => {
        it(`should be possible to set answer type to: ${opt}`, async () => {
            const onChangeMock = jest.fn();

            render(<InputNumberEditor onChange={onChangeMock} />);

            const select = screen.getByRole("combobox", {
                name: "Answer type",
            });
            await userEvent.selectOptions(select, opt);

            expect(onChangeMock).toHaveBeenCalledWith(
                expect.objectContaining({answerType: opt}),
            );
        });
    });

    const sizeOptions = ["normal", "small"];
    sizeOptions.forEach((opt) => {
        it(`should be possible to set unsimplified answers to: ${opt}`, async () => {
            const onChangeMock = jest.fn();

            render(<InputNumberEditor onChange={onChangeMock} />);

            const select = screen.getByRole("combobox", {
                name: "Width",
            });
            await userEvent.selectOptions(select, opt);

            expect(onChangeMock).toHaveBeenCalledWith(
                expect.objectContaining({size: opt}),
            );
        });
    });
});
