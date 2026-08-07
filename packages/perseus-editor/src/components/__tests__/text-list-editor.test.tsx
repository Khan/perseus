import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import TextListEditor from "../text-list-editor";

import type {UserEvent} from "@testing-library/user-event";

describe("TextListEditor", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
    });

    it("renders an input per option plus a trailing empty input", () => {
        // Arrange, Act
        render(
            <TextListEditor options={["alpha", "beta"]} onChange={() => {}} />,
        );

        const inputs = screen.getAllByRole("textbox");
        expect(inputs).toHaveLength(3);
        expect(inputs[0]).toHaveValue("alpha");
        expect(inputs[1]).toHaveValue("beta");
        expect(inputs[2]).toHaveValue("");
    });

    it("renders only the trailing empty input when there are no options", () => {
        // Arrange, Act
        render(<TextListEditor onChange={() => {}} />);

        expect(screen.getAllByRole("textbox")).toHaveLength(1);
    });

    it("applies the layout to the list's class name", () => {
        // Arrange, Act
        render(
            <TextListEditor
                options={["alpha"]}
                layout="vertical"
                onChange={() => {}}
            />,
        );

        expect(screen.getByRole("list")).toHaveClass("layout-vertical");
    });

    it("appends a new empty input when the trailing input is typed into", async () => {
        // Arrange
        render(
            <TextListEditor options={["alpha", "beta"]} onChange={() => {}} />,
        );

        // Act
        await userEvent.type(screen.getAllByRole("textbox")[2], "g");

        const inputs = screen.getAllByRole("textbox");
        expect(inputs).toHaveLength(4);
        expect(inputs[2]).toHaveValue("g");
        expect(inputs[3]).toHaveValue("");
    });

    it("calls onChange with the non-empty values when an input is typed into", async () => {
        // Arrange
        const onChange = jest.fn();
        render(
            <TextListEditor options={["alpha", "beta"]} onChange={onChange} />,
        );

        // Act
        await userEvent.type(screen.getAllByRole("textbox")[2], "g");

        expect(onChange).toHaveBeenLastCalledWith(["alpha", "beta", "g"]);
    });

    it("keeps the trailing empty input on backspace and focuses the previous input", async () => {
        // Arrange
        render(
            <TextListEditor options={["alpha", "beta"]} onChange={() => {}} />,
        );

        // Act
        await userEvent.type(screen.getAllByRole("textbox")[2], "{backspace}");

        const inputs = screen.getAllByRole("textbox");
        expect(inputs).toHaveLength(3);
        expect(inputs[1]).toHaveFocus();
    });

    it("removes an empty interior input on backspace and focuses the previous input", async () => {
        // Arrange: press Enter on the first input to insert an empty one below it
        render(
            <TextListEditor options={["alpha", "beta"]} onChange={() => {}} />,
        );
        await userEvent.type(screen.getAllByRole("textbox")[0], "{enter}");
        expect(screen.getAllByRole("textbox")).toHaveLength(4);

        // Act
        await userEvent.type(screen.getAllByRole("textbox")[1], "{backspace}");

        const inputs = screen.getAllByRole<HTMLInputElement>("textbox");
        expect(inputs).toHaveLength(3);
        expect(inputs.map((i) => i.value)).toEqual(["alpha", "beta", ""]);
        expect(inputs[0]).toHaveFocus();
    });

    it("removes the second-to-last input when its last character is deleted", async () => {
        // Arrange
        const onChange = jest.fn();
        render(<TextListEditor options={["alpha", "b"]} onChange={onChange} />);

        // Act
        await userEvent.type(screen.getAllByRole("textbox")[1], "{backspace}");

        const inputs = screen.getAllByRole("textbox");
        expect(inputs).toHaveLength(2);
        expect(inputs[0]).toHaveValue("alpha");
        expect(onChange).toHaveBeenLastCalledWith(["alpha"]);
    });

    it("focuses the trailing empty input when Enter is pressed on the last filled input", async () => {
        // Arrange
        render(
            <TextListEditor options={["alpha", "beta"]} onChange={() => {}} />,
        );

        // Act
        await userEvent.type(screen.getAllByRole("textbox")[1], "{enter}");

        const inputs = screen.getAllByRole("textbox");
        expect(inputs).toHaveLength(3);
        expect(inputs[2]).toHaveFocus();
    });

    it("inserts and focuses an empty input below when Enter is pressed mid-list", async () => {
        // Arrange
        render(
            <TextListEditor options={["alpha", "beta"]} onChange={() => {}} />,
        );

        // Act
        await userEvent.type(screen.getAllByRole("textbox")[0], "{enter}");

        const inputs = screen.getAllByRole<HTMLInputElement>("textbox");
        expect(inputs.map((i) => i.value)).toEqual(["alpha", "", "beta", ""]);
        expect(inputs[1]).toHaveFocus();
    });

    it("re-syncs the inputs when the options prop changes", () => {
        // Arrange
        const {rerender} = render(
            <TextListEditor options={["alpha"]} onChange={() => {}} />,
        );

        // Act
        rerender(
            <TextListEditor options={["gamma", "delta"]} onChange={() => {}} />,
        );

        const inputs = screen.getAllByRole<HTMLInputElement>("textbox");
        expect(inputs.map((i) => i.value)).toEqual(["gamma", "delta", ""]);
    });
});
